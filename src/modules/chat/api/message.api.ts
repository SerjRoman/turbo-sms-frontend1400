import { baseApi, ClientSocket } from "@shared/api";
import type {
	MessagesPayload,
	PaginatedMessagesResponse,
	UploadMessageMediaPayload,
	UploadMessageMediaResponse,
} from "./api.types";
import type { Message } from "../model";

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
			uploadMessageMedia: build.mutation<
				UploadMessageMediaResponse,
				UploadMessageMediaPayload
			>({
				query: (body) => {
					const form = new FormData();
					form.append("media", {
						uri: body.media,
						name: `${Date.now()}.jpg`,
						type: "image/jpeg",
					} as any);

					return {
						url: "/messages/media",
						body: form,
						method: "POST",
					};
				},
			}),
		};
	},
});

export const { useGetMessagesQuery, useUploadMessageMediaMutation } =
	messageApi;
