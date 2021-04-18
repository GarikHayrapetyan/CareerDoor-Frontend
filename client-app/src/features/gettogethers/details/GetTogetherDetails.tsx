import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import GetTogether from '../../../app/models/GetTogether';
import { useStore } from '../../../app/store/store';
import GetTogetherDetailedChat from './GetTogetherDetailedChat';
import GetTogetherDetailedHeader from './GetTogetherDetailedHeader';
import GetTogetherDetailedInfo from './GetTogetherDetailedInfo';
import GetTogetherDetailedSidebar from './GetTogetherDetailedSidebar';

function GetTogetherDetails() {
	const { getTogetherStore } = useStore();
	const { selectedGetTogether, loadGetTogether } = getTogetherStore;

	useEffect(() => {
		let id = '6ff0e545-3e54-4ec7-364b-08d8fd0ecba2';
		async function getTogether() {
			if (selectedGetTogether === null) {
				await loadGetTogether(id);
			}
		}
		getTogether();
	}, []);

	return (
		<div>
			<Grid style={{ margin: 10 }}>
				<Grid.Column width={10}>
					<GetTogetherDetailedHeader meeting={selectedGetTogether} />
					<GetTogetherDetailedInfo meeting={selectedGetTogether} />
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
