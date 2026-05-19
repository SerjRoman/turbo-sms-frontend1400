import { io, Socket } from "socket.io-client";
import { wsUrl } from "../../constants/api";
import { ClientEvents, ServerEvents } from "./contract";

export const ClientSocket: Socket<ServerEvents, ClientEvents> = io(wsUrl, {
	autoConnect: false,
});
