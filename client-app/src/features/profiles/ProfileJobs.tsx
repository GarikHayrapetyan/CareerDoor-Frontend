import React, { SyntheticEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { UserJob } from '../../app/models/userProfile';
import { useStore } from '../../app/store/store';
import InfiniteScroll from 'react-infinite-scroller';
import { PagingParams } from '../../app/models/pagination';

export default observer(function ProfileJob() {
    const { profileStore, jobStore, userStore } = useStore();
    const { selectProfileJob, loadJob } = jobStore;
    const [loadingNext, setLoadingNext] = useState(false);
    const [tab, setTab] = useState('');

    var image: string | undefined = undefined;
    const {
        resetJobs,
        loadUserJobs,
        generalJobs,
        profile,
        loadingJobs,
        pagination,
        setPagingParams
    } = profileStore;

    const panes = userStore.user?.username === profile?.username ? [
        { menuItem: 'Employer', pane: { key: 'employer' } },
        { menuItem: 'Applied', pane: { key: 'applied' } }
    ] : [{ menuItem: 'Employer', pane: { key: 'employer' } }]

    useEffect(() => {
        resetJobs();
        image = profile?.image;
        loadUserJobs(panes[0].pane.key);
    }, [loadUserJobs, profile]);

    const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
        resetJobs();
        var tab = panes[data.activeIndex as number].pane.key;
        setTab(tab);
        loadUserJobs(tab);
    };

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadUserJobs(tab).then(() => setLoadingNext(false));
    }

    const handleJobEdit = (id: string) => {
        loadJob(id);
    }

    return (
        <Tab.Pane>
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
                    <Segment
                        textAlign='center'
                        style={{ overflowY: "scroll", height: '400px' }} loading={loadingJobs && !loadingNext}>

                        <InfiniteScroll
                            pageStart={0}
                            loadMore={handleGetNext}
                            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                            initialLoad={false}
                            useWindow={false}
                        >
                            <Card.Group itemsPerRow={5}>
                                {generalJobs.map((job: UserJob) => (
                                    <Card
                                        as={Link}
                                        to={`/jobs/${job.id}`}
                                        key={job.id}
                                        onClick={() => handleJobEdit(job.id)}
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
                        </InfiniteScroll>
                        <Button loading={loadingNext} style={{ backgroundColor: 'transparent', border: 'none' }} />
                    </Segment>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
});