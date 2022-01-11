import React from 'react'
import { Button, Card, Divider, Item, Label } from 'semantic-ui-react'
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/store/store'
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';



function JobDetails() {
    const { jobStore } = useStore()
    const { selectedJob: job, openForm, cancelSelectedJob } = jobStore;

    if (!job) return <LoadingComponent content='Job details loading!' />

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header float='right'>{job.employeer?.displayName}</Card.Header>
                <Card.Meta><span>{format(job.date!, 'dd-MM-yyyy')}</span></Card.Meta>
                <Divider />
                <Card.Header>Description</Card.Header>
                <Card.Description style={{ wordWrap: "break-word" }}>{job.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    {job.isEmployeer && <Button onClick={() => openForm(job.id)} basic color='blue' content="Edit" />}
                    <Button onClick={cancelSelectedJob} basic color='grey' content="Cancel" />
                </Button.Group>
            </Card.Content>

        </Card>
    )
}

export default observer(JobDetails);
