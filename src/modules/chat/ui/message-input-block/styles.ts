import { COLORS, FONT_SIZE } from "@shared/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	blockBG: {
		padding: 5,
		backgroundColor: COLORS.bisquePrimary,
		flexDirection: "row",
		width: "100%",
        justifyContent: "space-between"
	},
	inputButton: {
		width: 40,
		height: 40,
	},
	input: {
		flexDirection: "row",
		flex: 1,
        width: "100%",
		backgroundColor: COLORS.grey,
		padding: 5,
		borderRadius: 10,
		maxHeight: 200,
		fontSize: FONT_SIZE.bodyLarge,
		fontWeight: 400,
		color: COLORS.black,
	},
});
