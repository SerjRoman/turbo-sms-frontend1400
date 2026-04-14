import { baseApi } from "@shared/api/base-api";
import {
	LoginCredentials,
	LoginResponse,
	MeResponse,
	RegisterCredentials,
	RegisterResponse,
} from "./api.types";
const authApi = baseApi
	.enhanceEndpoints({ addTagTypes: ["User"] })
	.injectEndpoints({
		endpoints(builder) {
			return {
				login: builder.mutation<LoginResponse, LoginCredentials>({
					query: (body) => ({
						url: "/users/login",
						body,
						method: "POST",
					}),
				}),
				register: builder.mutation<
					RegisterResponse,
					RegisterCredentials
				>({
					query: (body) => {
						const form = new FormData();
						form.append("avatar", {
							uri: body.avatar,
							name: `${Date.now()}.jpg`,
							type: "image/jpeg",
						} as any);
						form.append("username", body.username);
						form.append("name", body.name);
						form.append("surname", body.surname);
						form.append("email", body.email);
						form.append("password", body.password);

						return {
							url: "/users/register",
							body: form,
							method: "POST",
						};
					},
				}),

				me: builder.query<MeResponse, void>({
					query() {
						return {
							url: "users/me",
						};
					},
				}),
			};
		},
	});

export const {
	useLoginMutation,
	useMeQuery,
	useRegisterMutation,
	useLazyMeQuery,
} = authApi;
