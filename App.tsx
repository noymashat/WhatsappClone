import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import Amplify from "aws-amplify";
import config from "./aws-exports";

import { withAuthenticator } from "aws-amplify-react-native";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { getUser } from "./graphql/queries";
import { createUser } from "./graphql/mutations";

Amplify.configure(config);

function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	// run when App is first mounted
	useEffect(() => {
		const fetchUser = async () => {
			//get authenticated user from auth
			const userInfo = await Auth.currentAuthenticatedUser({
				bypassCache: true
			});
			if (userInfo) {
				//get the user from backend with  the user SUB from auth
				const userData = await API.graphql(
					graphqlOperation(getUser, { id: userInfo.attributes.sub })
				);

				if (userData.data.getUser) {
					console.log("User is already registered in database");
					return;
				}
				const newUser = {
					id: userInfo.attributes.sub,
					name: userInfo.username,
					imageUri:
						"https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg",
					status: "Hey there, I'm using Whatsapp"
				};

				//if thereis no user in db with th id, then create one
				await API.graphql(graphqlOperation(createUser, { input: newUser }));
			}
		};
		fetchUser();
	}, []);

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<Navigation colorScheme={colorScheme} />
				<StatusBar />
			</SafeAreaProvider>
		);
	}
}

export default withAuthenticator(App);
