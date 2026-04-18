import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Header } from "../header";
import { HeaderProps } from "../header.types";
import { Icons } from "../../icons";
import { COLORS } from "../../../constants/colors";
import { FONT_SIZE } from "../../../constants/font-size";
import { useRouter } from "expo-router";

export function HeaderBack(props: Omit<HeaderProps, "left">) {
	const router = useRouter();
	return (
		<Header
			left={
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						if (router.canGoBack()) router.back();
					}}
				>
					<Icons.BackIcon fill={COLORS.brownPrimary} />
					<Text style={styles.back}>Back</Text>
				</TouchableOpacity>
			}
			{...props}
		/>
	);
}

const styles = StyleSheet.create({
	back: { fontSize: FONT_SIZE.titleLarge, color: COLORS.brownPrimary },
	button: { flexDirection: "row", alignItems: "center" },
});
