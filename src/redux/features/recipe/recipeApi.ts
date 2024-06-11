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

    viewRecipe: builder.mutation({
      query: ({ id, recipeInfo }) => ({
        url: `/recipe/view-recipe/${id}`,
        method: "PATCH",
        body: recipeInfo,
      }),
      invalidatesTags: ["recipes"],
    }),

    reactRecipe: builder.mutation({
      query: ({ recipeId, viewerEmail }) => ({
        url: `/recipe/react-recipe/${recipeId}`,
        method: "PATCH",
        body: {viewerEmail},
      }),
      invalidatesTags: ["recipes"],
    }),
  }),
});

export const {
  useAddRecipeMutation,
  useGetAllRecipeQuery,
  useGetSingleRecipeQuery,
  useViewRecipeMutation,
  useReactRecipeMutation
} = recipeApi;
