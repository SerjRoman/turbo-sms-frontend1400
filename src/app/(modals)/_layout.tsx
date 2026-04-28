import { HeaderBack } from "@shared/ui/header";
import { Stack } from "expo-router";

export default function ModalLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="create-contact/step-one"
				options={{
					header: () => <HeaderBack title="Find User" />,
				}}
			/>
			<Stack.Screen
				name="create-contact/step-two"
				options={{
					header: () => <HeaderBack title="Create Contact" />,
				}}
			/>
		</Stack>
	);
}
