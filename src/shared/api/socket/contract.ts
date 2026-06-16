interface Message {
	id: number;
	type: "text" | "media";
	text: string | null;
	media: string | null;
	chatAsLastMessageId: number;
	createdAt: string;
	updatedAt: string;
	senderId: number;
	chatId: number;
}
export type ChatWithLastMessage = {
	id: number;
	lastMessageId: number | null;
	lastMessage: Message | null;
};
export type ChatUpdatePayload = ChatWithLastMessage & {
	senderId: number;
	senderFullname: string;
};

export interface JoinChatPayload {
	chatId: number;
}
export interface LeaveChatPayload {
	chatId: number;
}
export type GetOnlineUsersAcknowlegment = (response: {
	userIds: number[];
}) => void;
export interface UserStatus {
	userId: number;
	status: "online" | "offline";
}
export type JoinChatCallback = (
	response: { status: "ok" } | { status: "error"; message?: string },
) => void;
export type SubscribeAndGetInitialStatusesAcknowlegment = (response: {
	statuses: UserStatus[];
}) => void;

export interface ClientEvents {
	joinChat: (data: JoinChatPayload, ack?: JoinChatCallback) => void;
	leaveChat: (data: LeaveChatPayload) => void;
	sendMessage: (data: SendMessagePayload) => void;
	getOnlineUsers: (
		userIds: number[],
		ack?: GetOnlineUsersAcknowlegment,
	) => void;
	subscribeAndGetInitialStatuses: (
		userIds: number[],
		ack?: SubscribeAndGetInitialStatusesAcknowlegment,
	) => void;
}
export type SendMessagePayload = {
	type: "text" | "media";
	text?: string | null;
	media?: string | null;
	chatId: number;
};

export interface ServerEvents {
	newChatMessage: (data: Message) => void;
	userStatusUpdated: (status: UserStatus) => void;
	chatUpdate: (data: ChatUpdatePayload) => void;
}
