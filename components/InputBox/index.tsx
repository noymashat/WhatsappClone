import React from "react";
import { Text, View } from "react-native";
import styles from "./style";
import {
	MaterialCommunityIcons,
	FontAwesome5,
	Entypo,
	Fontisto
} from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

const InputBox = () => {
	return (
		<View style={styles.container}>
			<View style={styles.mainContainer}>
				<FontAwesome5 name="laugh-beam" size={24} color="grey" />
				<TextInput multiline style={styles.textInput} />
				<Entypo name="attachment" size={24} color="grey" style={styles.icon} />
				<Fontisto name="camera" size={24} color="grey" style={styles.icon} />
			</View>
			<View style={styles.buttonContainer}>
				<MaterialCommunityIcons name="microphone" size={24} color="white" />
			</View>
		</View>
	);
};

export default InputBox;
