import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/store/store';
import GetTogetherDetailedChat from './GetTogetherDetailedChat';
import GetTogetherDetailedHeader from './GetTogetherDetailedHeader';
import GetTogetherDetailedInfo from './GetTogetherDetailedInfo';
import GetTogetherDetailedSidebar from './GetTogetherDetailedSidebar';

function GetTogetherDetails() {
	const { getTogetherStore } = useStore();
	const {
		loadGetTogether,
		selectedGetTogether: getTogether,
		loadingInitial,
		clearSelectedGetTogether
	} = getTogetherStore;
	const { id } = useParams<{ id: string }>();

	useEffect(
		() => {
			if (id) loadGetTogether(id);
			return () => clearSelectedGetTogether();
		},
		[ id, loadGetTogether,clearSelectedGetTogether]
	);

	if (loadingInitial || !getTogether) return <LoadingComponent />;

	return (
		<Grid style={{ margin: 10 }}>
			<Grid.Column width={10}>
				<GetTogetherDetailedHeader meeting={getTogether} />
				<GetTogetherDetailedInfo meeting={getTogether} />
			</Grid.Column>
			<Grid.Column width={6}>
				<GetTogetherDetailedSidebar getTogether={getTogether} />
				<GetTogetherDetailedChat getTogetherId={getTogether.id}/>
			</Grid.Column>
		</Grid>
	);
}

export default observer(GetTogetherDetails);
