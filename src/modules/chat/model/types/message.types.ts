export interface Message {
	id: number;
	chatId: number;
	type: "media" | "text";
	text: string | null;
	media: string | null;
	senderId: number;
	chatAsLastMessageId: number;
	createdAt: string;
	updatedAt: string;
}
