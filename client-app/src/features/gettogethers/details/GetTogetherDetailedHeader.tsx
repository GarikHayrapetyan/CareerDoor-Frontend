import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Header, Item, Segment, Image, Label } from 'semantic-ui-react';
import {GetTogether} from '../../../app/models/GetTogether';
import { format} from 'date-fns'
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/store/store';

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
	meeting: GetTogether;
}

function GetTogetherDetailedHeader({ meeting }: Props) {
	const {getTogetherStore: {updateAttence, loading, cancelGetTogetherToggle}} = useStore();

	return (
		<Segment.Group>
			<Segment
				basic
				attached="top"
				style={{ padding: '0', width: '55vw', height: '30vh' }}
			>
				{meeting.isCancelled && 
					<Label style={{position: 'absolute', zIndex: 1000, left: -14, top: 20}}
						ribbon color="red" content='Canceled' />
				}
				<Image
					// src={`/assets/meeting.jpeg`}
					src={'https://www.business2community.com/wp-content/uploads/2019/03/business_meeting_1551552630-900x525.jpg'}
					fluid
					style={activityImageStyle}
				/>
				<Segment style={activityImageTextStyle} basic>
					<Item.Group>
						<Item>
							<Item.Content style={{ flexDirection: 'row' }}>
								<Header
									size="huge"
									content={meeting?.title}
									style={{ color: 'white', width: '90%', flexWrap: 'wrap', wordWrap: 'break-word' }}
								/>
								<p>{format(meeting.date!, 'dd MMM yyyy')}</p>
								<p>
									Hosted by <strong><Link to={`/profiles/${meeting.host?.username}`}>{meeting.host?.displayName}</Link></strong>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>
			<Segment clearing attached="bottom" style={{ height: '4.8em' }}>
				{meeting.isHost ? (
					<>
						<Button 
							color={meeting.isCancelled ? 'green' : 'red'}
							floated='left'
							basic
							content={meeting.isCancelled ? 'Re-activate Meeting' : 'Cancel Meeting'}
							onClick={cancelGetTogetherToggle}
							loading={loading}
						/>
						<Button 
							disabled={meeting.isCancelled}
							as={Link} 
							to={`/manage/${meeting.id}`} 
							color="orange" 
							floated="right"
						>
						Manage Event
						</Button>
					</>
				) : meeting.isGoing ? (
					<Button loading={loading} onClick={updateAttence}>Cancel attendance</Button>
					) : 
					(<Button
						disabled={meeting.isCancelled}
						loading={loading} 
						onClick={updateAttence} 
						color="teal">
							Join Meeting
					</Button>)
				}
			</Segment>
		</Segment.Group>
	);
}

export default observer(GetTogetherDetailedHeader);
