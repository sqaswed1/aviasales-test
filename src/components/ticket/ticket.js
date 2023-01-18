import React from 'react';
import './ticket.scss';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

export default function Ticket({ key, price, carrier, segments }) {
	const imgPath = '//pics.avs.io/99/36/';
	const getPrice = (text, n) =>
		`${text.slice(0, n - 3)} ${text.slice(n - 3)} Р`;
	const formattedPrice = getPrice(price.toString(), price.toString().length);

	return (
		<div className="ticket">
			<span className="ticket-price">{formattedPrice}</span>
			<img
				src={`${imgPath}${carrier}.png`}
				alt="avia"
				className="ticket__img"
			/>
			<table className="ticket-info">
				<tbody>
					<tr>
						<td
							style={{
								color: 'gray',
							}}
						>
							{segments[0].origin}-{segments[0].destination}
						</td>
						<td
							style={{
								color: 'gray',
							}}
						>
							В пути
						</td>
						<td
							style={{
								color: 'gray',
							}}
						>
							пересадки: {segments[0].stops.length}
						</td>
					</tr>
					<tr>
						<td>
							{format(new Date(segments[0].date), 'p')}-
							{format(
								new Date(segments[0].date).getTime() +
									segments[0].duration * 60000,
								'p'
							)}
						</td>
						<td>
							{Math.floor(segments[0].duration / 60)}ч
							{Math.floor(segments[0].duration % 60)}м
						</td>
						<td>{segments[0].stops.join(' ')}</td>
					</tr>
					<tr>
						<td
							style={{
								color: 'gray',
							}}
						>
							{segments[1].origin}-{segments[1].destination}
						</td>
						<td
							style={{
								color: 'gray',
							}}
						>
							В пути
						</td>
						<td
							style={{
								color: 'gray',
							}}
						>
							пересадки: {segments[1].stops.length}
						</td>
					</tr>
					<tr>
						<td>
							{format(new Date(segments[1].date), 'p')}-
							{format(
								new Date(segments[1].date).getTime() +
									segments[1].duration * 60000,
								'p'
							)}
						</td>
						<td>
							{Math.floor(segments[1].duration / 60)}ч
							{Math.floor(segments[1].duration % 60)}м
						</td>
						<td>{segments[1].stops.join(' ')}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

Ticket.propTypes = {
	key: PropTypes.number,
	price: PropTypes.number,
	carrier: PropTypes.array,
	segments: PropTypes.array,
};
