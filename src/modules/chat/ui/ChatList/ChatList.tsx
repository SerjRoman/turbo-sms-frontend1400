import { useGetAllContactsQuery } from "@modules/contact";
import { ActivityIndicator, FlatList } from "react-native";
import { ChatListItem } from "../ChatListItem";
import { styles } from "./chat-list.styles";

export function ChatList() {
	const { data, isLoading, isFetching } = useGetAllContactsQuery();
	if (isLoading || isFetching) {
		return <ActivityIndicator />;
	}
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => <ChatListItem contact={item} />}
			contentContainerStyle={styles.contentContainer}
		/>
	);
}
