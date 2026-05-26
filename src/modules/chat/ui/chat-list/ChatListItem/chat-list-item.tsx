import { Text, TouchableOpacity, View } from "react-native";
import { ChatListItemProps } from "./chat-list-item.types";
import { Image } from "expo-image";
import { styles } from "./chat-list-item.styles";
import { useRouter } from "expo-router";
import { apiMediaUrl } from "@shared/constants/api";

export function ChatListItem(props: ChatListItemProps) {
	const { chat, isMyMessage, isUserOnline } = props;
	const participant = chat.participant;
	const isMyMessageFlag = Boolean(
		chat.lastMessage && isMyMessage(chat.lastMessage?.senderId),
	);
	const fullname = chat.isInContact
		? chat.participant.contactOf.localName
		: `${participant.surname} ${participant.name}`;
	const avatar = chat.isInContact
		? `${apiMediaUrl}${chat.participant.contactOf.avatar}`
		: `${apiMediaUrl}${chat.participant.avatar}`;
	const isOnline = isUserOnline(participant.id);
	const router = useRouter();
	return (
		<TouchableOpacity
			onPress={() => {
				router.push(`/chat/${chat.id}`);
			}}
			style={styles.container}
		>
			<View style={styles.avatarContainer}>
				<View style={styles.avatarContainerImg}>
					<Image style={styles.avatar} source={avatar} />
				</View>
				<View
					style={[
						styles.activityIndicator,
						isOnline
							? styles.onlineIndicator
							: styles.offlineIndicator,
					]}
				/>
			</View>
			<View style={styles.body}>
				<Text style={styles.username}>{fullname}</Text>
				{chat.lastMessage && (
					<Text style={styles.lastMessage}>
						{isMyMessageFlag
							? `You: ${chat.lastMessage.text?.slice(0, 20)}`
							: `${fullname}: ${chat.lastMessage.text?.slice(0, 20)}`}
					</Text>
				)}
			</View>
			<View>
				{!!chat.participant.lastSeenAt && (
					<Text style={styles.time}>
						{new Date(
							chat.participant.lastSeenAt,
						).toLocaleTimeString()}
					</Text>
				)}
			</View>
		</TouchableOpacity>
	);
}
