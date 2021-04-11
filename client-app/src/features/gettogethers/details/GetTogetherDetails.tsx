import React from 'react';
import { Grid } from 'semantic-ui-react';
import GetTogether from '../../../app/models/GetTogether';
import GetTogetherDetailedChat from './GetTogetherDetailedChat';
import GetTogetherDetailedHeader from './GetTogetherDetailedHeader';
import GetTogetherDetailedInfo from './GetTogetherDetailedInfo';
import GetTogetherDetailedSidebar from './GetTogetherDetailedSidebar';

interface Props {
    meeting: GetTogether;
}

function GetTogetherDetails({ meeting }: Props) {
    return (
        <div>
            <Grid style={{ margin: 10 }}>
                <Grid.Column width={10}>
                    <GetTogetherDetailedHeader meeting={meeting} />
                    <GetTogetherDetailedInfo meeting={meeting} />
                    <GetTogetherDetailedChat />
                </Grid.Column>
                <Grid.Column width={6}>
                    <GetTogetherDetailedSidebar />
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default GetTogetherDetails;
