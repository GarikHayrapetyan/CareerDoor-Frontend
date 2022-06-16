import React, { useEffect } from 'react'
import LoadingComponent from '../../app/layout/LoadingComponent'
import { useStore } from '../../app/store/store'
import { Grid, Loader } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import SearchJob from './SearchJob';
import JobDetails from './JobDetails'
import JobList from './JobList'
import JobForm from './JobForm';
import { PagingParams } from '../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';


function JobDashboard() {
    const { jobStore } = useStore();
    const { selectedJob, editMode, loadJobs, searchKeyWord, setPagingParams, pagination } = jobStore;
    const [loadingNext, setLoadingNext] = React.useState(false);

    function handleNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadJobs().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        loadJobs();
    }, [loadJobs])

    if (jobStore.loadingInitial && !loadingNext) return <LoadingComponent content="Loading jobs" />
    return (
        <Grid
            style={{
                padding: '1px',
                borderRadius: '4px'

            }}
        >
            <Grid.Column style={{ position: 'sticky', top: "50px", zIndex: '1000' }} width='16'>
                <SearchJob searchKeyWord={searchKeyWord} />
            </Grid.Column>
            <Grid.Column width='8' style={{ overflowY: 'scroll', height: '540px', paddingRight: '20px' }}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={handleNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <JobList />
                </InfiniteScroll>
            </Grid.Column>
            <Grid.Column width="8">
                {selectedJob && !editMode && <JobDetails />}
                {editMode && <JobForm />}
            </Grid.Column>
            <Grid.Column width={8}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
}

export default observer(JobDashboard);
