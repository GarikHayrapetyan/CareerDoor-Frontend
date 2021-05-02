import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import GetTogether from '../../../app/models/GetTogether';
import { useStore } from '../../../app/store/store';
import GetTogetherDetailedChat from './GetTogetherDetailedChat';
import GetTogetherDetailedHeader from './GetTogetherDetailedHeader';
import GetTogetherDetailedInfo from './GetTogetherDetailedInfo';
import GetTogetherDetailedSidebar from './GetTogetherDetailedSidebar';

function GetTogetherDetails() {
	const { getTogetherStore } = useStore();
	const { loadGetTogether, selectedGetTogether } = getTogetherStore;
	const { id } = useParams<{ id: string }>();

	useEffect(
		() => {
			if (id) loadGetTogether(id);
		},
		[ id, loadGetTogether ]
	);

	return (
		<div>
			<Grid style={{ margin: 10 }}>
				<Grid.Column width={10}>
					<GetTogetherDetailedHeader meeting={selectedGetTogether} />
					<GetTogetherDetailedInfo meeting={selectedGetTogether} />
				</Grid.Column>
				<Grid.Column width={6}>
					<GetTogetherDetailedSidebar />
					<GetTogetherDetailedChat />
				</Grid.Column>
			</Grid>
		</div>
	);
}

export default observer(GetTogetherDetails);
