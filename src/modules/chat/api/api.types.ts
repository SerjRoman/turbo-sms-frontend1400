import { PaginatedResponse, PaginationParams } from "@shared/types";
import { Message } from "../model";

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
						avatar: string | null;
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

export type ChatWithParticipantInfoResponse = Chat & {
	lastMessage: LastMessage | null;
} & {
	participants: [
		{
			user: ChatUserInfo & {
				contactOf: [
					{
						id: number;
						avatar: string | null;
						localName: string;
						addedAt: Date;
					},
				];
			};
		} & {
			chatId: number;
			userId: number;
		},
	];
};
export interface CreateChatPayload {
	contactUserId: number;
}

export type PaginatedMessagesResponse = PaginatedResponse<Message>;
export interface MessagesPayload extends PaginationParams {
	chatId: number;
}
export type UploadMessageMediaPayload = {
	media: string;
};

export type UploadMessageMediaResponse = {
	media: string;
};
