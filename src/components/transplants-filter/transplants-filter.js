import React from 'react';
import './transplants-filter.scss';
import { useSelector, useDispatch } from 'react-redux';
import { sortChange } from '../../store/sortSlice';

export default function Transplants() {
	const option = useSelector((state) => state.sortSlice);
	const dispatch = useDispatch();

	const options = [
		{
			label: 'Самый дешевый',
			checked: option.value === 'cheapest',
			id: 'cheapest',
		},
		{
			label: 'Самый быстрый',
			checked: option.value === 'fastest',
			id: 'fastest',
		},
		{
			label: 'Самый оптимальный',
			checked: false,
			id: 'optimal',
			disabled: true,
		},
	];

	const sortFilters = options.map((filter) => (
		<li
			key={filter.id}
			className={`transplants-filter ${
				filter.checked ? 'transplants-filter__active' : ''
			}`}
		>
			<label htmlFor={filter.id} className="transplants-filter__label">
				<input
					type="radio"
					name="filter"
					id={filter.id}
					className="transplants-filter__input"
					checked={filter.checked}
					onChange={() => dispatch(sortChange(filter.id))}
				/>
				{filter.label}
			</label>
		</li>
	));

	return <ul className="transplants-filters">{sortFilters}</ul>;
}
