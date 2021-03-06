import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Text, View } from "../components/Themed";
import users from "../data/Users";
import ContactListItem from "../components/ContactListItem";
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../graphql/queries";

export default function ContactsScreen() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const usersData = await API.graphql(graphqlOperation(listUsers));
				setUsers(usersData.data.listUsers.items);
			} catch (e) {
				console.log(e);
			}
		};
		fetchUsers();
	}, []);
	return (
		<View style={styles.container}>
			<FlatList
				style={{ width: "100%" }}
				data={users}
				renderItem={({ item }) => <ContactListItem user={item} />}
				keyExtractor={item => item.id}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
});
