import { Message } from "../../../model";

interface MessageItemProps {
	message: Message;
	userId: number;
}

export interface MessageListItemProps extends MessageItemProps {}

export interface MediaMessageItemProps extends MessageItemProps {}
export interface TextMessageItemProps extends MessageItemProps {}
