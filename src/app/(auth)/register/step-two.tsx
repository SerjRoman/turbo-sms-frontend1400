import { AdditionalLinks, RegisterForm, WelcomeBlock } from "@modules/auth";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StepTwo() {
	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<WelcomeBlock />
				<RegisterForm.StepTwo />
				<AdditionalLinks
					text="Already have an account? "
					linkText="Login now!"
					link={"/login"}
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
