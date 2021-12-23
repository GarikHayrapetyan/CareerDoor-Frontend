import React from 'react'
import { Button, Card, Divider } from 'semantic-ui-react'
import { Job } from '../../app/models/job'

interface Props {
    job: Job | undefined;
    cancelJob: () => void
}

function JobDetails({ job, cancelJob }: Props) {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{job?.title}</Card.Header>
                <Card.Meta><span>{job?.date}</span></Card.Meta>
                <Divider />
                <Card.Header>Description</Card.Header>
                <Card.Description>{job?.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color='blue' content="Apply" />
                    <Button onClick={cancelJob} basic color='grey' content="Cancel" />
                </Button.Group>
            </Card.Content>

        </Card>
    )
}

export default JobDetails
