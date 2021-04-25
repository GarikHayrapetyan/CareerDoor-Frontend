import { observer } from 'mobx-react-lite';
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
	const { loadGetTogether, selectedGetTogether } = getTogetherStore;

	const meeting = {
		id: '6ff0e545-3e54-4ec7-364b-08d8fd0ecba2',
		title: 'Workshop IT',
		description: 'Finding a new job',
		date: '2021-06-11T19:25:25.9512617',
		link:
			'https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/cs0234?f1url=%3FappId%3Droslyn%26k%3Dk(CS0234)',
		passCode: 'axc14sd'
	};

	useEffect(
		() => {
			const id = '6ff0e545-3e54-4ec7-364b-08d8fd0ecba2';
			if (id) loadGetTogether(id);
		},
		[ loadGetTogether ]
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
