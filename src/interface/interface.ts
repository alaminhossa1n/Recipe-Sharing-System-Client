export type TRecipe = {
	_id?: string
	recipeName: string
	recipeImage?: string
	recipeDetails: string
	video?: string
	country: string
	category: string
	purchased_by?: string[]
	reactors?: string[]
	creatorEmail: string
	watchCount: number
}

export type TUser = {
	displayName: string
	photoURL: string
	email: string
	coin: number
}
