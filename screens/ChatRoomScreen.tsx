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

const ChatRoomScreen = () => {
	const [messages, setMessages] = useState([]);
	const [myUserId, setMyUserId] = useState(null);
	const route = useRoute();

	useEffect(() => {
		const fetchMessages = async () => {
			const messagesData = await API.graphql(
				graphqlOperation(messagesByChatRoom, {
					chatRoomID: route.params.id,
					sortDirection: "DESC"
				})
			);
			setMessages(messagesData.data.messagesByChatRoom.items);
		};
		fetchMessages();
	}, []);

	useEffect(() => {
		const getMyId = async () => {
			const userInfo = await Auth.currentAuthenticatedUser();
			setMyUserId(userInfo.attributes.sub);
		};
		getMyId();
	}, []);

	return (
		<ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
			{/* <KeyboardAvoidingView
				style={{
					flex: 1,
					flexDirection: "column",
					justifyContent: "center"
				}}
				behavior="padding"
				enabled
				keyboardVerticalOffset={110}
			> */}
			<FlatList
				data={messages}
				renderItem={({ item }) => (
					<ChatMessage myUserId={myUserId} message={item} />
				)}
				inverted
			/>

			<View>
				<InputBox chatRoomId={route.params.id} />
			</View>
			{/* </KeyboardAvoidingView> */}
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
