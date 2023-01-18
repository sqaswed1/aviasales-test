import transferReducer from './filterSlice';
import ticketSlice from './ticketSlice';
import sortSlice from './sortSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		transferFilter: transferReducer,
		ticketList: ticketSlice,
		sortSlice: sortSlice,
	},
});
export default store;
