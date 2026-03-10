import { AdditionalLinks, LoginForm, WelcomeBlock } from "@modules/auth";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
	return (
		<SafeAreaView style={styles.container}>
			<WelcomeBlock />
            <Text>Register now</Text>
			<AdditionalLinks
				text="Already have an account?"
				linkText="Login now!"
                link={"/login"}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
