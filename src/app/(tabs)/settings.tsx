import { Button } from "@shared/ui/button";
import { useMediaLibraryPermissions } from "expo-image-picker";
import * as Notifications from "expo-notifications";
import { View, Text, StyleSheet } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
const radioButtons: RadioButtonProps[] = [
	{
		id: "yes",
		label: "Yes",
		value: "yes",
		size: 24,
	},
	{
		id: "no",
		label: "No",
		value: "no",
		size: 24,
	},
];
export default function Settings() {
	const [mediaLibraryPermission, requestMediaLibraryPermission] =
		useMediaLibraryPermissions();
	const status = mediaLibraryPermission.status;
	async function getNotificationPermission() {
		const notificationPermission =
			await Notifications.getPermissionsAsync();
		if (notificationPermission.ios?.status === 2) return true;
		else return false;
	}

	return (
		<View style={[{ flex: 1 }, styles.page]}>
			<View style={styles.container}>
				<Text style={styles.title}>Permissions</Text>
				<View style={styles.sentenceContainer}>
					<Text style={styles.subTitle}>Media ibrary</Text>
					<Button
						title={
							status === "granted"
								? "Granted"
								: status === "limited"
									? "Limited"
									: "Denied"
						}
						disabled={status === "granted"}
						onPress={async () => {
							if (status === "granted") return;
							await requestMediaLibraryPermission();
						}}
					/>
				</View>
				<View style={styles.sentenceContainer}>
					<Text style={styles.subTitle}>Notifications</Text>
					<Button
						title={
							status === "granted"
								? "Granted"
								: status === "limited"
									? "Limited"
									: "Denied"
						}
						disabled={status === "granted"}
						onPress={async () => {
							if (status === "granted") return;
							await getNotificationPermission();
						}}
					/>
				</View>
			</View>
			<View style={styles.container}>
				<Text style={styles.title}>Additional</Text>
				<Text style={styles.subTitle}>
					Start message with capital letter
				</Text>
				<RadioGroup radioButtons={radioButtons} />
			</View>
			<View style={styles.container}>
				<Text style={styles.title}>Help</Text>
				<View style={styles.objectContainer}>
					<Text style={styles.keyText}>Email:</Text>
					<Text style={styles.valueText}>turbosms@gmail.com</Text>
				</View>
				<View>
					<Text style={styles.keyText}>Telegram:</Text>
					<Text style={styles.valueText}>+098</Text>
				</View>
				<View>
					<Text style={styles.keyText}>Instagram:</Text>
					<Text style={styles.valueText}>Link</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		padding: 10,
		gap: 10,
	},
	container: {
		padding: 10,
		gap: 10,
		alignItems: "center",
	},
	title: {
		fontSize: 32,
		fontWeight: 400,
		textAlign: "center",
	},
	subTitle: {
		fontSize: 22,
		fontWeight: 400,
	},
	sentenceContainer: {
		gap: 8,
	},
	objectContainer: {
		flexDirection: "row",
		gap: 4,
		alignItems: "center",
	},
	keyText: {
		fontSize: 22,
		fontWeight: 700,
	},
	valueText: {
		fontSize: 18,
		fontWeight: 400,
	},
});
