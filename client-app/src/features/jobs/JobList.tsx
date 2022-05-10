import React from 'react'
import { List, Segment, Header, Divider } from 'semantic-ui-react'
import { useStore } from '../../app/store/store'
import { observer } from 'mobx-react-lite';
import JobListItem from './JobListItem';
import { Job } from '../../app/models/job';

function JobList() {
    const { jobStore } = useStore();
    const { groupedJobs, searchResults } = jobStore;
    return (
        <>
            {(searchResults ? searchResults : groupedJobs).map(([group, jobs]: any) => (
                <React.Fragment key={group}>
                    <Header sub color="teal">
                        {group}
                    </Header>
                    <Segment>
                        <List verticalAlign='middle' >
                            {jobs.map((job: Job, idx: number) => (
                                <>
                                    <JobListItem key={job.id} job={job} />
                                    {idx < jobs.length - 1 && <Divider />}
                                </>
                            ))}
                        </List>
                    </Segment>
                </React.Fragment>
            ))}
        </>

    )
}

export default observer(JobList);
