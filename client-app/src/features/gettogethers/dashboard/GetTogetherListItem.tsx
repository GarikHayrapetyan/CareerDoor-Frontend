import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Item, Segment } from 'semantic-ui-react';
import GetTogether from '../../../app/models/GetTogether';
import { format } from 'date-fns'

interface Props {
	getTogether: GetTogether;
}

export default function GetTogetherListItem({ getTogether }: Props) {
	return (
		<Segment.Group size="tiny">
			<Segment>
				<Item.Group as={Link} to={`/gettogethers/${getTogether.id}c`}>
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
							<Item.Header content={getTogether.title} />
							<Item.Description>
								{getTogether.description}
							</Item.Description>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<span>
					<Icon name="calendar alternate outline" />{' '}
					{format(getTogether.date!, 'dd MMM yyyy h:mm aa')}
					<Icon
						name="clock outline"
						style={{ marginLeft: '5px' }}
					/>{' '}
					19:30
				</span>
			</Segment>
			<Segment secondary>Attendances...</Segment>
		</Segment.Group>
	);
}
