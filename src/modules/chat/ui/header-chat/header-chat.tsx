import { Header } from "@shared/ui/header";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Icons } from "@shared/ui/icons";
import { COLORS, FONT_SIZE } from "@shared/constants";
import { Image } from "expo-image";

export function HeaderChat() {
	const router = useRouter();
	return (
		<Header
			bottom={
				<View style={styles.container}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							if (router.canGoBack()) router.back();
						}}
					>
						<Icons.BackIcon fill={COLORS.brownPrimary} />
						<Text style={styles.back}>Back</Text>
					</TouchableOpacity>
					<View style={{ alignItems: "center" }}>
						<Text>SerjDimitri</Text>
						<Text>{true ? "lastSeenAt" : "Online"}</Text>
					</View>
					<View>
						<Image
							style={{ width: 50, height: 50 }}
							source={{ uri: "" }}
						/>
					</View>
				</View>
			}
		/>
	);
}

const styles = StyleSheet.create({
	back: { fontSize: FONT_SIZE.titleLarge, color: COLORS.brownPrimary },
	button: { flexDirection: "row", alignItems: "center" },
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
