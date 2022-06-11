import React from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';
import { GetTogether } from '../../../app/models/GetTogether';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns'

interface Props {
	meeting: GetTogether;
}

function GetTogetherDetailedInfo({ meeting }: Props) {
	// if(!meeting) return;
	return (
		<Segment.Group>
			<Segment attached="top">
				<Grid>
					<Grid.Column width={1}>
						<Icon size="large" color="teal" name="info" style={{marginTop: '10px'}}/>
					</Grid.Column>
					<Grid.Column width={15}>
						<p
							style={{
								wordWrap: "break-word",
								overflowY: 'scroll',
								height: '20vh',
								resize: 'none', 
								marginTop: '5px', 
								marginBottom: '5px'
							}}
						>{meeting?.description}</p>
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment attached>
				<Grid verticalAlign="middle">
					<Grid.Column width={1}>
						<Icon name="calendar" size="large" color="teal" />
					</Grid.Column>
					<Grid.Column width={15}>
						<span>
							{format(meeting.date!, 'dd MMM yyyy h:mm aa')}
						</span>
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment attached>
				<Grid verticalAlign="middle">
					<Grid.Column width={1}>
						<Icon name="key" size="large" color="teal" />
						
					</Grid.Column>
					<Grid.Column width={11}>
						<span>PassCode: {meeting?.passCode}</span>
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment attached>
				<Grid verticalAlign="middle">
					<Grid.Column width={1}>
						<Icon className="linkify icon" size="large" color="teal"></Icon>
					</Grid.Column>
					<Grid.Column width={15}>
						<span style={{width: '100%', flexWrap: 'wrap', wordWrap: 'break-word'}}>Link: {meeting?.link}</span>
					</Grid.Column>
				</Grid>
			</Segment>
		</Segment.Group>
	);
}

export default observer(GetTogetherDetailedInfo);
