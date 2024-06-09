import { baseApi } from "../../api/baseApi";

const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRecipe: builder.mutation({
      query: (recipeInfo) => ({
        url: "/recipe/create-recipe",
        method: "POST",
        body: recipeInfo,
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

    updateRecipe: builder.mutation({
      query: ({ id, recipeInfo }) => ({
        url: `/recipe/update/${id}`,
        method: "PATCH",
        body: recipeInfo,
      }),
      invalidatesTags: ["recipes"],
    }),
  }),
});

export const {
  useAddRecipeMutation,
  useGetAllRecipeQuery,
  useGetSingleRecipeQuery,
  useUpdateRecipeMutation
} = recipeApi;
