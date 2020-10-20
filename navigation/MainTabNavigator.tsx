import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { MainTabParamList, TabTwoParamList } from "../types";
import { Fontisto } from "@expo/vector-icons";
import ChatsScreen from "../screens/ChatsScreen";
import Camera from "../components/Camera";

const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<MainTab.Navigator
			initialRouteName="Chats"
			tabBarOptions={{
				activeTintColor: Colors[colorScheme].background,
				style: {
					backgroundColor: Colors[colorScheme].tint
				},
				indicatorStyle: {
					backgroundColor: Colors[colorScheme].background,
					height: 4
				},
				labelStyle: {
					fontWeight: "bold"
				},
				showIcon: true
			}}
		>
			<MainTab.Screen
				name="Camera"
				component={Camera}
				options={{
					tabBarIcon: ({ color }) => (
						<Fontisto name="camera" color={color} size={18} />
					),
					tabBarLabel: () => null
				}}
			/>
			<MainTab.Screen name="Chats" component={ChatsScreen} />
			<MainTab.Screen name="Status" component={TabTwoNavigator} />
			<MainTab.Screen name="Calls" component={TabTwoNavigator} />
		</MainTab.Navigator>
	);
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
	return (
		<TabTwoStack.Navigator>
			<TabTwoStack.Screen
				name="TabTwoScreen"
				component={ChatsScreen}
				options={{ headerTitle: "Tab Two Title" }}
			/>
		</TabTwoStack.Navigator>
	);
}
