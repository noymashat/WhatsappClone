import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return (
		<View style={{ flex: 1 }}>
			<Camera style={{ flex: 1 }} type={type}>
				<View
					style={{
						flex: 1,
						backgroundColor: "transparent",
						flexDirection: "row"
					}}
				>
					<TouchableOpacity
						style={{
							flex: 0.2,
							alignSelf: "flex-end",
							alignItems: "center",
							marginBottom: 20
						}}
						onPress={() => {
							setType(
								type === Camera.Constants.Type.back
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back
							);
						}}
					>
						<Ionicons
							style={{ marginBottom: 30 }}
							name="ios-reverse-camera"
							size={40}
							color="white"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							flex: 0.6,
							alignSelf: "flex-end",
							alignItems: "center",
							marginBottom: 10
						}}
						onPress={() => {
							setType(
								type === Camera.Constants.Type.back
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back
							);
						}}
					>
						<Ionicons name="ios-radio-button-on" size={80} color="white" />
					</TouchableOpacity>
				</View>
			</Camera>
		</View>
	);
}
