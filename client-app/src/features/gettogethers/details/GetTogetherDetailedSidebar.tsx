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
            <Segment attached style={{ paddingRight: '0px' }}>
                <List relaxed divided style={{ height: '190px', overflowY: 'scroll', marginRight: '14px' }}>
                    {attendees.map(attendee => (
                        <Item 
                        id='segmentt'
                        style={{ position: 'relative', width: '95%', height: '33%', display: 'flex', alignItems: 'center' }} 
                        key={attendee.username}>
                            {/* {attendee.username === host?.username &&
                                <Label
                                    style={{ position: 'absolute', top: '8px',  }}
                                    color='orange'
                                    ribbon='right'
                                    size='tiny'
                                >
                                    Host
                                </Label>
                            } */}
                            <Image size='tiny' circular src={attendee.image || '/assets/user.png'} style={{ width: '40px' }} />
                            <Item.Content verticalAlign='middle' style={{ width: '60%', flexWrap: 'wrap', wordWrap: 'break-word' }}>
                                <Item.Header as='h3' style={{margin: 'auto 0 auto 5px', fontSize: '13px'}}>
                                    <Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link >
                                </Item.Header>
                                {attendee.following &&
                                    <Item.Extra style={{ color: 'orange', marginLeft: '5px' }}>Following</Item.Extra>
                                }
                            </Item.Content>
                            {attendee.username === host?.username &&
                                <Label
                                    style={{ position: 'absolute', float: 'right', right: '0'}}
                                    color='orange'
                                >
                                    Host
                                </Label>
                            }
                        </Item>
                    ))}
                </List>
            </Segment>
        </>

    )
}

export default observer(GetTogetherDetailedSidebar);
