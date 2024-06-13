import { baseApi } from "../../api/baseApi";

const countryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCountries: builder.query({
      query: () => ({
        url: "/country/countries",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCountriesQuery } = countryApi;
