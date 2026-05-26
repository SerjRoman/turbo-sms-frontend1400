interface Message {
	id: number;
	type: string;
	text: string | null;
	mediaUrl: string | null;
	chatAsLastMessageId: number;
	createdAt: string;
	updatedAt: string;
	senderId: number;
	chatId: number;
}

export interface JoinChatPayload {
	chatId: number;
}
export interface LeaveChatPayload {
	chatId: number;
}
export type GetOnlineUsersAcknowlegment = (response: {
	userIds: number[];
}) => void;

export type JoinChatCallback = (
	response: { status: "ok" } | { status: "error"; message?: string },
) => void;

export interface ClientEvents {
	joinChat: (data: JoinChatPayload, ack?: JoinChatCallback) => void;
	leaveChat: (data: LeaveChatPayload) => void;
	sendMessage: (data: SendMessagePayload) => void;
	getOnlineUsers: (
		userIds: number[],
		ack?: GetOnlineUsersAcknowlegment,
	) => void;
}
export type SendMessagePayload = {
	type: "text" | "image";
	text?: string | null;
	mediaUrl?: string | null;
	chatId: number;
};

export interface ServerEvents {
	newChatMessage: (data: Message) => void;
}
