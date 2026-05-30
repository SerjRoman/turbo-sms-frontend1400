import { ClientSocket, SendMessagePayload } from "@shared/api";
import { Input } from "@shared/ui/input";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { MessageInputBlockProps } from "./message-input-block.types";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icons } from "@shared/ui/icons";
import { styles } from "./styles";
import { COLORS } from "@shared/constants";
import { useUploadMessageMediaMutation } from "../../api/";
import { pickImage } from "@shared/tools/pick-image";

export function MessageInputBlock(props: Readonly<MessageInputBlockProps>) {
	const { chatId } = props;
	const [text, setText] = useState("");
	const [fileUrl, setFileUrl] = useState<string | null>(null);
	const [uploadMessageMedia] = useUploadMessageMediaMutation();
	return (
		<SafeAreaView edges={["bottom"]} style={styles.blockBG}>
			<TouchableOpacity
				style={styles.inputButton}
				onPress={async () => {
					const response = await pickImage(false, {
						mediaTypes: "images",
						selectionLimit: 1,
						allowsEditing: true,
						allowsMultipleSelection: false,
					});
					if (response.status === "error") {
						Alert.alert(
							"Error",
							response.message ||
								"Unknown error occurred while picking image.",
						);
						return;
					}
					const asset = response.assets[0];
					setFileUrl(asset.uri);
				}}
			>
				<Icons.PaperclipIcon />
			</TouchableOpacity>
			<Input
                
				value={text}
				onChangeText={(value) => setText(value)}
				inputContainerStyle={styles.input}
				placeholderTextColor={COLORS.transperentBlack}
				multiline
			/>
			<TouchableOpacity
				style={styles.inputButton}
				onPress={async () => {
					// if (text.length < 1 || Number.isNaN(chatId)) return;
					let message: SendMessagePayload = {
						type: "text",
						text,
						chatId: chatId,
					};
					if (fileUrl) {
						try {
							const { media } = await uploadMessageMedia({
								media: fileUrl,
							}).unwrap();
							message = {
								...message,
								media: media,
								type: "media",
								text: null,
							};
						} catch (e) {
							console.error("Failed to upload media:", e);
							Alert.alert(
								"Error",
								"Failed to upload media. Please try again.",
							);
							return;
						}
					}
					ClientSocket.emit("sendMessage", message);
					setFileUrl(null);
					setText("");
				}}
			>
				<Icons.PaperplaneIcon />
			</TouchableOpacity>
		</SafeAreaView>
	);
}
