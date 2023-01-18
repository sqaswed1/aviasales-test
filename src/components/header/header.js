import React from 'react';
import logo from './logo.svg';

export default function Header() {
	return (
		<img
			src={logo}
			alt="logo"
			style={{
				display: 'block',
				position: 'absolute',
				marginLeft: 'auto',
				marginRight: 'auto',
			}}
		/>
	);
}
