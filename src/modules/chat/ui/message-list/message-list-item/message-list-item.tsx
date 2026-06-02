import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { styles } from "./message-list-item.styles";
import {
	MediaMessageItemProps,
	MessageListItemProps,
	TextMessageItemProps,
} from "./message-list-item.types";
import { Icons } from "@shared/ui/icons";
import {
	apiMediaOriginalUrl,
	apiMediaThumbnailUrl,
} from "@shared/constants/api";
import { useState } from "react";
import Modal from "react-native-modal";

function MediaMessageItem(props: MediaMessageItemProps) {
	const { message, userId } = props;
	const time = new Date(message.createdAt);
	const [isFullMediaOpen, setIsFullMediaOpen] = useState<boolean>(false);
	return (
		<View
			style={[
				styles.container,
				message.senderId !== userId
					? styles.authorContainer
					: styles.senderContainer,
				styles.mediaMessageContainer,
			]}
		>
			<View style={styles.mediaContainer}>
				<TouchableOpacity
					style={{ flex: 1, width: "100%" }}
					onPress={() => {
						setIsFullMediaOpen(true);
					}}
				>
					<Image
						source={`${apiMediaThumbnailUrl}${message.media}`}
						style={styles.media}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.timeContainer}>
				<Text style={styles.time}>
					{time.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</Text>
				{message.senderId === userId && <Icons.ReadedIcon />}
			</View>
			{isFullMediaOpen && (
				<Modal
					isVisible={isFullMediaOpen}
					coverScreen
					statusBarTranslucent
					animationIn={"fadeIn"}
					onBackdropPress={() => {
						setIsFullMediaOpen(false);
					}}
					backdropColor="black"
					backdropOpacity={0.8}
				>
					<Image
						source={{
							uri: `${apiMediaOriginalUrl}${message.media}`,
						}}
						style={styles.fullMedia}
						contentFit="contain"
					/>
				</Modal>
			)}
		</View>
	);
}
function TextMessageItem(props: TextMessageItemProps) {
	const { message, userId } = props;
	const time = new Date(message.createdAt);
	return (
		<View
			style={[
				styles.container,
				message.senderId !== userId
					? styles.authorContainer
					: styles.senderContainer,
			]}
		>
			<Text style={styles.text}>{message.text}</Text>
			<View style={styles.timeContainer}>
				<Text style={styles.time}>
					{time.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</Text>
				{message.senderId === userId && <Icons.ReadedIcon />}
			</View>
		</View>
	);
}

export function MessageListItem(props: Readonly<MessageListItemProps>) {
	const { message, userId } = props;
	return (
		<View
			style={[
				styles.wrapper,
				message.senderId !== userId
					? styles.authorWrapper
					: styles.senderWrapper,
			]}
		>
			{message.type === "media" ? (
				<MediaMessageItem message={message} userId={userId} />
			) : (
				<TextMessageItem message={message} userId={userId} />
			)}
		</View>
	);
}
