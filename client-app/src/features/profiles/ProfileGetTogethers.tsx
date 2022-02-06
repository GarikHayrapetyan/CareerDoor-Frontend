import React, { SyntheticEvent, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { UserGetTogether } from '../../app/models/userProfile';
import { useStore } from '../../app/store/store';


const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } }
];


export default observer(function ProfileGetTogethers() {
    const { profileStore } = useStore();
    var image:string | undefined = undefined;
    const {
        loadUserGetTogethers,
        profile,
        loadingGetTogethers,
        userGetTogethers
    } = profileStore;
    useEffect(() => {
        image = profile?.image;
        loadUserGetTogethers(profile!.username);
    }, [loadUserGetTogethers, profile]);
    const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
        loadUserGetTogethers(profile!.username, panes[data.activeIndex as
            number].pane.key);
    };
    return (
        <Tab.Pane loading={loadingGetTogethers}>
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
                    <Card.Group itemsPerRow={4}>
                        {userGetTogethers.map((getTogether: UserGetTogether) => (
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
                                        textAlign='center'>{getTogether.title.substring(0,17)}</Card.Header>
                                    <Card.Meta textAlign='center'>
                                        <div>{format(new Date(getTogether.date),'do LLL')}</div>
                                        <div>{format(new Date(getTogether.date),'h:mm a')}</div>
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