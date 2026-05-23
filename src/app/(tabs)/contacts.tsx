import { useGetAllContactsQuery } from "@modules/contact";
import { ContactList } from "@modules/contact/ui";
import { View } from "react-native";

export default function Contacts() {
	const { data } = useGetAllContactsQuery();
	return (
		<View style={{ flex: 1 }}>
			<ContactList contacts={data || []}></ContactList>
		</View>
	);
}
