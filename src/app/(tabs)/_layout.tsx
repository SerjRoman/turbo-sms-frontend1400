import { COLORS, FONT_SIZE } from "@shared/constants";
import { Icons } from "@shared/ui";
import { Tabs } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					backgroundColor: COLORS.bisqueSecondary,
				},
				tabBarLabelStyle: {
					fontSize: FONT_SIZE.small,
					color: COLORS.black,
				},
				header: () => {
					return (
						<SafeAreaView edges={["top"]}>
							<Text>Header</Text>
						</SafeAreaView>
					);
				},
			}}
		>
			<Tabs.Screen
				name="contacts"
				options={{
					tabBarIcon: ({ focused }) => (
						<Icons.ContactsIcon
							fill={focused ? COLORS.grey : COLORS.black}
						/>
					),
					tabBarLabel: "Contacts",
					header: () => {
						return (
							<SafeAreaView edges={["top"]}>
								<Text>Contacts</Text>
							</SafeAreaView>
						);
					},
				}}
			/>
			<Tabs.Screen
				name="chats"
				options={{
					tabBarIcon: ({ focused }) => (
						<Icons.ChatsIcon
							fill={focused ? COLORS.grey : COLORS.black}
						/>
					),
					tabBarLabel: "Chats",
					header: () => {
						return (
							<SafeAreaView edges={["top"]}>
								<Text>Chats</Text>
							</SafeAreaView>
						);
					},
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarIcon: ({ focused }) => (
						<Icons.ProfileIcon
							fill={focused ? COLORS.grey : COLORS.black}
						/>
					),
					tabBarLabel: "Profile",
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					tabBarIcon: ({ focused }) => (
						<Icons.SettingsIcon
							fill={focused ? COLORS.grey : COLORS.black}
						/>
					),
					tabBarLabel: "Settings",
				}}
			/>
		</Tabs>
	);
}
