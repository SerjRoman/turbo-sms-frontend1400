import { View, Text } from "react-native";
import { styles } from "./welcome-block.styles";
import { Images } from "@shared/ui/images";

export function WelcomeBlock() {
	return (
		<View style={styles.container}>
			<Images.LogoImage style={styles.logo} />
			<Text style={styles.title}>Welcome to TurboSMS</Text>
		</View>
	);
}
