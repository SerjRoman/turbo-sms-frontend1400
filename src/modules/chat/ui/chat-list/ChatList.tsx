import React from "react";
import { FlatList } from "react-native";
import { ChatWithContactInfo } from "./types";
import { ChatListItem } from "./ChatListItem";
import { styles } from "./chat-list.styles";

export const ChatList = () => {
  const data: ChatWithContactInfo[] = [
    {
      id: 1,
      lastMessageId: 1,
      lastMessage: {
        id: 1,
        chatId: 1,
        type: "text",
        text: "Привет",
        mediaUrl: null,
        senderId: 2,
        chatAsLastMessageId: 1,
        createdAt: "10:00",
        updatedAt: "10:05",
      },
      participant: {
        id: 2,
        name: "Alex",
        surname: "Smith",
        avatar: "",
        lastSeenAt: "12:00",
        contactOf: {
          id: 1,
          avatar: "",
          localName: "Bestie",
          addedAt: new Date(),
        },
      },
      isInContact: true,
    },
    {
      id: 2,
      lastMessageId: null,
      lastMessage: null,
      participant: {
        id: 3,
        name: "John",
        surname: "Doe",
        avatar: "",
        lastSeenAt: "11:00",
      },
      isInContact: false,
    },
  ];

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data}
      renderItem={({ item }) => <ChatListItem chat={item} />}
      keyExtractor={(item) => String(item.id)}
    />
  );
};