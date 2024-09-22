import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://recipe-sharing-system-server.vercel.app/api",
		// baseUrl: "http://localhost:5000/api",
		credentials: "include",
	}),
	tagTypes: ["recipes", "users", "categories"],
	endpoints: () => ({}),
})
