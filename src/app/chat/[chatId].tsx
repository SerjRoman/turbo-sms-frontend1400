import {
	MessageList,
	useGetMessagesQuery,
	MessageInputBlock,
} from "@modules/chat";
import { ClientSocket } from "@shared/api";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useUserContext } from "@modules/auth";
import { useNotificationContext } from "@modules/notification";

export default function ChatScreen() {
	const params = useLocalSearchParams<{ chatId: string }>();
	const { setActiveChatId } = useNotificationContext();
	const { user } = useUserContext();
	const [page, setPage] = useState<number>(1);
	const chatId = Number(params.chatId);
	const { data } = useGetMessagesQuery({ chatId, page, take: 20 }, {});
	const messages = data?.data || [];
	useEffect(() => {
		if (Number.isNaN(chatId)) return;
		setActiveChatId(chatId);
		ClientSocket.emit("joinChat", { chatId }, (response) => {
			console.log(`Joined chat ${chatId} with response:`, response);
		});
		return () => {
			ClientSocket.emit("leaveChat", { chatId });
			setActiveChatId(null);
		};
	}, [chatId]);
	if (!user) {
		return <Redirect href={"/login"} />;
	}
	return (
		<View style={{ flex: 1 }}>
			<MessageList
				messages={messages || []}
				handleLoadMore={() => {
					setPage((prev) => prev + 1);
				}}
				userId={user.id}
			/>
			<MessageInputBlock chatId={chatId} />
		</View>
	);
}
