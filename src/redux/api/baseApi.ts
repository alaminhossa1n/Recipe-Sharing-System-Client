import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://recipe-sharing-system-server.vercel.app/api",
    // https://recipe-sharing-system-server.vercel.app/api
    // http://localhost:5000/
    credentials: "include",
  }),
  tagTypes: ["recipes", "users"],
  endpoints: () => ({}),
});
