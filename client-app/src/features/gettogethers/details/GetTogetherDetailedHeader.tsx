import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Item, Segment, Image } from 'semantic-ui-react';
import GetTogether from '../../../app/models/GetTogether';

const activityImageStyle = {
	filter: 'brightness(30%)'
};

const activityImageTextStyle = {
	position: 'absolute',
	bottom: '25%',
	left: '5%',
	width: '100%',
	height: 'auto',
	color: 'white'
};

interface Props {
	meeting: GetTogether | undefined;
}

function GetTogetherDetailedHeader({ meeting }: Props) {
	// if(!meeting) return;
	return (
		<Segment.Group>
			<Segment
				basic
				attached="top"
				style={{ padding: '0', width: '55vw', height: '30vh' }}
			>
				<Image
					src={`/assets/meeting.jpeg`}
					fluid
					style={activityImageStyle}
				/>
				<Segment style={activityImageTextStyle} basic>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header
									size="huge"
									content={meeting?.title}
									style={{ color: 'white' }}
								/>
								<p>{meeting?.date}</p>
								<p>
									Hosted by <strong>Bob</strong>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>
			<Segment clearing attached="bottom">
				<Button color="teal">Join Meeting</Button>
				<Button>Cancel attendance</Button>
				<Button color="orange" floated="right">
					Manage Event
				</Button>
			</Segment>
		</Segment.Group>
	);
}

export default observer(GetTogetherDetailedHeader);
