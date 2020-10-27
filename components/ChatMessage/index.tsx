import React from "react";
import { Message } from "../../types";
import { Text, View } from "react-native";
import moment from "moment";
import styles from "./style";

export type ChatMessageProps = {
	message: Message;
	myUserId: String;
};

const ChatMessage = (props: ChatMessageProps) => {
	const { message, myUserId } = props;

	const isMyMessage = () => {
		return message.user.id === myUserId;
	};

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.messageBox,
					{
						backgroundColor: isMyMessage() ? "#DCF8C5" : "white",
						marginLeft: isMyMessage() ? 50 : 0,
						marginRight: isMyMessage() ? 0 : 50
					}
				]}
			>
				{!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
				<Text style={styles.message}>{message.content}</Text>
				<Text style={styles.time}>{moment(moment(message.createdAt)).fromNow()}</Text>
			</View>
		</View>
	);
};

export default ChatMessage;
