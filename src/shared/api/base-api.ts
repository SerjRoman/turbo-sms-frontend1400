import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Post {
	id: string;
	userId: number;
	title: string;
	body: string;
}
// https://redux-toolkit.js.org/rtk-query/overview
export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
	/**
	 * tagTypes: ["Posts"]
	 * ------------------
	 * Здесь мы объявляем все типы тегов, которые будем использовать в нашем API.
	 * Это как бы "регистрация" возможных тегов. В данном случае, мы регистрируем
	 * один тип тега — "Posts". Это позволяет RTK Query знать о его существовании
	 * и отслеживать, какие запросы с ним связаны.
	 * Вы можете объявить несколько типов тегов, например: ["Posts", "Users", "Comments"].
	 */
	tagTypes: ["Posts", "Users", "Comments"],
	endpoints(builder) {
		return {
			getPosts: builder.query<Post[], void>({
				query: function () {
					return { url: "posts" };
				},
				/**
				 * providesTags: ["Posts"]
				 * -----------------------
				 * Эта опция "привязывает" данные, полученные этим запросом, к тегу "Posts".
				 * Когда `getPosts` успешно выполняется, RTK Query помечает полученный
				 * список постов тегом "Posts". Теперь RTK Query знает, что кэш этого
				 * запроса ассоциирован с этим тегом. Если какой-либо другой запрос
				 * сделает этот тег недействительным, `getPosts` будет автоматически
				 * выполнен повторно для обновления данных.
				 */
				providesTags: ["Posts"],
			}),
			addPost: builder.mutation<Post, Omit<Post, "id">>({
				query: function (body) {
					return {
						url: "posts",
						method: "POST",
						body,
					};
				},
				/**
				 * invalidatesTags: ["Posts"]
				 * ---------------------------
				 * Эта опция объявляет, какие теги становятся недействительными ("инвалидируются")
				 * после успешного выполнения этой мутации.
				 * Когда `addPost` успешно завершается (т.е., новый пост добавлен на сервере),
				 * RTK Query видит, что тег "Posts" стал недействительным.
				 *
				 * После этого RTK Query автоматически найдет все активные "query" эндпоинты,
				 * которые предоставляют (`providesTags`) тег "Posts" (в нашем случае это `getPosts`),
				 * и выполнит их повторно, чтобы получить свежие данные с сервера.
				 *
				 * В результате, любой компонент, использующий хук `useGetPostsQuery`,
				 * автоматически получит обновленный список постов, включающий только что добавленный пост.
				 */
				invalidatesTags: ["Posts"],
			}),
		};
	},
});
export const { useGetPostsQuery, useAddPostMutation } = baseApi;
