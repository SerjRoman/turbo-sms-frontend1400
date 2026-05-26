import { baseApi, ClientSocket } from "@shared/api";
import { MessagesPayload, PaginatedMessagesResponse } from "./api.types";
import { Message } from "../model";

const messageApi = baseApi.injectEndpoints({
	endpoints(build) {
		return {
			getMessages: build.query<
				PaginatedMessagesResponse,
				MessagesPayload
			>({
				query: (arg) =>
					`/messages/chats/${arg.chatId}?page=${arg.page}&take=${arg.take}`,
				async onCacheEntryAdded(arg, api) {
					await api.cacheDataLoaded;

					function onNewMessage(newMessage: Message) {
						if (arg.chatId === newMessage.chatId) {
							api.updateCachedData((draft) => {
								draft.data.unshift(newMessage);
							});
						}
					}
					ClientSocket.on("newChatMessage", onNewMessage);

					await api.cacheEntryRemoved;
					ClientSocket.off("newChatMessage", onNewMessage);
				},
				keepUnusedDataFor: 0,
				forceRefetch: ({ currentArg, previousArg }) => {
					return currentArg !== previousArg;
				},
				merge: (currentCache, responseData) => {
					currentCache.data.push(...responseData.data);
				},
				serializeQueryArgs: ({ queryArgs }) => queryArgs.chatId,
			}),
		};
	},
});

export const { useGetMessagesQuery } = messageApi;
