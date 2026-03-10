import { COLORS } from "@shared/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		height: 100,
		width: 100,
	},
	title: {
		fontSize: 32,
		color: COLORS.brownPrimary,
	},
});
