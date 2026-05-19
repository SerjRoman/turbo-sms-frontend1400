import { baseApi, ClientSocket } from "@shared/api";
import {
	Message,
	MessagesPayload,
	PaginatedMessagesResponse,
} from "./api.types";

const messageApi = baseApi.injectEndpoints({
	endpoints(build) {
		return {
			getMessages: build.query<
				PaginatedMessagesResponse,
				MessagesPayload
			>({
				query: (arg) =>
					`/messages/chat/${arg.chatId}?page=${arg.page}&take=${arg.take}`,
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
					return currentArg?.chatId !== previousArg?.chatId;
				},
			}),
		};
	},
});

export const { useGetMessagesQuery } = messageApi;
