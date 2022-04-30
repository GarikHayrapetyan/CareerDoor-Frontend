import React from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/store/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

export default observer(function HomePage() {
	const { userStore, modalStore } = useStore();

	return (
		<Segment inverted textAlign="center" vertical className="masthead">
			<Container text>
				<Header as="h1" inverted>
					CareerDoor
				</Header>
				{
					userStore.isLoggedIn ? (
						<>
							<Header as="h2" inverted content="Welcome to CareerDoor" />
							<Button size="huge" inverted as={NavLink} to="/meetings">
								Go to meetings!
							</Button>
						</>
					) : (
						<>
						<Button onClick={()=>modalStore.openModal(<LoginForm/>)} size="huge" inverted style={{marginRight: 15}}>
							Login
						</Button>
						<Button onClick={()=>modalStore.openModal(<RegisterForm/>)} size="huge" inverted>
							Register
						</Button>
						</>
					)
				}
			</Container>
		</Segment>
	);
})
