import { View, Text } from "react-native";
import { Image } from "expo-image"
import { apiMediaUrl } from "@shared/constants/api";
import { ChatWithContactInfo } from "../chat-list.types";
import { styles } from "./chat-item.styles";

export function ChatListItem(props: { chat: ChatWithContactInfo }) {
    const { chat } = props;
    
    return (
        <View style={styles.container}>
            <Image source={`${apiMediaUrl}${chat.participant.avatar}`} style={styles.avatar}/>
            <View style={styles.textBlock} >
                <Text style={styles.name} >{
                    "contactOf" in chat.participant
                    ? chat.participant.contactOf.localName
                    : chat.participant.name
                }</Text>
                <Text style={styles.message} >
                    {
                        chat.lastMessage?.senderId === chat.participant.id
                        ? `${chat.participant.name}: `
                        : "You: "
                    }
                    {chat.lastMessage?.text}
                </Text>
            </View>
            <Text style={styles.time} >{
                chat.lastMessage?.updatedAt
                ? chat.lastMessage?.updatedAt
                : chat.lastMessage?.createdAt
            }</Text>
        </View>
    )
}
