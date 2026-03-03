import { StyleSheet } from "react-native";
import { FONT_SIZE } from "../../constants/font-size";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
	button: {
		width: 200,
		height: 50,

		backgroundColor: COLORS.bisqueSecondary,

		alignItems: "center",
		justifyContent: "center",

		borderRadius: 16,
	},
	text: {
		fontSize: FONT_SIZE.titleMedium,
		color: COLORS.black,
	},
	disabled: {
		borderColor: COLORS.bisqueSecondary,
		borderWidth: 2,
		backgroundColor: "transparent",
	},
	disabledText: {
		color: COLORS.transperentBlack,
	},
});
