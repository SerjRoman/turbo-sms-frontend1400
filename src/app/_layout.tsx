import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

// [ (about.tsx), (index.tsx) ]
export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<KeyboardProvider>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="index" />
					<Stack.Screen name="(auth)" />
				</Stack>
			</KeyboardProvider>
		</SafeAreaProvider>
	);
}
