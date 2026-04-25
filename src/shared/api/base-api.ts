import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { queryHeaders } from "./headers";
import { apiUrl } from "../constants/api";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        prepareHeaders: queryHeaders,
    }),
    endpoints: () => ({}),
});
