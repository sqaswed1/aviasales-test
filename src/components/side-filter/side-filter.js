import React from 'react';
import { Checkbox, Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import './side-filter.scss';
import { onFilterChange } from '../../store/filterSlice';

export default function SideFilter() {
	const checked = useSelector((state) => state.transferFilter);
	const dispatch = useDispatch();
	return (
		<div className="sideFilters">
			<span> Количество перeсадок</span>
			<Divider />
			<ul className="sideFilters__list">
				<li>
					{' '}
					<Checkbox
						className="sideFilters__item"
						id="all"
						checked={checked.filters.all}
						name="all"
						onChange={() => dispatch(onFilterChange('all'))}
					>
						Все
					</Checkbox>
				</li>
				<li>
					<Checkbox
						className="sideFilters__item"
						id="none"
						name="none"
						checked={checked.filters.none}
						onChange={() => dispatch(onFilterChange('none'))}
					>
						Без пересадок
					</Checkbox>
				</li>
				<li>
					<Checkbox
						className="sideFilters__item"
						id="oneTransfer"
						checked={checked.filters.oneTransfer}
						name="oneTransfer"
						onChange={() => dispatch(onFilterChange('oneTransfer'))}
					>
						1 пересадка
					</Checkbox>
				</li>
				<li>
					<Checkbox
						className="sideFilters__item"
						id="twoTransfer"
						name="twoTransfer"
						checked={checked.filters.twoTransfer}
						onChange={() => dispatch(onFilterChange('twoTransfer'))}
					>
						2 пересадки
					</Checkbox>
				</li>
				<li>
					<Checkbox
						className="sideFilters__item"
						id="threeTransfer"
						name="threeTransfer"
						checked={checked.filters.threeTransfer}
						onChange={() => dispatch(onFilterChange('threeTransfer'))}
					>
						3 пересадки
					</Checkbox>
				</li>
			</ul>
		</div>
	);
}
