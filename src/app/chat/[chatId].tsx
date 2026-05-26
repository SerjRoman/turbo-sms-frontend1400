import { MessageList, useGetMessagesQuery } from "@modules/chat";
import { ClientSocket } from "@shared/api";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function ChatScreen() {
	const params = useLocalSearchParams<{ chatId: string }>();
	const [text, setText] = useState<string>("");
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
			<MessageList messages={messages || []} />
			<View>
				<Input value={text} onChangeText={(value) => setText(value)} />
				<Button
					onPress={() => {
						if (text.length < 1 || Number.isNaN(chatId)) return;
						ClientSocket.emit("sendMessage", {
							type: "text",
							text,
							chatId: chatId,
						});
						setText("");
					}}
				/>
			</View>
			<Button
				onPress={() => setPage((prev) => prev + 1)}
				title="Get next messages"
			/>
		</View>
	);
}
