import { useCreateChatMutation } from "@modules/chat";
import { ContactList, useGetAllContactsQuery } from "@modules/contact";
import { useRouter } from "expo-router";
import { Alert, View } from "react-native";

export default function CreateChatModal() {
	const { data } = useGetAllContactsQuery();
	const [createChat] = useCreateChatMutation();
	const router = useRouter();
	return (
		<View>
			<ContactList
				contacts={data || []}
				onItemPress={async (contact) => {
					try {
						await createChat({
							contactUserId: contact.contactUserId,
						});
						router.dismissTo("/chats");
					} catch (error) {
						console.log(error);
						Alert.alert("Error occured");
					}
				}}
			/>
		</View>
	);
}
