import { useUserContext } from "@modules/auth";
import { ChatList, useGetAllChatsQuery } from "@modules/chat";
import { ClientSocket, UserStatus } from "@shared/api";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Chats() {
	const { data } = useGetAllChatsQuery(undefined, {
		pollingInterval: 5000,
	});
	const { user } = useUserContext();
	const [onlineUserIds, setOnlineUserIds] = useState<Set<number>>(
		new Set<number>(),
	);
	const isMyMessage = (senderId: number) => {
		return senderId === user?.id;
	};

	useEffect(() => {
		if (!data) return;
		const userIds = data.map((chat) => {
			return chat.participant.id;
		});
		ClientSocket.emit(
			"subscribeAndGetInitialStatuses",
			userIds,
			(response) => {
				setOnlineUserIds((prev) => {
					const newState = new Set(prev);
					for (const status of response.statuses) {
						if (status.status === "online")
							newState.add(status.userId);
					}

					return newState;
				});
			},
		);
	}, [data]);
	useEffect(() => {
		function handleUserStatusUpdated(status: UserStatus) {
			setOnlineUserIds((prev) => {
				const newState = new Set(prev);
				if (status.status === "online") {
					newState.add(status.userId);
				} else {
					newState.delete(status.userId);
				}
				return newState;
			});
		}
		ClientSocket.on("userStatusUpdated", handleUserStatusUpdated);
		return () => {
			ClientSocket.off("userStatusUpdated", handleUserStatusUpdated);
		};
	}, []);
	return (
		<View style={{ flex: 1 }}>
			<ChatList
				chats={data || []}
				onlineUserIds={onlineUserIds}
				isMyMessage={isMyMessage}
			/>
		</View>
	);
}
