import { createSlice } from "@reduxjs/toolkit"

type TInitialState = {
	user: null | object
	token: null | string
}
const initialState: TInitialState = {
	user: null,
	token: null,
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken: (state, action) => {
			const { user, token } = action.payload
			state.user = user
			state.token = token
		},
		logout: (state) => {
			state.user = null
			state.token = null
		},
	},
})

export const { setToken, logout } = authSlice.actions
export default authSlice.reducer
