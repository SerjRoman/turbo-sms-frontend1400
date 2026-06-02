import { COLORS, FONT_SIZE } from "@shared/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	blockBG: {
		padding: 5,
		backgroundColor: COLORS.bisquePrimary,
		flexDirection: "row",
		alignItems: "center",
	},
	inputButton: {
		width: 40,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	inputContainer: {
		flexDirection: "row",
		flex: 1,
		backgroundColor: COLORS.grey,
		borderRadius: 10,
		maxHeight: 200,
		height: 40,
	},
	mediaBlock: {
		flex: 1,
		height: 40,
	},
	input: {
		fontSize: FONT_SIZE.bodyLarge,
		fontWeight: 400,
		color: COLORS.black,
	},
});
