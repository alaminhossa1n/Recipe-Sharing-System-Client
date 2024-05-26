export type TRecipe = {
  recipeName: string;
  recipeImage?: string;
  recipeDetails: string;
  video?: string;
  country: string;
  category: string;
  purchased_by?: string;
  creatorEmail: string;
};

export type TUser = {
  displayName: string;
  photoURL: string;
  email: string;
  coin: number;
};
