import { FlatList } from "react-native";
import { MessageListItem } from "./message-list-item";
import { Message } from "../../model";
import { styles } from "./message-list.styles";

interface MessageListProps {
	messages: Message[];
}

export function MessageList(props: MessageListProps) {
	return (
		<FlatList
			data={props.messages}
			renderItem={({ item }) => <MessageListItem message={item} />}
			contentContainerStyle={styles.contentContainer}
			inverted
		/>
	);
}
