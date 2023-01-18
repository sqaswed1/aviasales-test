import { createSlice } from '@reduxjs/toolkit';

const sortReducer = createSlice({
	name: 'sortFilter',
	initialState: {
		value: 'cheapest',
	},
	reducers: {
		sortChange(state, action) {
			return { value: action.payload };
		},
	},
});

export const { sortChange } = sortReducer.actions;
export default sortReducer.reducer;
