import { observer } from 'mobx-react-lite';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/store/store';

export default observer(function HomePage() {
	const { userStore } = useStore();

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
						<Button size="huge" inverted as={NavLink} to="/login">
							Login
						</Button>
					)
				}


			</Container>
		</Segment>
	);
})
