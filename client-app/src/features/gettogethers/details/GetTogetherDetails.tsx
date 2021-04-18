import React from 'react';
import { Grid } from 'semantic-ui-react';
import GetTogether from '../../../app/models/GetTogether';
import { useStore } from '../../../app/store/store';
import GetTogetherDetailedChat from './GetTogetherDetailedChat';
import GetTogetherDetailedHeader from './GetTogetherDetailedHeader';
import GetTogetherDetailedInfo from './GetTogetherDetailedInfo';
import GetTogetherDetailedSidebar from './GetTogetherDetailedSidebar';

function GetTogetherDetails() {
	const { getTogetherStore } = useStore();
	const { loadingGetTogethers, getTogetherRegistry } = getTogetherStore;

	return (
		<div>
			<Grid style={{ margin: 10 }}>
				<Grid.Column width={10}>
					<GetTogetherDetailedHeader />
					<GetTogetherDetailedInfo />
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
