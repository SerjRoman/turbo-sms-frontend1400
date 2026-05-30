export interface Message {
	id: number;
	chatId: number;
	type: string;
	text: string | null;
	media: string | null;
	senderId: number;
	chatAsLastMessageId: number;
	createdAt: string;
	updatedAt: string;
}
