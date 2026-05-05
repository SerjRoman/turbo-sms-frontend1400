import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ChatWithContactInfo } from "./types";
import { styles } from "./chat-list.styles";

interface Props {
  chat: ChatWithContactInfo;
  onPress?: (chat: ChatWithContactInfo) => void;
}

export const ChatListItem: React.FC<Props> = ({ chat, onPress }) => {
  const name = chat.isInContact
    ? chat.participant.contactOf.localName
    : `${chat.participant.name} ${chat.participant.surname}`;

  const lastMessageText = chat.lastMessage
    ? chat.lastMessage.text || (chat.lastMessage.mediaUrl ? "Медиа" : "Нет текста")
    : "Нет сообщений";

  const avatar = chat.participant.avatar || undefined;

  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress?.(chat)}>
      <Image source={{ uri: avatar }} style={styles.avatar} />

      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.message} numberOfLines={1}>
          {lastMessageText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};