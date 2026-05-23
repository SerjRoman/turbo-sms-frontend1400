import { ChatList, useGetAllChatsQuery } from "@modules/chat";
import { View } from "react-native";

export default function Chats() {
	const { data } = useGetAllChatsQuery();

	return (
		<View style={{ flex: 1 }}>
			<ChatList chats={data || []} />
		</View>
	);
}
