import React from 'react'
import { Card, Image, Label, List, Segment } from 'semantic-ui-react'
import { useStore } from '../../app/store/store'
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';


function JobList() {
    const { jobStore } = useStore();
    const { jobsByDate, selectJob, searchResults } = jobStore;
    return (
        <Segment>
            <List animated verticalAlign='middle' divided >
                {(searchResults ? searchResults : jobsByDate).map(job => (
                    <List.Item onClick={() => selectJob(job.id)} key={job.id} style={{ margin: '20px 10px', cursor: 'pointer' }}>
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
                            <List.Item icon="code branch" content={job.function} />
                            <List.Content floated='right'> <Card.Meta><span>{format(job.date!, 'dd-MM-yyyy')}</span></Card.Meta></List.Content>
                        </List>
                    </List.Item>
                ))}
            </List>
        </Segment>
    )
}

export default observer(JobList);
