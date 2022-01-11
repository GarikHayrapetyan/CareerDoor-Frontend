import React, { useEffect } from 'react'
import LoadingComponent from '../../app/layout/LoadingComponent'
import { useStore } from '../../app/store/store'
import { Grid } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import JobDetails from './JobDetails'
import JobList from './JobList'
import JobForm from './JobForm';


function JobDashboard() {
    const { jobStore } = useStore();
    const { selectedJob, editMode, jobsByDate } = jobStore;

    useEffect(() => {
        jobStore.loadJobs();
    }, [jobStore])

    if (jobStore.loadingInitial) return <LoadingComponent content="Loading jobs" />
    return (
        <Grid>
            <Grid.Column width='8'>
                <JobList jobsByDate={jobsByDate} />
            </Grid.Column>
            <Grid.Column width="8" >
                {selectedJob && !editMode && <JobDetails />}
                {editMode && <JobForm />}
            </Grid.Column>
        </Grid>
    )
}

export default observer(JobDashboard);
