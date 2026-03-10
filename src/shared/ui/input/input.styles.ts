import { COLORS } from "@shared/constants/colors";
import { FONT_SIZE } from "@shared/constants/font-size";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	label: {
		fontSize: FONT_SIZE.titleMedium,
		fontWeight: 500,
	},
	inputContainer: {
		height: 60,
		gap: 10,
		paddingHorizontal: 10,
		borderRadius: 16,
		backgroundColor: COLORS.bisquePrimary,
		flexDirection: "row",
		alignItems: "center"
	},
	input: {
		flex: 1,
		fontSize: FONT_SIZE.titleMedium,
	},
	errorContainer: {
		flexDirection: "row",
	},
	errorText: {
		color: COLORS.error,
		fontSize: FONT_SIZE.titleMedium,
	},
});
