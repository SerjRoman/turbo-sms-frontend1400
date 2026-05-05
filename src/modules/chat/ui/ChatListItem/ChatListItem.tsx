import { Text, TouchableOpacity, View } from "react-native";
import { ChatListItemProps } from "./chat-list-item.types";
import { Image } from "expo-image";
import { styles } from "./chat-list-item.styles";
import { useUserContext } from "@modules/auth";

export function ChatListItem(props: ChatListItemProps) {
	const { user } = useUserContext();
	const { contact } = props;
	console.log(contact);
	return (
		<TouchableOpacity
			onPress={() => {
				console.log("тют потрібно вставити редірект на модалку");
			}}
			style={styles.container}
		>
			<View style={styles.avatarContainer}>
				<Image
					style={styles.avatar}
					source={contact.participant.avatar}
				/>
				<View
					style={
						// тут потрібно зробити перевірку на активність
                        styles.activityIndicator
					}
				/>
			</View>
			<View style={styles.body}>
				<Text style={styles.username}>
					{contact.participant.surname} {contact.participant.name}
				</Text>
				{contact.lastMessage && (
					<Text style={styles.lastMessage}>
						{contact.lastMessage?.senderId === user?.id
							? `You: ${contact.lastMessage.text}`
							: `${contact.participant.surname} ${contact.participant.name}: ${contact.lastMessage.text}`}
					</Text>
				)}
			</View>
			<View>
				<Text style={styles.time}>{"20:10"}</Text>
			</View>
		</TouchableOpacity>
	);
}
