import React, { SyntheticEvent, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { UserJob } from '../../app/models/userProfile';
import { useStore } from '../../app/store/store';


const panes = [
    { menuItem: 'Applied', pane: { key: 'applied' } },
    { menuItem: 'Employer', pane: { key: 'employer' } }
];


export default observer(function ProfileJob() {
    const { profileStore, jobStore } = useStore();
    const {selectProfileJob,loadJob} = jobStore;
    var image: string | undefined = undefined;
    const {
        loadJobs,
        profile,
        loadingJobs,
        userJobs
    } = profileStore;

    useEffect(() => {
        image = profile?.image;
        loadJobs(profile!.username, panes[0].pane.key);
    }, [loadJobs, profile]);

    const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
        loadJobs(profile!.username, panes[data.activeIndex as
            number].pane.key);
    };

    const handleJobEdit = (id:string)=>{
        loadJob(id);
    }

    return (
        <Tab.Pane loading={loadingJobs}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='calendar'
                        content={'Jobs'} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab
                        panes={panes}
                        menu={{ secondary: true, pointing: true }}
                        onTabChange={(e, data) => handleTabChange(e, data)}
                    />
                    <br />
                    <Card.Group itemsPerRow={4}>
                        {userJobs.map((job: UserJob) => (
                            <Card
                                as={Link}
                                to={`/jobs/${job.id}`}
                                key={job.id}
                                onClick={()=>handleJobEdit(job.id)}
                            >
                                <Image
                                    src={"/assets/meeting.jpeg"}
                                    style={{
                                        minHeight: 100, objectFit:
                                            'cover'
                                    }}
                                />
                                <Card.Content>
                                    <Card.Header
                                        textAlign='center'>{job.title.substring(0, 17)}</Card.Header>
                                    <Card.Meta textAlign='center'>
                                        <div>{format(new Date(job.date), 'do LLL')}</div>
                                        <div>{format(new Date(job.date), 'h:mm a')}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
});