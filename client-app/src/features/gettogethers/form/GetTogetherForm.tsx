import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

export default function GetTogetherForm() {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' />
                <Form.TextArea placeholder='Description' />
                <Form.Input placeholder='Date' />
                <Form.Input placeholder='Link' />
                <Form.Input placeholder='Passcode' />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
}