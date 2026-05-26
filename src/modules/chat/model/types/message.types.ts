export interface Message {
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
