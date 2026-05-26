import { baseApi } from "@shared/api";
import {
	Chat,
	ChatWithContactInfo,
	ChatWithParticipantInfoResponse,
	CreateChatPayload,
} from "./api.types";

const chatApi = baseApi
	.enhanceEndpoints({
		addTagTypes: ["Chats"],
	})
	.injectEndpoints({
		endpoints(builder) {
			return {
				createChat: builder.mutation<Chat, CreateChatPayload>({
					query(body) {
						return {
							url: "/chats",
							body,
							method: "POST",
						};
					},
					invalidatesTags: ["Chats"],
				}),
				getAllChats: builder.query<ChatWithContactInfo[], void>({
					query() {
						return {
							url: "/chats",
						};
					},
					transformResponse: (
						response: ChatWithParticipantInfoResponse[],
					): ChatWithContactInfo[] => {
						return response.map((responseChat) => {
							const { participants, ...chat } = responseChat;
							let isInContact = false;
							const user = participants[0].user;
							if (user.contactOf.length > 0) {
								isInContact = true;
							}
							if (isInContact) {
								return {
									...chat,
									isInContact: true,
									participant: {
										id: user.id,
										avatar: user.avatar,
										name: user.name,
										surname: user.surname,
										lastSeenAt: user.lastSeenAt,
										contactOf: user.contactOf[0],
									},
								};
							} else {
								return {
									...chat,
									isInContact: false,
									participant: {
										id: user.id,
										avatar: user.avatar,
										name: user.name,
										surname: user.surname,
										lastSeenAt: user.lastSeenAt,
									},
								};
							}
						});
					},
					providesTags: ["Chats"],
				}),
			};
		},
	});

export const { useGetAllChatsQuery, useCreateChatMutation } = chatApi;
