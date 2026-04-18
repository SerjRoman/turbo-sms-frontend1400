import { COLORS, FONT_SIZE } from "@shared/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.bisquePrimary,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.brownPrimary,
		paddingBottom: 10,
		gap: 10,
	},
	headerTop: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	title: {
		fontSize: FONT_SIZE.headlineMedium,
		textAlign: "center",
		flex: 1,
		color: COLORS.black,
	},
});
