import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { ChatRoom } from "../../types";
import styles from "./style";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";

export type ChatListItemProps = {
	chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {
	const { chatRoom } = props;
	const [otherUser, setOtherUser] = useState(null);

	const navigation = useNavigation();

	useEffect(() => {
		const getOtherUser = async () => {
			const userInfo = await Auth.currentAuthenticatedUser();
			if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
				setOtherUser(chatRoom.chatRoomUsers.items[1].user);
			} else {
				setOtherUser(chatRoom.chatRoomUsers.items[0].user);
			}
		};
		getOtherUser();
	}, []);

	const onClick = () => {
		navigation.navigate("ChatRoom", {
			id: chatRoom.id,
			name: otherUser.name,
			icon: otherUser.imageUri
		});
	};

	if (!otherUser) {
		return null;
	}

	return (
		<TouchableWithoutFeedback onPress={onClick}>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Image source={{ uri: otherUser.imageUri }} style={styles.avatar} />
					<View style={styles.midContainer}>
						<Text style={styles.username}>{otherUser.name}</Text>
						<Text numberOfLines={1} style={styles.lastMessage}>
							{chatRoom.lastMessage ? chatRoom.lastMessage.content : ""}
						</Text>
					</View>
				</View>

				{/* <Text style={styles.time}>Yesterday</Text> */}
				<Text>
					{chatRoom.lastMessage &&
						moment(chatRoom.lastMessage.createdAt).calendar(null, {
							lastDay: "[Yesterday]",
							sameDay: "[Today]",
							nextDay: "[Tomorrow]",
							lastWeek: "dddd",
							nextWeek: "dddd",
							sameElse: "L"
						})}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ChatListItem;
