import { AdditionalLinks, LoginForm, WelcomeBlock } from "@modules/auth";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function App() {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<WelcomeBlock />
				<LoginForm />
				<AdditionalLinks
					text="Don't have an account? "
					linkText="Register now!"
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
