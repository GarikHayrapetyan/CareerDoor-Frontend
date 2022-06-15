import React from 'react'
import { Link } from 'react-router-dom';
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { GetTogether } from '../../../app/models/GetTogether';
import { observer } from 'mobx-react-lite';

interface Props {
    getTogether: GetTogether;
}

function GetTogetherDetailedSidebar({ getTogether: { attendees, host } }: Props) {
    if (!attendees) return null;
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} going
            </Segment>
            <Segment attached>
                <List relaxed divided >
                    {attendees.map(attendee => (
                        <Item style={{ position: 'relative' }} key={attendee.username}>
                            {attendee.username === host?.username &&
                                <Label
                                    style={{ position: 'absolute' }}
                                    color='orange'
                                    ribbon='right'
                                >
                                    Host
                                </Label>
                            }
                            <Image size='tiny' circular src={attendee.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle' style={{ width: '60%', flexWrap: 'wrap', wordWrap: 'break-word' }}>
                                <Item.Header as='h3' style={{marginLeft: '5px'}}>
                                    <Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link >
                                </Item.Header>
                                {attendee.following &&
                                    <Item.Extra style={{ color: 'orange', marginLeft: '5px' }}>Following</Item.Extra>
                                }

                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </>

    )
}

export default observer(GetTogetherDetailedSidebar);
