import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

export interface LastMessage {
    id: number;
    chatId: number;
    type: string;
    text: string | null;
    mediaUrl: string | null;
    senderId: number;
    chatAsLastMessageId: number;
    createdAt: string;
    updatedAt: string;
}

export interface Chat {
    id: number;
    lastMessageId: number | null;
}

export interface ChatUserInfo {
    name: string;
    id: number;
    surname: string;
    avatar: string;
    lastSeenAt: string;
}

export type ChatWithContactInfo = Chat & {
    lastMessage: LastMessage | null;
} & (
        | {
              participant: ChatUserInfo & {
                  contactOf: {
                      id: number;
                      avatar: string;
                      localName: string;
                      addedAt: Date;
                  };
              };
              isInContact: true;
          }
        | {
              participant: ChatUserInfo;
              isInContact: false;
          }
    );

type ChatListItemProps = {
    item: ChatWithContactInfo;
};

const ChatListItem = ({ item }: ChatListItemProps) => {
    const name = item.isInContact
        ? item.participant.contactOf.localName
        : `${item.participant.name} ${item.participant.surname}`;

    return (
        <View style={styles.item}>
            <Image source={{ uri: item.participant.avatar }} style={styles.avatar} />
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.message}>{item.lastMessage?.text ?? ''}</Text>
            </View>
        </View>
    );
};

type ChatListProps = {
    data: ChatWithContactInfo[];
};

export const ChatList = ({ data }: ChatListProps) => {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <ChatListItem item={item} />}
            keyExtractor={item => item.id.toString()}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
    message: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
});