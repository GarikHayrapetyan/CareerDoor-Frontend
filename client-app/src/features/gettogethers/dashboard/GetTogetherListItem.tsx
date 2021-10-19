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
					<Label 
						attached='top' 
						color='red' 
						content="Cancelled" 
						style={{textAlign: 'center'}}
					/>
				}
				<Item.Group as={Link} to={`/meetings/${meeting.id}`}>
					<Item>
						<Icon
							name="save outline"
							style={{ position: 'absolute', right: '30px' }}
							size="large"
						/>
						<Item.Image
							src="/assets/user.png"
							circular
							size="tiny"
						/>
						<Item.Content>
							<Item.Description content="User Name" />
							<Item.Header content={meeting.title} />
							<Item.Description>
								Hosted by {meeting.host?.displayName}
							</Item.Description>
							{meeting.isHost && (
								<Item.Description>
									<Label basic color='orange'>You are hosting this meeting</Label>
								</Item.Description>
							)}
							{meeting.isGoing && !meeting.isHost && (
								<Item.Description>
									<Label basic color='green'>You are going to this meeting</Label>
								</Item.Description>
							)}
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
