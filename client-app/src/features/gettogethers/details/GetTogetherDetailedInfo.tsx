import React from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';
import GetTogether from '../../../app/models/GetTogether';

interface Props {
    meeting: GetTogether;
}

function GetTogetherDetailedInfo({ meeting }: Props) {
    return (
        <Segment.Group>
            <Segment attached="top">
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size="large" color="teal" name="info" />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{meeting.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign="middle">
                    <Grid.Column width={1}>
                        <Icon name="calendar" size="large" color="teal" />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>{meeting.date}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign="middle">
                    <Grid.Column width={1}>
                        <Icon name="at" size="large" color="teal" />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>
                            Link: {meeting.link},  PassCode: {meeting.passCode}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    );
}

export default GetTogetherDetailedInfo;