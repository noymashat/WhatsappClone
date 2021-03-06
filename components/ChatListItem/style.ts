import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		padding: 10
	},
	leftContainer: {
		flexDirection: "row"
	},
	avatar: {
		width: 60,
		height: 60,
		marginRight: 15,
		borderRadius: 60
	},
	midContainer: {
		justifyContent: "space-around",
		position: "relative"
	},
	username: {
		fontSize: 16,
		fontWeight: "bold"
	},
	lastMessage: {
		fontSize: 16,
		color: "grey",
		width: 200
	},
	time: {
		fontSize: 14,
		color: "grey"
	}
});

export default styles;
