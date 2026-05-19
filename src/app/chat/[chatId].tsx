import { MessageList } from "@modules/chat";
import { ClientSocket } from "@shared/api";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function ChatScreen() {
	const params = useLocalSearchParams<{ chatId: string }>();
	const [text, setText] = useState<string>("");
	const chatId = Number(params.chatId);
	useEffect(() => {
		if (Number.isNaN(chatId)) return;
		ClientSocket.emit("joinChat", { chatId }, (response) => {
			console.log(response);
		});
		return () => {
			ClientSocket.emit("leaveChat", { chatId });
		};
	}, [params]);
	return (
		<View style={{ flex: 1 }}>
			<MessageList />
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
					}}
				/>
			</View>
		</View>
	);
}
