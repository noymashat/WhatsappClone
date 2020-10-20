import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName, Image, Text } from "react-native";
import {
	MaterialCommunityIcons,
	Octicons,
	MaterialIcons,
	FontAwesome5
} from "@expo/vector-icons";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import MainTabNavigator from "./MainTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import Colors from "../constants/Colors";
import { View } from "../components/Themed";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import ContactsScreen from "../screens/ContactsScreen";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
	colorScheme
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTitleAlign: "left",
				headerTitleStyle: {
					fontWeight: "bold"
				},
				headerTintColor: Colors.light.background,
				headerStyle: {
					backgroundColor: Colors.light.tint,
					shadowOpacity: 0,
					elevation: 0
				}
			}}
		>
			<Stack.Screen
				name="Root"
				component={MainTabNavigator}
				options={{
					title: "WhatsApp",
					headerRight: () => (
						<View
							style={{
								flexDirection: "row",
								width: 60,
								justifyContent: "space-between",
								marginRight: 10,
								backgroundColor: Colors.light.tint
							}}
						>
							<Octicons name="search" size={22} color={"white"} />
							<MaterialCommunityIcons
								name="dots-vertical"
								size={22}
								color={"white"}
							/>
						</View>
					)
				}}
			/>
			<Stack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: "Oops!" }}
			/>
			<Stack.Screen name="Contacts" component={ContactsScreen} />
			<Stack.Screen
				name="ChatRoom"
				component={ChatRoomScreen}
				options={({ route }) => ({
					title: (
						<View
							style={{
								flexDirection: "row",
								justifyContent: "flex-start",
								backgroundColor: Colors.light.tint
							}}
						>
							<Image
								style={{ height: 35, width: 35, borderRadius: 35 }}
								source={{ uri: route.params.icon }}
							/>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "bold",
									paddingLeft: 10,
									color: "white"
								}}
							>
								{route.params.name}{" "}
							</Text>
						</View>
					),
					headerBackTitleVisible: false,
					headerRight: () => (
						<View
							style={{
								backgroundColor: Colors.light.tint,
								width: "100%",
								justifyContent: "space-between",
								flexDirection: "row",
								marginRight: 10
							}}
						>
							<FontAwesome5
								name="video"
								size={22}
								color="white"
								style={{ marginRight: 10 }}
							/>
							<MaterialIcons name="call" size={22} color="white" />
							<MaterialCommunityIcons
								name="dots-vertical"
								size={22}
								color="white"
							/>
						</View>
					)
				})}
			/>
		</Stack.Navigator>
	);
}
