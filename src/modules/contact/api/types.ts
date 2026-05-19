import { User } from "../@x";

export type GetContactByIdRequest = {
	id: number;
};

export type GetContactByIdResponse = {
	id: number;
	localName: string;
	avatar: null | string;
	addedAt: Date;
	contactUser: User;
	onwer: User;
};

export type GetMyContactsResponse = {
	id: number;
	localName: string;
	avatar: null | string;
	addedAt: Date;
	contactUser: User;
	onwer: User;
}[];

export type CreateContactResponse = {
	name: string;
	surname: string;
	contactUserId: number;
	avatar: null | string;
};

export type CreateContactRequest = {
	name: string;
	surname: string;
	contactUserId: number;
	avatar: null | string;
};
