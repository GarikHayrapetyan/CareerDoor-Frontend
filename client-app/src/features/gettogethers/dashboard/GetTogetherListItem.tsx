import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Item, Segment } from 'semantic-ui-react';
import GetTogether from '../../../app/models/GetTogether';
import { format } from 'date-fns';
import ActivityListItemAttendee from './ActivityListItemAttendee';

interface Props {
	meeting: GetTogether;
}

export default function GetTogetherListItem({ meeting }: Props) {
	return (
		<Segment.Group size="tiny">
			<Segment>
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
								{meeting.description}
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
