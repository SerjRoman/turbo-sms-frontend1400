import { FONT_SIZE } from "@shared/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 2,
		gap: 30,
		alignItems: "center",
	},
	formFields: {
		width: "100%",
		gap: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	inputContainer: {
		height: 60,
	},
	input: {
		fontWeight: 500,
	},
	selectAvatarBlock: {
		alignItems: "center",
		gap: 5,
	},
	selectAvatarButton: {
		width: 75,
		height: 75,
		alignItems: "center",
		justifyContent: "center",
	},
	selectAvatarImage: {
		borderRadius: 50,
		width: "100%",
		height: "100%",
	},
	selectAvatarLabel: {
		fontSize: FONT_SIZE.titleMedium,
	},
	iconContainer: {
		position: "absolute",
		left: "50%",
		top: "50%",
		transform: [
			{ translateX: "-50%" },
			{ translateY: "-50%" }
		],
		zIndex: 1,
		width: 30,
		height: 30,
	},
});
