import { Header } from "@shared/ui/header";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Icons } from "@shared/ui/icons";
import { COLORS, FONT_SIZE } from "@shared/constants";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { ClientSocket, UserStatus } from "@shared/api";
import { apiMediaUrl } from "@shared/constants/api";

export function HeaderChat() {
	const params = useLocalSearchParams<{
		chatId: string;
		userId: string;
		avatar: string;
		fullname: string;
	}>();
	const chatId = Number(params.chatId);
	const userId = Number(params.userId);
	const router = useRouter();
	const [isOnline, setIsOnline] = useState<boolean>(false);
	useEffect(() => {
		ClientSocket.emit(
			"subscribeAndGetInitialStatuses",
			[userId],
			(response) => {
				for (const userStatuses of response.statuses) {
					if (userStatuses.userId === userId) {
						setIsOnline(userStatuses.status === "online");
					}
				}
			},
		);
		function handleUserStatusUpdated(status: UserStatus) {
			setIsOnline(() => {
				if (status.userId === userId) {
					return status.status === "online";
				}
				return false;
			});
		}
		ClientSocket.on("userStatusUpdated", handleUserStatusUpdated);
		return () => {
			ClientSocket.off("userStatusUpdated", handleUserStatusUpdated);
		};
	}, []);
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
						<Text>{params.fullname}</Text>
						<Text>{isOnline ? "Online" : "Offline"}</Text>
					</View>
					<View>
						<Image
							style={{ width: 50, height: 50 }}
							source={{ uri: `${apiMediaUrl}${params.avatar}` }}
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
