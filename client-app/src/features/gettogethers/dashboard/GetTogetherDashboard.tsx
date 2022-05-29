import React, { useEffect, useState } from 'react';
import { Grid, GridColumn, Loader } from 'semantic-ui-react';
import GetTogetherList from './GetTogetherList';
import GetTogetherFilter from './GetTogetherFilter';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/store/store';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';
import GetTogetherListItemPlaceHolder from './GetTogetherListItemPlaceHolder';
import GetTogetherSearchForm from '../form/GetTogetherSearchForm';

export default observer(function GetTogetherDashboard() {
	const { getTogetherStore } = useStore();
	const { loadingGetTogethers, getTogetherRegistry, setPagingParams, pagination, searchGetTogetherTerm } = getTogetherStore;
	const [loadingNext, setLoadingNext] = useState(false);

	function handleGetNext() {
		setLoadingNext(true);
		setPagingParams(new PagingParams(pagination!.currentPage + 1));
		loadingGetTogethers().then(() => setLoadingNext(false));
	}

	useEffect(
		() => {
			if (getTogetherRegistry.size <= 1) loadingGetTogethers();
		}, [loadingGetTogethers, getTogetherRegistry]
	);
	return (
		<Grid>
			<Grid.Column width='16'>
                <GetTogetherSearchForm searchTerm={searchGetTogetherTerm} />
            </Grid.Column>
			<GridColumn width={8} style={{ marginRight: '4em' }}>
				{getTogetherStore.loadingInitial && !loadingNext ? (
					<>
						<GetTogetherListItemPlaceHolder />
						<GetTogetherListItemPlaceHolder />
					</>
				) : (
					<InfiniteScroll
						pageStart={0}
						loadMore={handleGetNext}
						hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
						initialLoad={false}
					>
						<GetTogetherList />
					</InfiniteScroll>)}
			</GridColumn>
			<GridColumn width={6}>
				<GetTogetherFilter />
			</GridColumn>
			<Grid.Column width={10}>
				<Loader active={loadingNext} />
			</Grid.Column>
		</Grid>
	);
});
