export type Contact = {
	id: number;
	localName: string;
	avatar: string | null;
	addedAt: Date;
	contactUserId: number;
	ownerId: number;
};
