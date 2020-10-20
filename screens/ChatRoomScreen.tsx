import React, { useState } from "react";
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

const ChatRoomScreen = () => {
	const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
	Keyboard.addListener("keyboardDidShow", () => {
		setKeyboardIsOpen(true);
	});
	Keyboard.addListener("keyboardDidHide", () => {
		setKeyboardIsOpen(false);
	});
	return (
		<ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
			<KeyboardAvoidingView
				style={{
					flex: 1,
					flexDirection: "column",
					justifyContent: "center"
				}}
				behavior="padding"
				enabled
				keyboardVerticalOffset={110}
			>
				<FlatList
					data={chatRoomData.messages}
					renderItem={({ item }) => <ChatMessage message={item} />}
					inverted
				/>

				<View style={keyboardIsOpen === true ? styles.view1 : styles.view2}>
					<InputBox />
				</View>
			</KeyboardAvoidingView>
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
