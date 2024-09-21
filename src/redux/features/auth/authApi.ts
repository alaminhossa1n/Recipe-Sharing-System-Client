import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    googleLogin: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/google-signin",
        method: "POST",
        body: userInfo,
      }),
    }),

    registration: builder.mutation({
      query: (userInfo) => ({
        url: "/user/create-user",
        method: "POST",
        body: userInfo,
      }),
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signin",
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

    buyCoin: builder.mutation({
      query: (info) => ({
        url: "/user/buy-coin",
        method: "PATCH",
        body: info,
      }),
    }),
  }),
});

export const {
  useGoogleLoginMutation,
  useLoginMutation,
  useRegistrationMutation,
  useGetSingleUserQuery,
  useBuyCoinMutation,
} = authApi;
