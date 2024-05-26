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
  }),
});

export const { useAddRecipeMutation } = recipeApi;
