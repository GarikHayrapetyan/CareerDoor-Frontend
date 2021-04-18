import React from 'react';
import { Button, Container, Header, Segment } from 'semantic-ui-react';

export default function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <h1>CareerDoor</h1>
                </Header>
                <Header as='h2' inverted content='Welcome to reactivities' />
                <Button size='huge' inverted>
                    Take me to the GetTogethers!
                </Button>
            </Container>
        </Segment>
    )
}