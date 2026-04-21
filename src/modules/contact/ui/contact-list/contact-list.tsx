import { FlatList, Text, View } from "react-native";
import { styles } from "./contact-list.styles"
import { Image } from "expo-image";
import { apiMediaUrl } from "@shared/constants/api";
import { GetMyContactsResponse } from "@modules/contact/api/types";

type Contacts = {
    id: number;
    localName: string;
    avatar: string | null;
}

type Props = {
    contacts: Contacts[];
}

export function ContactList({ contacts }: Props) {
    return (
        <FlatList
            data= {contacts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style = {styles.itemContainer}>
                    <Image source={`${apiMediaUrl}${item.avatar}`} style = {styles.avatar}/>
                    <View style={styles.textContainer}>
                        <Text style = {styles.name}>{item.localName}</Text>
                    </View>
                </View>
            )}
        />
    )
}

// Дмітрику будь ласка створи файл з тіпами .types