import React, { SyntheticEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps, Button, Segment, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { UserGetTogether } from '../../app/models/userProfile';
import { useStore } from '../../app/store/store';
import InfiniteScroll from 'react-infinite-scroller';
import { PagingParams } from '../../app/models/pagination';


const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } }
];


export default observer(function ProfileGetTogethers() {
    const { profileStore } = useStore();
    const [loadingNext, setLoadingNext] = useState(false);
    const [tab, setTab] = useState('');

    var image: string | undefined = undefined;
    const {
        resetMeetings,
        loadUserGetTogethers,
        profile,
        loadingGetTogethers,
        generalMeetings,
        setPagingParams,
        pagination,
    } = profileStore;
    
    useEffect(() => {
        resetMeetings();
        image = profile?.image;
        loadUserGetTogethers(panes[0].pane.key);
    }, [loadUserGetTogethers, profile]);


    const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
        resetMeetings();
        var tab = panes[data.activeIndex as number].pane.key;
        setTab(tab);
        loadUserGetTogethers(tab);
    };   


    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadUserGetTogethers(tab).then(() => setLoadingNext(false));        
    }


    return (
        <Tab.Pane >
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='calendar'
                        content={'Events'} />
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
                     style={{ overflowY: "scroll", height: '400px' }} loading={loadingGetTogethers && !loadingNext}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}     
                        useWindow={false}            
                    >
                        <Card.Group itemsPerRow={5} >
                   
                            {generalMeetings.map((getTogether: UserGetTogether) => (
                                <Card
                                    as={Link}
                                    to={`/meetings/${getTogether.id}`}
                                    key={getTogether.id}
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
                                            textAlign='center'>{getTogether.title.substring(0, 17)}</Card.Header>
                                        <Card.Meta textAlign='center'>
                                            <div>{format(new Date(getTogether.date), 'do LLL')}</div>
                                            <div>{format(new Date(getTogether.date), 'h:mm a')}</div>
                                        </Card.Meta>
                                    </Card.Content>
                                </Card>
                            ))}
                            
                        </Card.Group>
                        </InfiniteScroll>
                        <Button loading={loadingNext} style={ {  backgroundColor: 'transparent',border: 'none'}} /> 
                        </Segment>                    
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
});