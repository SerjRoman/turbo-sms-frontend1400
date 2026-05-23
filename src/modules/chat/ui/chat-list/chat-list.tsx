import { FlatList } from "react-native";
import { ChatListItem } from "./ChatListItem";
import { styles } from "./chat-list.styles";
import { ChatWithParticipantInfoResponse } from "../../api/api.types";

interface ChatListProps {
	chats: ChatWithParticipantInfoResponse[];
}

export function ChatList({ chats }: ChatListProps) {
	return (
		<FlatList
			data={chats}
			renderItem={({ item }) => <ChatListItem chat={item} />}
			contentContainerStyle={styles.contentContainer}
		/>
	);
}
