import {
	UserContextProvider,
	useUserContext,
	useLazyMeQuery,
} from "@modules/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { ClientSocket } from "@shared/api";
import { baseApi } from "@shared/api/base-api";
import { Stack, useRouter } from "expo-router";
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
	const [meQuery, { data, isSuccess }] = useLazyMeQuery();
	const router = useRouter();

	useEffect(() => {
		if (!token) return;
		AsyncStorage.setItem("token", token).then(() => {
			meQuery().unwrap();
		});
		if (ClientSocket.connected) return;
		ClientSocket.auth = { token: `Bearer ${token}` };
		ClientSocket.connect();

		function onConnection() {
			console.log(`Client connected with id ${ClientSocket.id}`);
		}
		function onDisconnect() {
			console.log("Client disconnected");
		}
		function onConnectError(err: Error) {
			console.log("Connection error", err);
		}

		ClientSocket.on("connect", onConnection);
		ClientSocket.on("disconnect", onDisconnect);
		ClientSocket.on("connect_error", onConnectError);
		return () => {
			ClientSocket.off("connect", onConnection);
			ClientSocket.off("disconnect", onDisconnect);
			ClientSocket.off("connect_error", onConnectError);
			ClientSocket.disconnect();
		};
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
				setToken(localToken);
			}
		}
		loadToken();
	}, []);
	useEffect(() => {
		if (!isSuccess) return;
		router.replace("/chats");
	}, [isSuccess]);
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="(auth)" />
			<Stack.Screen name="(tabs)" />
			<Stack.Screen
				name="(modals)"
				options={{ presentation: "containedModal" }}
			/>
		</Stack>
	);
}
