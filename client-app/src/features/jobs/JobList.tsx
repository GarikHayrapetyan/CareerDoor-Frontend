import React, { SyntheticEvent } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { useStore } from '../../app/store/store'
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';
import { Job } from '../../app/models/job';

interface Props {
    jobsByDate: Job[];
}
function JobList({ jobsByDate }: Props) {
    const { jobStore } = useStore();
    const { selectJob, updateCandidates, loading } = jobStore;

    return (
        <Segment>
            <Item.Group divided>
                {jobsByDate.map(job => (
                    <Item key={job.id}>
                        <Item.Content>
                            <Item.Header onClick={() => selectJob(job.id)} as="a">
                                {job.title}
                            </Item.Header>
                            <Item.Meta>{format(job.date!, 'dd-MM-yyyy h:m aa')}</Item.Meta>
                            <Item.Description>
                                <div>{job.company}</div>
                                <div>{job.location}</div>
                            </Item.Description>
                            <Item.Extra>
                                {job.isEmployeer ? (
                                    null
                                ) : job.isGoing ? (
                                    <Button onClick={updateCandidates} floated='right' content="Cancel apply" color="red" />
                                ) : (
                                    <Button onClick={updateCandidates} floated='right' content="Apply" color="green" />
                                )}
                                <Label basic content={job.function} />
                                {job.isEmployeer && (
                                    <Item.Description style={{ float: 'right' }}>
                                        <Label basic color='orange'>
                                            You created this job
                                        </Label>
                                    </Item.Description>
                                )}
                                {job.isGoing && !job.isEmployeer && (
                                    <Item.Description style={{ float: 'right' }}>
                                        <Label basic color='green'>
                                            You applied for this job
                                        </Label>
                                    </Item.Description>
                                )}
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default observer(JobList);
