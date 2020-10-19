import React from "react";
import { Text, Image, View } from "react-native";
import { useRoute } from "@react-navigation/native";

const ChatRoomScreen = () => {
	const route = useRoute();

	return (
		<View>
			<Image source={route.params.image} />
		</View>
	);
};

export default ChatRoomScreen;
