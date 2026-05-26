import { useUserContext } from "@modules/auth";
import { ChatList, useGetAllChatsQuery } from "@modules/chat";
import { ClientSocket } from "@shared/api";
import { useIsFocused } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Chats() {
	const { data, isFetching } = useGetAllChatsQuery(undefined, {
		pollingInterval: 5000,
	});
	const { user } = useUserContext();
	const [onlineUserIds, setOnlineUserIds] = useState<Set<number>>(
		new Set<number>(),
	);
	const isMyMessage = (senderId: number) => {
		return senderId === user?.id;
	};

	const isFocused = useIsFocused();
	useEffect(() => {
		if (!data) return;
		const userIds = data.map((chat) => {
			return chat.participant.id;
		});
		ClientSocket.emit("getOnlineUsers", userIds, (response) => {
			setOnlineUserIds(new Set(response.userIds));
		});
	}, [isFocused, data, isFetching]);
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
