import { useGetAllContactsQuery } from "@modules/contact";
import { ActivityIndicator, FlatList } from "react-native";
import { styles } from "./message-list.styles";
import { MessageListItem } from "../MessageListItem/MessageListItem";

export function MessageList() {
	// const { data, isLoading, isFetching } = useGetAllMessagesQuery();
	// if (isLoading || isFetching) {
	// 	return <ActivityIndicator />;
	// }
	return (
		<FlatList
			data={[]}
			renderItem={({ item }) => <MessageListItem message={item} />}
			contentContainerStyle={styles.contentContainer}
		/>
	);
}
