import { COLORS, FONT_SIZE } from "@shared/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	text: {
		color: COLORS.transperentBlack,
		fontSize: FONT_SIZE.titleMedium,
	},
	linkText: {
		color: COLORS.brownPrimary,
		fontSize: FONT_SIZE.titleMedium,
	},
});
