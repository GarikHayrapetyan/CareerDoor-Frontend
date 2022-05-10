import React from 'react'
import { useStore } from '../../app/store/store'
import { Card, Divider, Image, Label, List } from 'semantic-ui-react'
import { format } from 'date-fns';
import { Job } from '../../app/models/job';


interface Props {
    job: Job;
}
const JobListItem = ({ job }: Props) => {
    const { jobStore } = useStore();
    const { selectJob } = jobStore;
    return (
        <List.Item onClick={() => selectJob(job.id)} key={job.id} style={{ margin: '30px 10px', cursor: 'pointer' }}>
            <Image avatar src={job.employeer?.image || '/assets/user.png'} />
            <List.Content>
                <List.Header as="a">
                    {job.title}
                </List.Header>
            </List.Content>
            <List.Content floated='right'>
                {job.isEmployeer && (
                    <Label basic color='orange'>
                        You created
                    </Label>
                )}
                {job.isGoing && !job.isEmployeer && (
                    <Label basic color='green'>
                        Applied
                    </Label>
                )}
            </List.Content>
            <List style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <List.Item icon="building outline" content={job.company} />
                <List.Item icon="marker" content={job.location} />
                <List.Item icon="code branch" content={job.Function} />
                <List.Content floated='right'> <Card.Meta><span>{format(job.date!, 'dd-MM-yyyy')}</span></Card.Meta></List.Content>
            </List>
        </List.Item>
    )
}

export default JobListItem