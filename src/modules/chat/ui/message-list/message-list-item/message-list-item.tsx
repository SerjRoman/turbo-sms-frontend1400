import { Text, View } from "react-native";
import { Image } from "expo-image";
import { styles } from "./message-list-item.styles";
import { useUserContext } from "@modules/auth";
import { MessageListItemProps } from "./message-list-item.types";
import { Icons } from "@shared/ui/icons";

export function MessageListItem(props: MessageListItemProps) {
	const { user } = useUserContext();
	const { message } = props;
	return (
		<View style={styles.wrapper}>
			<View
				style={[
					styles.container,
					message.senderId === user?.id
						? styles.authorContainer
						: styles.senderContainer,
				]}
			>
				<View style={[styles.messageContent]}>
					{message.mediaUrl ? (
						<Image source={message.mediaUrl} />
					) : (
						<Text style={styles.text}>{message.text}</Text>
					)}
				</View>
				<View style={styles.timeContainer}>
					<Text style={styles.time}>20:10</Text>
					{message.senderId === user?.id && <Icons.ReadedIcon />}
				</View>
			</View>
		</View>
	);
}
