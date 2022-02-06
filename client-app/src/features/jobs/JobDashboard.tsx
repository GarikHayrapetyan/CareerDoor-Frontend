import React, { useEffect } from 'react'
import LoadingComponent from '../../app/layout/LoadingComponent'
import { useStore } from '../../app/store/store'
import { Grid } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import SearchJob from './SearchJob';
import JobDetails from './JobDetails'
import JobList from './JobList'
import JobForm from './JobForm';


function JobDashboard() {
    const { jobStore } = useStore();
    const { selectedJob, editMode, loadJobs, searchTerm } = jobStore;

    useEffect(() => {
        loadJobs();
    }, [loadJobs])

    if (jobStore.loadingInitial) return <LoadingComponent content="Loading jobs" />
    return (
        <Grid
            style={{
                background: '#dbdbdb',
                padding: '1px',
                borderRadius: '4px'

            }}
        >
            <Grid.Column width='16'>
                <SearchJob searchTerm={searchTerm}/>
            </Grid.Column>
            <Grid.Column width='8'>
                <JobList />
            </Grid.Column>
            <Grid.Column width="8" >
                {selectedJob && !editMode && <JobDetails />}
                {editMode && <JobForm />}
            </Grid.Column>
        </Grid>
    )
}

export default observer(JobDashboard);
