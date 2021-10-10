import React, { useEffect } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import GetTogetherList from './GetTogetherList';
import GetTogetherFilter from './GetTogetherFilter';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/store/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default observer(function GetTogetherDashboard() {
	const { getTogetherStore } = useStore();
	const { loadingGetTogethers, getTogetherRegistry } = getTogetherStore;

	useEffect(
		() => {
			if (getTogetherRegistry.size <= 1) loadingGetTogethers();
		}, [ loadingGetTogethers, getTogetherRegistry ]
	);

	if (getTogetherStore.loadingInitial) return <LoadingComponent content='Loading content ...' />

	return (
		<Grid>
			<GridColumn width={8} style={{ marginRight: '4em' }}>
				<GetTogetherList />
			</GridColumn>
			<GridColumn width={6}>
				<GetTogetherFilter />
			</GridColumn>
		</Grid>
	);
});
