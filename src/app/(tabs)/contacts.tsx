import { Button } from "@shared/ui/button";
import { useState } from "react";
import { Alert, Modal, Text, View } from "react-native";

export default function Contacts() {
	// const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<View style={{ flex: 1 }}>
			{/* <Button title="Open" onPress={() => setIsOpen(true)} /> */}
			{/* <Modal
				visible={isOpen}
				onRequestClose={() => {
					Alert.alert("Hello");
					setIsOpen(false);
				}}
				// transparent
				animationType="fade"
				backdropColor={"blue"}
			>
				<Text>Text....</Text>
				<Button title="Close" onPress={() => setIsOpen(false)} />
			</Modal> */}
		</View>
	);
}
