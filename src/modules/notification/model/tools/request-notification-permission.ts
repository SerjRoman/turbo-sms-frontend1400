import {
	AndroidImportance,
	requestPermissionsAsync,
	setNotificationChannelAsync,
} from "expo-notifications";
import { Platform } from "react-native";

export async function requestNotificationPermission() {
	try {
		const response = await requestPermissionsAsync();
		if (Platform.OS === "android") {
			await setNotificationChannelAsync("default", {
				name: "default",
				importance: AndroidImportance.MAX,
			});
		}
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}
