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
					style={{
						marginLeft: '2em',
						marginRight: '0px',
						fontSize: '22px'
					}}
				/>
				<Menu.Item name="Jobs" />
				<Menu.Item name="Events" as={NavLink} to="meetings" />
				<Menu.Item>
					<Button positive content="Create event" floated="right" />
				</Menu.Item>
			</Container>
		</Menu>
	);
}
