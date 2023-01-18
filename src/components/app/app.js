import React from 'react';
import Header from '../header/header';
import SideFilter from '../side-filter/side-filter';
import Transplants from '../transplants-filter/transplants-filter';
import TicketsList from '../tickets-list/tickets-list';

import './app.scss';

export default function App() {
	return (
		<div className="app">
			<Header />
			<div className="filters">
				<SideFilter />
				<Transplants />
			</div>
			<TicketsList />
		</div>
	);
}
