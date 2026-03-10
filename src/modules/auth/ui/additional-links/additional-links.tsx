import { View, Text } from "react-native";
import { styles } from "./additional-links.styles";

export function AdditionalLinks({
	text,
	linkText,
}: {
	text: string;
	linkText: string;
}) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{text}</Text>
			<Text style={styles.linkText}>{linkText}</Text>
		</View>
	);
}
