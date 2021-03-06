import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { User } from "../../types";
import styles from "./style";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import {
	createChatRoom,
	createChatRoomUser,
	deleteChatRoom
} from "../../graphql/mutations";
// import { listChatRoomUsers } from "../../graphql/queries";
import { getUser } from "../../graphql/queries";

export type ContactListItemProps = {
	user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
	const { user } = props;

	const navigation = useNavigation();

	const onClick = async () => {
		try {
			const userData = await API.graphql(
				graphqlOperation(getUser, { id: user.id })
			);
			if (userData.data.getUser.chatRoomUser.items.length > 0) {
				const chatRoomId =
					userData.data.getUser.chatRoomUser.items[0].chatRoomID;

				if (chatRoomId != undefined) {
					navigation.navigate("ChatRoom", {
						id: chatRoomId,
						name: user.name
					});
					return;
				}
			}

			// create a new chat room
			const newChatRoomData = await API.graphql(
				graphqlOperation(createChatRoom, {
					input: {
						lastMessageID: "zz753fca-e8c3-473b-8e85-b14196e84e16"
					}
				})
			);
			if (!newChatRoomData.data) {
				console.log("Failed to create a chat room");
				return;
			}

			const newChatRoom = newChatRoomData.data.createChatRoom;

			// add user to the chat room
			await API.graphql(
				graphqlOperation(createChatRoomUser, {
					input: {
						userID: user.id,
						chatRoomID: newChatRoom.id
					}
				})
			);

			// add authenticated user to the chat room
			const userInfo = await Auth.currentAuthenticatedUser();
			await API.graphql(
				graphqlOperation(createChatRoomUser, {
					input: {
						userID: userInfo.attributes.sub,
						chatRoomID: newChatRoom.id
					}
				})
			);

			navigation.navigate("ChatRoom", {
				id: newChatRoom.id,
				name: user.name
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={onClick}>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Image source={{ uri: user.imageUri }} style={styles.avatar} />
					<View style={styles.midContainer}>
						<Text style={styles.username}>{user.name}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ContactListItem;
