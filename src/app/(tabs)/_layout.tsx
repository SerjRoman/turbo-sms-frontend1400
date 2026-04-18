import { HeaderChats } from "@modules/chat";
import { HeaderContacts } from "@modules/contact";
import { HeaderProfile } from "@modules/profile";
import { HeaderSettings } from "@modules/settings";
import { COLORS, FONT_SIZE } from "@shared/constants";
import { Icons } from "@shared/ui/icons";
import { Tabs } from "expo-router";

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
					header: () => <HeaderContacts />,
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
					header: () => <HeaderChats />,
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
					header: () => <HeaderProfile />,
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
					header: () => <HeaderSettings />,
					tabBarLabel: "Settings",
				}}
			/>
		</Tabs>
	);
}
// Сделай за 15 минут
