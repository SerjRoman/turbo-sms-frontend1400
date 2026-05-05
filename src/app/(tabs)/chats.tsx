import { View } from "react-native";
import { ChatList } from "../../modules/chat/ui/chat-list/chat-list";

export default function Chats() {
	return <View style={{ flex: 1 }}><ChatList chats={[]} /></View>;
}
