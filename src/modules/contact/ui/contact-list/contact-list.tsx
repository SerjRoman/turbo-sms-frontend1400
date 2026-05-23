import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./contact-list.styles";
import { Image } from "expo-image";
import { apiMediaUrl } from "@shared/constants/api";
import type { Contact } from "../../model";

type Props = {
	contacts: Contact[];
	onItemPress?: (item: Contact) => void;
};

export function ContactList({ contacts, onItemPress }: Props) {
	return (
		<FlatList
			data={contacts}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item }) => {
				return (
					<TouchableOpacity
						style={styles.itemContainer}
						onPress={() => onItemPress?.(item)}
					>
						<Image
							source={
								item.avatar
									? `${apiMediaUrl}${item.avatar}`
									: ``
							}
							style={styles.avatar}
						/>
						<View style={styles.textContainer}>
							<Text style={styles.name}>{item.localName}</Text>
						</View>
					</TouchableOpacity>
				);
			}}
		/>
	);
}
