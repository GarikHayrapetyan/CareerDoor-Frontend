import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {
	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item
					name="CareerDoor"
					as={NavLink}
					to="/"
					exact
					toheader
					style={{
						marginLeft: '2em',
						marginRight: '0px',
						fontSize: '22px'
					}}
				/>
				<Menu.Item name="Jobs" />
				<Menu.Item exact as={NavLink} to='/meetings' name="Meetings" />
				<Menu.Item exact as={NavLink} to='/errors' name='Errors' />
				<Menu.Item>
					<Button
						as={NavLink}
						to="/createmeeting"
						positive
						content="Create Meeting"
					/>
				</Menu.Item>
			</Container>
		</Menu>
	);
}
