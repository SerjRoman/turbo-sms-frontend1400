import { AdditionalLinks, RegisterForm, WelcomeBlock } from "@modules/auth";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StepOne() {
	return (
		<SafeAreaView style={styles.container}>
			<WelcomeBlock />
			<RegisterForm.StepOne />
			<AdditionalLinks
				text="Already have an account? "
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
