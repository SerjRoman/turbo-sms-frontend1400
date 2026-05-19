import { ChatList } from "@modules/chat";
import { View } from "react-native";

export default function Contacts() {
	return (
		<View style={{ flex: 1 }}>
			<ChatList />
		</View>
	);
}
