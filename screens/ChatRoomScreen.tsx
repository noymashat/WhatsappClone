import React from "react";
import {
	Text,
	Image,
	View,
	ImageBackground,
	KeyboardAvoidingView,
	ScrollView,
	SafeAreaView
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import chatRoomData from "../data/Chats";
import ChatMessage from "../components/ChatMessage";
import InputBox from "../components/InputBox";
import BG from "../assets/images/BG.png";

const ChatRoomScreen = () => {
	const route = useRoute();

	return (
		<ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
			<FlatList
				data={chatRoomData.messages}
				renderItem={({ item }) => <ChatMessage message={item} />}
				inverted
			/>

			<KeyboardAvoidingView
				style={{
					flex: 1,
					flexDirection: "column",
					justifyContent: "center",
					flexGrow: 1
				}}
				behavior="padding"
				enabled
				keyboardVerticalOffset={110}
			>
				<View style={{ height: 80 }}>
					<InputBox />
				</View>
			</KeyboardAvoidingView>
		</ImageBackground>
	);
};

export default ChatRoomScreen;
