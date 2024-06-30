import { ChangeEvent, useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard";
import { useGetAllCategoriesQuery } from "../../redux/features/category/categoryApi";
import { useGetAllCountriesQuery } from "../../redux/features/country/countryApi";
import { useGetAllRecipeQuery } from "../../redux/features/recipe/recipeApi";
import { TRecipe } from "../../interface/interface";

const Recipes: React.FC = () => {
  const { data: categoryData } = useGetAllCategoriesQuery(null);
  const { data: countryData } = useGetAllCountriesQuery(null);

  const categories = categoryData?.data || [];
  const countries = countryData?.data || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const [filters, setFilters] = useState({
    recipeName: "",
    category: "",
    country: "",
  });

  // Fetch recipes with the filter values
  const { data, isLoading, isError } = useGetAllRecipeQuery(filters);

  const recipes = data?.data || [];

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  // Update filters whenever searchQuery, selectedCategory, or selectedCountry change
  useEffect(() => {
    setFilters({
      recipeName: searchQuery,
      category: selectedCategory,
      country: selectedCountry,
    });
  }, [searchQuery, selectedCategory, selectedCountry]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading recipes.</div>;
  }

  return (
    <div className="container mx-auto px-4 mt-28">
      <div className="my-4 w-full flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name"
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-1/2 justify-between mx-auto">
        <div className="mb-4 sm:mb-0 sm:mr-2">
          <label className="block text-gray-700">Category</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a category</option>
            {categories &&
              categories.map(
                (category: { categoryName: string }, index: number) => (
                  <option key={index} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                )
              )}
          </select>
        </div>

        <div className="mb-4 sm:mb-0 sm:ml-2">
          <label className="block text-gray-700">Country</label>
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a country</option>
            {countries &&
              countries.map(
                (country: { countryName: string }, index: number) => (
                  <option key={index} value={country.countryName}>
                    {country.countryName}
                  </option>
                )
              )}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 mt-10">
        {recipes &&
          recipes.map((recipe: TRecipe, i: number) => (
            <RecipeCard key={i} recipe={recipe} />
          ))}
      </div>
    </div>
  );
};

export default Recipes;
