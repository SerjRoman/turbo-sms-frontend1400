import { AdditionalLinks, LoginForm, WelcomeBlock } from "@modules/auth";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAwareScrollView contentContainerStyle={styles.container}>
				<WelcomeBlock />
				<LoginForm />
				<AdditionalLinks
					text="Don't have an account? "
					linkText="Register now!"
					link={"/register/step-one"}
				/>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
