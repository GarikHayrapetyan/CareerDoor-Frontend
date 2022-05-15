import React from 'react'
import { Button, Card, Divider, List, Image, Statistic, Message } from 'semantic-ui-react'
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/store/store'
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';



function JobDetails() {
    const { jobStore } = useStore()
    const { selectedJob: job, openForm, cancelSelectedJob, updateCandidates, loading } = jobStore;

    if (!job) return <LoadingComponent content='Job details loading!' />

    return (
        <Card fluid clearing>
            <Card.Content>
                <List>
                    <List.Item>
                        <Image style={{ marginTop: '6px' }} avatar src={job.employeer?.image || '/assets/user.png'} />
                        <List.Content>
                            <List.Header as='h2'>{job.employeer?.displayName}</List.Header>
                            <List.Description>Recruiter</List.Description>
                        </List.Content>
                        <List.Content floated='right'>
                            <Card.Meta><span>{format(job.date!, 'dd-MM-yyyy')}</span></Card.Meta>
                        </List.Content>
                    </List.Item>
                </List>
                <Card.Meta>
                </Card.Meta>
                <Divider />
                <Statistic.Group
                    size='mini'
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        textAlign: 'center'
                    }}
                >
                    <Statistic>
                        <Statistic.Label>Type</Statistic.Label>
                        <List.Description>{job.type}</List.Description>
                    </Statistic>
                    <Statistic>
                        <Statistic.Label>Function</Statistic.Label>
                        <List.Description>{job.functionality}</List.Description>
                    </Statistic>
                    <Statistic >
                        <Statistic.Label>Industry</Statistic.Label>
                        <List.Description>{job.industry}</List.Description>
                    </Statistic>
                    <Statistic >
                        <Statistic.Label>Employees</Statistic.Label>
                        <List.Description>{job.employeeCount}</List.Description>
                    </Statistic>
                </Statistic.Group>
                <Divider style={{ display: 'block' }} />
                <List.Header>{job.title}</List.Header>
                <List.Description>{job.company}</List.Description>
                <Message style={{ background: 'white' }}>
                    <Message.Header>Description</Message.Header>
                    <p
                        style={{
                            wordWrap: "break-word",
                            overflowY: 'scroll',
                            height: '30vh',
                            resize: 'none',
                        }}
                    >
                        {job.description}
                    </p>
                </Message>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    {job.isEmployeer ? (
                        <Button onClick={() => openForm(job.id)} basic color='blue' content="Edit" />
                    ) : job.isGoing ? (
                        <Button loading={loading} onClick={updateCandidates} floated='right' content="Cancel apply" color="red" />
                    ) : (
                        <Button loading={loading} onClick={updateCandidates} floated='right' content="Apply" color="green" />
                    )}
                    <Button onClick={cancelSelectedJob} basic color='grey' floated='left' content="Cancel" />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default observer(JobDetails);
