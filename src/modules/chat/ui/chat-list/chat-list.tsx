import { FlatList } from "react-native";
import { ChatListItem } from "./ChatListItem";
import { styles } from "./chat-list.styles";
import { ChatWithContactInfo } from "../../api/api.types";

interface ChatListProps {
	chats: ChatWithContactInfo[];
	onlineUserIds: Set<number>;
	isMyMessage: (senderId: number) => boolean;
}

export function ChatList({ chats, onlineUserIds, isMyMessage }: ChatListProps) {
	const isUserOnline = function (userId: number): boolean {
		return onlineUserIds.has(userId);
	};
	return (
		<FlatList
			data={chats}
			renderItem={({ item }) => (
				<ChatListItem
					chat={item}
					isMyMessage={isMyMessage}
					isUserOnline={isUserOnline}
				/>
			)}
			contentContainerStyle={styles.contentContainer}
		/>
	);
}
