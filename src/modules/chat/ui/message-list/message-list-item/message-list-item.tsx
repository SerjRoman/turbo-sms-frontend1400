import { Text, View } from "react-native";
import { Image } from "expo-image";
import { styles } from "./message-list-item.styles";
import { useUserContext } from "@modules/auth";
import { MessageListItemProps } from "./message-list-item.types";
import { Icons } from "@shared/ui/icons";

export function MessageListItem(props: Readonly<MessageListItemProps>) {
	const { user } = useUserContext();
	const { message } = props;
	const time = new Date(message.createdAt);
	return (
		<View style={[styles.wrapper,
					 message.senderId === user?.id
						? styles.authorWrapper
						: styles.senderWrapper]}>
			<View
				style={[
					styles.container,
					message.senderId === user?.id
						? styles.authorContainer
						: styles.senderContainer,
				]}
			>
				<View style={[styles.messageContent]}>
					{message.media ? (
						<Image source={message.media} />
					) : (
						<Text style={styles.text}>{message.text}</Text>
					)}
				</View>
				<View style={styles.timeContainer}>
					<Text style={styles.time}>
						{time.toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</Text>
					{message.senderId === user?.id && <Icons.ReadedIcon />}
				</View>
			</View>
		</View>
	);
}
