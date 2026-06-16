import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	requestNotificationPermission,
	sendMessageNotification,
} from "../model";
import { ChatUpdatePayload, ClientSocket } from "@shared/api";
import { setNotificationHandler } from "expo-notifications";
// import { useUserContext } from "@modules/auth";

setNotificationHandler({
	handleNotification: async () => {
		return {
			shouldSetBadge: true,
			shouldShowBanner: true,
			shouldPlaySound: false,
			shouldShowList: false,
		};
	},
});
interface NotificationContextData {
	activeChatId: number | null;
	setActiveChatId: (activeChatId: number | null) => void;
}
const NotificationContext = createContext<null | NotificationContextData>(null);

export function useNotificationContext() {
	const ctx = useContext(NotificationContext);
	if (!ctx)
		throw new Error("Notification Context is not wrapped in Provider");
	return ctx;
}

export function NotificationProvider({ children }: PropsWithChildren) {
	// const { user } = useUserContext();
	const [activeChatId, setActiveChatId] = useState<number | null>(null);
	useEffect(() => {
		async function requestPermission() {
			try {
				await requestNotificationPermission();
			} catch (error) {
				console.log(error);
			}
		}
        requestPermission()
	}, []);
	useEffect(() => {
		function handleChatUpdate(chat: ChatUpdatePayload) {
			if (activeChatId === chat.id) return;
			const { lastMessage } = chat;
			const messageText =
				(lastMessage?.type === "text"
					? lastMessage.text?.slice(0, 30)
					: "Media message") || "New message";
			sendMessageNotification(chat.senderFullname, messageText);
		}
		ClientSocket.on("chatUpdate", handleChatUpdate);
		return () => {
			ClientSocket.off("chatUpdate", handleChatUpdate);
		};
	}, []);
	return (
		<NotificationContext value={{ activeChatId, setActiveChatId }}>
			{children}
		</NotificationContext>
	);
}
