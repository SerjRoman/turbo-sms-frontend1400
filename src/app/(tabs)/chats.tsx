import { ChatList } from "@modules/chat/ui/chat-list/ChatList";
import { View } from "react-native";

export default function Chats() {
	return <View style={{ flex: 1 }}>
		<ChatList/>
	</View>;
}
