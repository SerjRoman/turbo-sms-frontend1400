import { UserContextProvider, useUserContext } from "@modules/auth";
import { useLazyMeQuery, useMeQuery } from "@modules/auth/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { baseApi } from "@shared/api/base-api";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<ApiProvider api={baseApi}>
				<UserContextProvider>
					<KeyboardProvider>
						<AppStack />
					</KeyboardProvider>
				</UserContextProvider>
			</ApiProvider>
		</SafeAreaProvider>
	);
}

function AppStack() {
	const { token, setUser, setToken } = useUserContext();
	const [meQuery, { data }] = useLazyMeQuery();

	useEffect(() => {
		if (token) {
			console.log("Token refetch", token);
			AsyncStorage.setItem("token", token).then(() => {
				meQuery();
			});
		}
	}, [token]);
	useEffect(() => {
		if (data) {
			setUser(data);
		}
	}, [data]);
	useEffect(() => {
		async function loadToken() {
			const localToken = await AsyncStorage.getItem("token");
			if (localToken) {
				console.log("Loaded token", localToken);
				setToken(localToken);
			}
		}
		loadToken();
	}, []);
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="(auth)" />
		</Stack>
	);
}
