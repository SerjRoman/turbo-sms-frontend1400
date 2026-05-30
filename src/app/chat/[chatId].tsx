import { MessageList, useGetMessagesQuery } from "@modules/chat";
import { ClientSocket } from "@shared/api";
import { MessageInputBlock } from "@modules/chat/ui";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function ChatScreen() {
	const params = useLocalSearchParams<{ chatId: string }>();
	const [page, setPage] = useState<number>(1);
	const chatId = Number(params.chatId);
	const { data } = useGetMessagesQuery({ chatId, page, take: 20 }, {});
	const messages = data?.data || [];
	const meta = data?.meta;
	useEffect(() => {
		if (Number.isNaN(chatId)) return;
		ClientSocket.emit("joinChat", { chatId }, (response) => {
			console.log(`Joined chat ${chatId} with response:`, response);
		});
		return () => {
			ClientSocket.emit("leaveChat", { chatId });
		};
	}, [chatId]);
	return (
		<View style={{ flex: 1 }}>
			<MessageList
				messages={messages || []}
				handleLoadMore={() => {
					setPage((prev) => prev + 1);
				}}
			/>
			<MessageInputBlock chatId = {chatId}/>
		</View>
	);
}
