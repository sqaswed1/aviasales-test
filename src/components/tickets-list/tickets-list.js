import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Ticket from '../ticket/ticket';

import { Spin, Alert } from 'antd';
import { nanoid } from 'nanoid';

import { fetchId, fetchTickets, addTickets } from '../../store/ticketSlice';
import store from '../../store';

import './tickets-list.scss';

export default function TicketsList() {
	const dispatch = useDispatch();
	const [ticketsCount, setTicketsCount] = useState(5);
	const { all, none, oneTransfer, twoTransfer, threeTransfer } = useSelector(
		(state) => state.transferFilter.filters
	);
	const curSort = useSelector((state) => state.sortSlice.value);
	const { status } = useSelector((store) => store.ticketList);

	useEffect(() => {
		const fn = async () => {
			const resp = await dispatch(fetchId());
			const searchId = await resp.payload;
			const tickets = await dispatch(fetchTickets(searchId));
			dispatch(addTickets(tickets));
		};
		fn();
	}, [dispatch]);

	const handleClick = () => {
		setTicketsCount(ticketsCount + 5);
	};

	if (status === 'loading') {
		return <Spin className="ticket-list__spin" size="large" />;
	}

	if (status === 'rejected') {
		return (
			<div className="aviasales__alert">
				<Alert
					message="Ooops, something gone wrong"
					showIcon
					description="Please refresh page or contact your administrator"
					type="error"
				/>
			</div>
		);
	}

	const tickets = store.getState().ticketList.tickets;
	let ticketForRender = [];

	const filter = {
		all: all ? 4 : undefined,
		none: none ? 0 : undefined,
		oneTransfer: oneTransfer ? 1 : undefined,
		twoTransfer: twoTransfer ? 2 : undefined,
		threeTransfer: threeTransfer ? 3 : undefined,
	};

	if (status === 'resolved') {
		const ticketsToSort = tickets.slice();
		switch (curSort) {
			case 'cheapest':
				ticketsToSort.sort((p, n) => p.price - n.price);
				break;
			case 'fastest':
				ticketsToSort.sort(
					(p, n) =>
						p.segments[0].duration +
						p.segments[1].duration -
						(n.segments[0].duration + n.segments[1].duration)
				);
				break;
			default:
				break;
		}
		if (!none && !oneTransfer && !twoTransfer && !threeTransfer) {
			return (
				<Alert
					showIcon
					className="ticket-list__alert"
					message="Рейсов, подходящих под заданные фильтры, не найдено"
					description="Подберите, пожалуйста, другие фильтры"
					type="error"
				/>
			);
		}

		ticketsToSort.map((ticket) => {
			const stopsTo = ticket.segments[0].stops.length;
			const stopsBack = ticket.segments[0].stops.length;

			if (
				stopsTo === filter.none ||
				stopsTo === filter.oneTransfer ||
				stopsTo === filter.twoTransfer ||
				stopsTo === filter.threeTransfer ||
				stopsBack === filter.none ||
				stopsBack === filter.oneTransfer ||
				stopsBack === filter.twoTransfer ||
				stopsBack === filter.threeTransfer
			) {
				ticketForRender.push(
					<li key={nanoid()} id={nanoid()} className="ticket-list__item">
						<Ticket
							myKey={nanoid()}
							price={ticket.price}
							carrier={ticket.carrier}
							segments={ticket.segments}
						/>
					</li>
				);
			}
			return ticketForRender;
		});
	}

	if (ticketForRender.length > ticketsCount) {
		ticketForRender.length = ticketsCount;
	}
	return (
		<>
			<ul className="ticket-list">{ticketForRender}</ul>
			<button
				type="button"
				className="ticket-list__button-more"
				onClick={() => handleClick()}
			>
				ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ!
			</button>
		</>
	);
}
