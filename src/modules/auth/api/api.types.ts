import { User } from "../models/types";

export interface LoginResponse {
	token: string;
}
export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterResponse {
	token: string;
}
export interface RegisterCredentials {
    email: string,
    password: string,
    username: string,
    name: string, 
    surname: string,
    avatar?: string | null
}

export type MeResponse = User;
