import React, { useEffect, useState } from "react";
import {
	Text,
	Image,
	View,
	ImageBackground,
	KeyboardAvoidingView,
	Keyboard,
	StyleSheet,
	ScrollView,
	SafeAreaView
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native";
import chatRoomData from "../data/Chats";
import ChatMessage from "../components/ChatMessage";
import InputBox from "../components/InputBox";
import BG from "../assets/images/BG.png";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { messagesByChatRoom } from "../graphql/queries";
import { onCreateMessage } from "../graphql/subscriptions";

const ChatRoomScreen = () => {
	const [messages, setMessages] = useState([]);
	const [myUserId, setMyUserId] = useState(null);
	const route = useRoute();

	const fetchMessages = async () => {
		const messagesData = await API.graphql(
			graphqlOperation(messagesByChatRoom, {
				chatRoomID: route.params.id,
				sortDirection: "DESC"
			})
		);
		console.log("FETCH MESSAGES");
		setMessages(messagesData.data.messagesByChatRoom.items);
	};

	useEffect(() => {
		fetchMessages();
	}, []);

	useEffect(() => {
		const getMyId = async () => {
			const userInfo = await Auth.currentAuthenticatedUser();
			setMyUserId(userInfo.attributes.sub);
		};
		getMyId();
	}, []);

	useEffect(() => {
		const subscription = API.graphql(
			graphqlOperation(onCreateMessage)
		).subscribe({
			next: data => {
				const newMessage = data.value.data.onCreateMessage;
				if (newMessage.chatRoomID !== route.params.id) {
					console.log("Message is in another room!");
					return;
				}
				fetchMessages();
			}
		});
		return () => subscription.unsubscribe();
	}, []);

	console.log(`messages in state: ${messages.length}`);

	return (
		<ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
			<FlatList
				data={messages}
				renderItem={({ item }) => (
					<ChatMessage myUserId={myUserId} message={item} />
				)}
				inverted
			/>

			<InputBox chatRoomId={route.params.id} />
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	view1: {
		height: 40
	},
	view2: {
		height: 70
	}
});

export default ChatRoomScreen;
