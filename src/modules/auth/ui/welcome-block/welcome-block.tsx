import { IMAGES } from "@shared/ui";
import { View, Text } from "react-native";
import { styles } from "./welcome-block.styles";

export function WelcomeBlock() {
	return (
		<View style={styles.container}>
			<IMAGES.LogoImage style={styles.logo} />
			<Text style={styles.title}>Welcome to TurboSMS</Text>
		</View>
	);
}
