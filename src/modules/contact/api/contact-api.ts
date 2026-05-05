import { baseApi } from "@shared/api/base-api";
import {
	CreateContactResponse,
	CreateContactRequest,
	GetContactByIdResponse,
} from "./types";
import { User } from "@modules/auth/models/types";
import { ChatWithContactInfo } from "@modules/chat/api/api.types";

const contactApi = baseApi.injectEndpoints({
	endpoints(builder) {
		return {
			contactCreate: builder.mutation<
				CreateContactResponse,
				CreateContactRequest
			>({
				query: (body) => ({
					url: "/contacts/",
					body,
					method: "POST",
				}),
			}),
			getAllContacts: builder.query<ChatWithContactInfo[], void>({
				query: () => "/contacts/",
			}),

			getUserByUsername: builder.query<User, string>({
				query: (username) => `/users/${username}`,
			}),

			getContactById: builder.query<GetContactByIdResponse, number>({
				query: (id) => `/contacts/${id}`,
			}),
		};
	},
});
export const {
	useContactCreateMutation,
	useGetAllContactsQuery,
	useGetContactByIdQuery,
	useGetUserByUsernameQuery,
	useLazyGetUserByUsernameQuery,
} = contactApi;
