import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { useStore } from '../store/store';

export default observer(function NavBar() {
	const { userStore: { user, logout } } = useStore();
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
				<Menu.Item>
					<Image src={user?.image || 'assets/user.png'} avatar spaced='right' />
					<Dropdown pointing='top left' text={user?.displayName}>
						<Dropdown.Menu>
							<Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='My profile' icon='user' />
							<Dropdown.Item onClick={logout} text="Logout" icon='power' />
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Item>
			</Container>
		</Menu>
	);
})
