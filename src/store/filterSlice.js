import { createSlice } from '@reduxjs/toolkit';

const filtersCheck = (filters, name) => {
	if (name === 'all' && filters.all === true) {
		return {
			all: false,
			none: false,
			oneTransfer: false,
			twoTransfer: false,
			threeTransfer: false,
		};
	} else if (name === 'all' && filters.all === false) {
		return {
			all: true,
			none: true,
			oneTransfer: true,
			twoTransfer: true,
			threeTransfer: true,
		};
	}

	return {
		...filters,
		[name]: !filters[name],
	};
};

const filterReducer = createSlice({
	name: 'transferFilter',
	initialState: {
		filters: {
			all: false,
			none: false,
			oneTransfer: true,
			twoTransfer: false,
			threeTransfer: false,
		},
	},
	reducers: {
		onFilterChange(state, action) {
			const { filters } = state;
			const nameOfFilter = action.payload;
			state.filters = filtersCheck(filters, nameOfFilter);
			const checkedFilters = Object.entries({
				...{ ...state.filters, all: undefined },
			}).filter((item) => item[1]).length;
			if (checkedFilters === 4) {
				state.filters.all = true;
			}
			if (checkedFilters !== 4) {
				state.filters.all = false;
			}
		},
	},
});

export const { onFilterChange } = filterReducer.actions;
export default filterReducer.reducer;
