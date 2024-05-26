import { baseApi } from "../../api/baseApi";

const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRecipe: builder.mutation({
      query: (productInfo) => ({
        url: "/recipe/create-recipe",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["recipes"],
    }),

    getAllRecipe: builder.query({
      query: (queryParams) => ({
        url: "/recipe/all-recipe",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["recipes"],
    }),

    getSingleRecipe: builder.query({
      query: (queryParams) => ({
        url: `/recipe/single-recipe/${queryParams}`,
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["recipes"],
    }),
  }),
});

export const {
  useAddRecipeMutation,
  useGetAllRecipeQuery,
  useGetSingleRecipeQuery,
} = recipeApi;
