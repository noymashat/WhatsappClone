import React, { useState } from "react";
import { Text, View } from "react-native";
import styles from "./style";
import {
	MaterialCommunityIcons,
	MaterialIcons,
	FontAwesome5,
	Entypo,
	Fontisto
} from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const InputBox = () => {
	const [message, setMessage] = useState("");

	const onMicrophonePress = () => {
		console.warn("Microphone");
	};

	const onSendPress = () => {
		console.warn(`Sending: ${message}`);
		//send a message to the backend
		setMessage("");
	};

	const onPress = () => {
		if (!message) {
			onMicrophonePress();
		} else {
			onSendPress();
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.mainContainer}>
				<FontAwesome5 name="laugh-beam" size={24} color="grey" />
				<TextInput
					placeholder="Type a message"
					multiline
					style={styles.textInput}
					onChangeText={e => setMessage(e)}
				/>
				<Entypo name="attachment" size={24} color="grey" style={styles.icon} />
				{!message && (
					<Fontisto name="camera" size={24} color="grey" style={styles.icon} />
				)}
			</View>
			<TouchableOpacity onPress={onPress}>
				<View style={styles.buttonContainer}>
					{!message ? (
						<MaterialCommunityIcons name="microphone" size={24} color="white" />
					) : (
						<MaterialIcons name="send" size={24} color="white" />
					)}
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default InputBox;
