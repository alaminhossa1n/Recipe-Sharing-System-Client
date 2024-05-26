import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/user/create-user ",
        method: "POST",
        body: userInfo,
      }),
    }),

    getSingleUser: builder.query({
      query: (queryParams) => ({
        url: "/user/get-single-user",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["users"],
    }),

    updateCoin: builder.mutation({
      query: (info) => ({
        url: "/user/update-coin",
        method: "PATCH",
        body: info,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetSingleUserQuery,
  useUpdateCoinMutation,
} = authApi;
