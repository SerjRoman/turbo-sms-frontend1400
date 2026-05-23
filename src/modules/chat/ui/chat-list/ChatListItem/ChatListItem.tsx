import { Text, TouchableOpacity, View } from "react-native";
import { ChatListItemProps } from "./chat-list-item.types";
import { Image } from "expo-image";
import { styles } from "./chat-list-item.styles";
import { useUserContext } from "@modules/auth";

export function ChatListItem(props: ChatListItemProps) {
	const { user } = useUserContext();
	const { chat } = props;
	const participant = chat.participant;
	const isInContact = chat.isInContact;
	return (
		<TouchableOpacity
			onPress={() => {
				console.log("тют потрібно вставити редірект на модалку");
			}}
			style={styles.container}
		>
			<View style={styles.avatarContainer}>
				<Image style={styles.avatar} source={participant.avatar} />
				<View
					style={
						// тут потрібно зробити перевірку на активність
						styles.activityIndicator
					}
				/>
			</View>
			<View style={styles.body}>
				<Text style={styles.username}>
					{participant.surname} {participant.name}
				</Text>
				{chat.lastMessage && (
					<Text style={styles.lastMessage}>
						{chat.lastMessage?.senderId === user?.id
							? `You: ${chat.lastMessage.text}`
							: `${participant.surname} ${participant.name}: ${chat.lastMessage.text}`}
					</Text>
				)}
			</View>
			<View>
				<Text style={styles.time}>{"20:10"}</Text>
			</View>
		</TouchableOpacity>
	);
}
