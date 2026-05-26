import type { ChatWithContactInfo } from "../../../api/api.types";

export interface ChatListItemProps {
	chat: ChatWithContactInfo;
    isMyMessage: (senderId: number) => boolean
    isUserOnline: (userId: number) => boolean
}
