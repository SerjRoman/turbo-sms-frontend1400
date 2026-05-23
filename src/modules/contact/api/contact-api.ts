import { baseApi } from "@shared/api/base-api";
import {
	CreateContactResponse,
	CreateContactRequest,
	GetContactByIdResponse,
	GetMyContactsResponse,
} from "./types";
import { User } from "@modules/auth/models/types";

const contactApi = baseApi
	.enhanceEndpoints({
		addTagTypes: ["Contacts"],
	})
	.injectEndpoints({
		endpoints(builder) {
			return {
				createContact: builder.mutation<
					CreateContactResponse,
					CreateContactRequest
				>({
					query: (body) => {
						const form = new FormData();
						form.append("avatar", {
							uri: body.avatar,
							name: `${Date.now()}.jpg`,
							type: "image/jpeg",
						} as any);
						form.append("localName", body.localName);
						form.append("contactUserId", `${body.contactUserId}`);
						return {
							url: "/contacts/",
							body: form,
							method: "POST",
						};
					},
					invalidatesTags: ["Contacts"],
				}),
				getAllContacts: builder.query<GetMyContactsResponse, void>({
					query: () => "/contacts/",
					providesTags: ["Contacts"],
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
	useCreateContactMutation,
	useGetAllContactsQuery,
	useGetContactByIdQuery,
	useGetUserByUsernameQuery,
	useLazyGetUserByUsernameQuery,
} = contactApi;
