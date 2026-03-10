import { View, Text } from "react-native";
import { styles } from "./additional-links.styles";
import { Href, Link } from "expo-router";

export function AdditionalLinks({
	text,
	linkText,
	link,
}: {
	text: string;
	linkText: string;
	link: Href;
}) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{text}</Text>
			<Link href={link} replace>
				<Text style={styles.linkText}>{linkText}</Text>
			</Link>
		</View>
	);
}
