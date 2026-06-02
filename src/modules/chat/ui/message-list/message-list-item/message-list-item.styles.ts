import { COLORS, FONT_SIZE } from "@shared/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	wrapper: {
		padding: 5,
	},
	authorWrapper: {
		alignItems: "flex-start",
	},
	senderWrapper: {
		alignItems: "flex-end",
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 7,
		paddingHorizontal: 10,
		minHeight: 30,
		maxWidth: "90%",
		gap: 5,
		borderRadius: 10,
	},
	mediaMessageContainer: {
		flexDirection: "column",
		width: "80%",
		height: 350,
		padding: 4,
	},
	authorContainer: {
		borderBottomLeftRadius: 0,
		backgroundColor: COLORS.bisqueSecondary,
	},
	senderContainer: {
		borderBottomRightRadius: 0,
		backgroundColor: COLORS.brownSecondary,
	},
	mediaContainer: { flex: 1, width: "100%" },
	media: {
		width: "100%",
		height: "100%",
		borderRadius: 10,
	},
	fullMedia: {
		width: "100%",
		height: "50%",
	},
	text: {
		flexWrap: "wrap",
		maxWidth: "85%",
		fontSize: FONT_SIZE.bodySmall,
		color: COLORS.black,
	},
	timeContainer: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-end",
	},
	time: {
		fontSize: 9,
		fontWeight: "500",
	},
});
