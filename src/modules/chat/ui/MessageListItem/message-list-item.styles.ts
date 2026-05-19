import { COLORS, FONT_SIZE } from "@shared/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	wrapper: {
		padding: 5,
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 7,
		paddingHorizontal: 10,
		minHeight: 30,
	},
	authorContainer: {
		borderRadius: 10,
		borderBottomLeftRadius: 0,
		backgroundColor: COLORS.bisqueSecondary,
	},
	senderContainer: {
		borderRadius: 10,
		borderBottomRightRadius: 0,
		backgroundColor: COLORS.brownSecondary,
	},
	messageContent: {},
	text: {
		flexWrap: "wrap",
		fontSize: FONT_SIZE.bodyLarge,
		color: COLORS.black,
	},
	timeContainer: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "flex-end",
	},
	time: {
		fontSize: 7,
		fontWeight: "500",
	},
});
