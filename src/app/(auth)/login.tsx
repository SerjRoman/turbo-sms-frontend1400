import { AdditionalLinks, LoginForm, WelcomeBlock } from "@modules/auth";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
	return (
		<SafeAreaView style={styles.container}>
			<WelcomeBlock />
			<LoginForm />
			<AdditionalLinks
				text="Don't have an account? "
				linkText="Register now!"
				link={"/register/step-one"}
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
