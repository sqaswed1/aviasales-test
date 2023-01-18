import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../api';

const api = new Api();

export const fetchTickets = createAsyncThunk(
	'tickets/fetchTickets',
	async (searchId, { dispatch, rejectWithValue }) => {
		let stop = false;
		while (!stop) {
			try {
				const response = await api.getTickets(searchId);
				const ticketsData = await response.json();
				stop = ticketsData.stop;
				dispatch(addTickets(ticketsData.tickets));
			} catch (error) {
				rejectWithValue(error);
			}
		}
	}
);

export const fetchId = createAsyncThunk(
	'ticketsList/fetchId',
	async function () {
		const response = await api.getSearchId();
		return response.searchId;
	}
);

export const ticketSlice = createSlice({
	name: 'ticketsList',
	initialState: {
		tickets: [],
		status: 'loading',
		error: null,
	},
	reducers: {
		addTickets(state, action) {
			const tickets = action.payload;
			return {
				...state,
				tickets: [...state.tickets, ...tickets],
				status: 'resolved',
			};
		},

		setSearchId(state, action) {
			return {
				...state,
				searchId: action.payload,
			};
		},
		extraReducers: {
			[fetchTickets.pending]: (state) => {
				state.status = 'loading';
				state.error = null;
			},
			[fetchTickets.fulfilled]: (state, action) => {
				state.state = 'resolved';
				state.tickets = action.payload;
			},
			[fetchTickets.rejected]: (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
			},
		},
	},
});

export const { addTickets, setSearchId } = ticketSlice.actions;

export default ticketSlice.reducer;
