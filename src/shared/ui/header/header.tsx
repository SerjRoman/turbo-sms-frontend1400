import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderProps } from "./header.types";
import { styles } from "./header.styles";

export function Header(props: HeaderProps) {
	const { bottom, title, left, right } = props;
	const doShowTop = left || title || right;
	return (
		<SafeAreaView edges={["top"]} style={styles.container}>
			{doShowTop && (
				<View style={styles.headerTop}>
					{left && <View>{left}</View>}
					{title && <Text style={styles.title}>{title}</Text>}
					{right && <View>{right}</View>}
				</View>
			)}
			{bottom && <View>{bottom}</View>}
		</SafeAreaView>
	);
}
