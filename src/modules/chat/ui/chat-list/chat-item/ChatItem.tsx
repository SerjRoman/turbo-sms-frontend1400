import { View, Text } from "react-native";
import { Image } from "expo-image"
import { apiMediaUrl } from "@shared/constants/api";
import { ChatWithContactInfo } from "../types";
import { styles } from "./chat-item.styles";

export function ChatItem(props: {item: ChatWithContactInfo}){
    const { item } = props
    return <View style={styles.chatBlock}>
        <Image source={`${apiMediaUrl}${item.participant.avatar}`} style={styles.avatar}/>
        <View style={styles.textBlock} >
            <Text style={styles.name} >{
                "contactOf" in item.participant
                ? item.participant.contactOf.localName
                : item.participant.name
            }</Text>
            <Text style={styles.message} >
                {
                    item.lastMessage?.senderId === item.participant.id
                    ? `${item.participant.name}: `
                    : "You: "
                }
                {item.lastMessage?.text}
            </Text>
        </View>
        <Text style={styles.time} >{
            item.lastMessage?.updatedAt
            ? item.lastMessage?.updatedAt
            : item.lastMessage?.createdAt
        }</Text>
    </View>
}