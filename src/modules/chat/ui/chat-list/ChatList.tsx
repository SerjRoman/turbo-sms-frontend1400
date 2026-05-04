import { FlatList } from "react-native";
import { ChatItem } from "./chat-item/ChatItem";
import { ChatWithContactInfo } from "./types";
import { styles } from "./chat-list.styles";

export function ChatList(){
    const chatList: ChatWithContactInfo[] = [
        {
            id: 1,
            lastMessageId: 2,
            lastMessage: {
                id: 1,
                chatId: 1,
                type: "string",
                text: "hallooo",
                mediaUrl: null,
                senderId: 1,
                chatAsLastMessageId: 1,
                createdAt: "13:13",
                updatedAt: "13:14",
            },
            participant: {
                name: "Andrew",
                id: 2,
                surname: "Surname",
                avatar: "",
                lastSeenAt: "20:15",
                contactOf: {
                    id: 1,
                    avatar: "string",
                    localName: "Dave",
                    addedAt: new Date(),
                }
            },
            isInContact: true
        },
        {
            id: 2,
            lastMessageId: 2,
            lastMessage: {
                id: 2,
                chatId: 2,
                type: "string",
                text: "string",
                mediaUrl: null,
                senderId: 2,
                chatAsLastMessageId: 2,
                createdAt: "13:13",
                updatedAt: "13:14",
            },
                participant: {
                    name: "Andrew",
                    id: 2,
                    surname: "Surname",
                    avatar: "",
                    lastSeenAt: "20:15",
                },
                isInContact: false,
        }
    ]
    return <FlatList
        style={styles.container}
        data={chatList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <ChatItem item={item}/>
        )}
    >

    </FlatList>
}