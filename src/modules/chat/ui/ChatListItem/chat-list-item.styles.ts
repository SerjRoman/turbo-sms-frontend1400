import { COLORS, FONT_SIZE } from "@shared/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 5,
		padding: 5,
		borderBottomColor: COLORS.grey,
		borderBottomWidth: 1,
		height: 60,
	},
	avatarContainer: {
		width: 50,
		height: 50,
		borderRadius: "50%",
		overflow: "hidden",
	},
	avatar: {
		width: "100%",
		height: "100%",
	},
	body: {
		justifyContent: "space-between",
	},
	username: {
		fontSize: FONT_SIZE.titleLarge,
		color: COLORS.black,
		fontWeight: "400",
	},
	time: {
		fontSize: FONT_SIZE.titleLarge,
		color: COLORS.black,
		fontWeight: "500",
	},
	lastMessage: {
		fontSize: FONT_SIZE.titleSmall,
	},
	activityIndicator: {
		position: "absolute",
		right: 2.5,
		bottom: 2.5,
		height: 10,
		width: 10,
		borderRadius: "50%",
		backgroundColor: COLORS.green,
	},
});
