import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { ChatListItem } from './chat-list-item/chat-item';
import { ChatWithContactInfo } from './chat-list.types';
import { styles } from './chat-list.styles';

interface ChatListProps {
    chats: ChatWithContactInfo[];
}

export function ChatList({ chats }: ChatListProps) {
    return (
        <View style={styles.listContainer}>
            <FlatList
                data={chats}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ChatListItem chat={item} />
                )}
                ListEmptyComponent={() => (
                    <View style={styles.empty}>
                        <Text>У вас поки ще немає ніяких контактів, ось такі пиріги чуваче 🐖💨</Text>
                    </View>
                )}
            />
        </View>
    );
}