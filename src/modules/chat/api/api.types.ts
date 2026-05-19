export interface LastMessage {
	id: number;
	chatId: number;
	type: string;
	text: string | null;
	mediaUrl: string | null;
	senderId: number;
	chatAsLastMessageId: number;
	createdAt: string;
	updatedAt: string;
}

export interface Chat {
	id: number;
	lastMessageId: number | null;
}

export interface ChatUserInfo {
	name: string;
	id: number;
	surname: string;
	avatar: string;
	lastSeenAt: string;
}

export type ChatWithContactInfo = Chat & {
	lastMessage: LastMessage | null;
} & (
		| ({
				participant: ChatUserInfo & {
					contactOf: {
						id: number;
						avatar: string;
						localName: string;
						addedAt: Date;
					};
				};
		  } & {
				isInContact: true;
		  })
		| ({
				participant: ChatUserInfo;
		  } & {
				isInContact: false;
		  })
	);

export interface Message {
	id: number;
	type: string;
	text: string | null;
	mediaUrl: string | null;
	chatAsLastMessageId: number;
	createdAt: Date;
	updatedAt: Date;
	senderId: number;
	chatId: number;
}

export type ChatWithParticipantInfoResponse = Chat & {
	lastMessage: LastMessage | null;
} & {
	participants: [ChatUserInfo];
};
export interface CreateChatPayload {
	contactUserId: number;
}

export interface PaginatedResponse {}

export type PaginatedMessagesResponse = {
	data: Message[];
	meta: PaginatedResponse;
};
export interface MessagesPayload {
	chatId: number;
	page: number;
}
