import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { Job } from '../../app/models/job'

interface Props {
    jobs: Job[];
    selectJob: (id: number) => void;
}
function JobList({ jobs, selectJob }: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {jobs.map(job => (
                    <Item key={job.id}>
                        <Item.Content>
                            <Item.Header as="a">
                                {job.title}
                            </Item.Header>
                            <Item.Meta>{job.date}</Item.Meta>
                            <Item.Description>
                                <div>{job.companyName}</div>
                                <div>{job.location}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectJob(job.id)} floated='right' content="View" color="blue" />
                                <Label basic content={job.position} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default JobList
