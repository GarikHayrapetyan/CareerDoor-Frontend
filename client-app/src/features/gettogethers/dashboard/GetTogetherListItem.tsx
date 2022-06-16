import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Item, Segment, Label } from 'semantic-ui-react';
import {GetTogether} from '../../../app/models/GetTogether';
import { format } from 'date-fns';
import ActivityListItemAttendee from './ActivityListItemAttendee';

interface Props {
	meeting: GetTogether;
}

export default function GetTogetherListItem({ meeting }: Props) {
	return (
		<Segment.Group size="tiny">
			<Segment>
				{meeting.isCancelled && 
					<Segment style={{marginBottom: 20}}>
						<Label 
						attached='top' 
						color='red' 
						content="Cancelled" 
						style={{textAlign: 'center'}}
						/>
					</Segment>
				}
				<Item.Group as={Link} target={'_blank'} to={`/meetings/${meeting.id}`}>
					<Item style={{ position: 'relative', right: '2px' }}>
						{/* <Icon
							name="save outline"
							style={{ position: 'absolute', right: '30px' }}
							size="large"
						/> */}
						{meeting.isHost && (
							<Label
								style={{ position: 'absolute' }}
								color='orange'
								ribbon='right'
							>
								Host
							</Label>
							)
						}
						{meeting.isGoing && !meeting.isHost && (
								<Label 
								style={{ position: 'absolute' }}
								color='green'
								ribbon='right'
								>Going
								</Label>
						)}
						<Item.Image
							style={{marginBottom: 3}}
							src={meeting.host?.image || "/assets/user.png"}
							circular
							size="tiny"
						/>
						<Item.Content>
							<Item.Header content={meeting.title} style={{marginTop: '10px', width: '75%'}} />
							<Item.Description>
								Hosted by <Link to={`/profiles/${meeting.hostUsername}`}>{meeting.host?.displayName}</Link>
							</Item.Description>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<span>
					<Icon name="calendar alternate outline" />{' '}
					{format(meeting.date!, 'dd MMM yyyy h:mm aa')}
				</span>
			</Segment>
			<Segment secondary>
				<ActivityListItemAttendee attendees={meeting.attendees!} />
			</Segment>
		</Segment.Group>
	);
}
