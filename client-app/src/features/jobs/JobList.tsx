import React, { useEffect, useState } from 'react'
import { List, Segment, Divider } from 'semantic-ui-react'
import { useStore } from '../../app/store/store'
import { observer } from 'mobx-react-lite';
import JobListItem from './JobListItem';
import { Job } from '../../app/models/job';

const getJobType = (value: any) => {
    switch (value) {
        case 1:
            return 'part-time';
        case 2:
            return 'full-time';
        default:
            return ""
    }
}

function getLastWeeksDate() {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
}

const getJobPostedDate = (value: any) => {
    switch (value) {
        case 1:
            return 0;
        case 2:
            return 30;
        case 3:
            return 7;
        case 4:
            return 1;
        default:
            return undefined;
    }
}

function getDays(date: Date) {
    const oned = 24 * 60 * 60 * 1000;
    return Math.ceil((new Date().getTime() - date.getTime()) / oned);
}
function JobList() {
    const { jobStore } = useStore();
    const { filterByTypeKeyWord, filterByPostedDateKeyWord, jobsByDate, searchKeyWord } = jobStore;
    const [jobs, setJobs] = useState(jobsByDate);

    useEffect(() => {
        setJobs(jobsByDate);
    }, [jobsByDate])

    useEffect(() => {
        const postedDate = getJobPostedDate(filterByPostedDateKeyWord);
        console.log(postedDate);
        const filterByType = getJobType(filterByTypeKeyWord);
        let newFilteredJobs: Job[] = [];
        if (searchKeyWord.trim() !== "") {
            if (filterByType === "" && postedDate === undefined) {
                newFilteredJobs = jobsByDate.filter(job => job.title.toLowerCase().includes(searchKeyWord.toLowerCase()))
                setJobs(newFilteredJobs);
            }
            if (filterByType && postedDate) {
                newFilteredJobs = jobsByDate.filter(job => job.title.toLowerCase().includes(searchKeyWord.toLowerCase()) && job.type.toLowerCase() === filterByType && (getDays(job.date) < postedDate && getDays(job.date) >= 0))
                setJobs(newFilteredJobs);
            }
            if (filterByType === "" && postedDate) {
                newFilteredJobs = jobsByDate.filter(job => job.title.toLowerCase().includes(searchKeyWord.toLowerCase()) && (getDays(job.date) < postedDate && getDays(job.date) >= 0))
                setJobs(newFilteredJobs);
            }
            if (filterByType && postedDate === undefined) {
                newFilteredJobs = jobsByDate.filter(job => job.title.toLowerCase().includes(searchKeyWord.toLowerCase()) && job.type.toLowerCase() === filterByType)
                setJobs(newFilteredJobs);
            }
        } else if (searchKeyWord.trim() === "") {
            if (filterByType && postedDate === undefined) {
                newFilteredJobs = jobsByDate.filter(job => job.type.toLowerCase() === filterByType)
                setJobs(newFilteredJobs);
            } else if (filterByType && postedDate) {
                newFilteredJobs = jobsByDate.filter(job => job.type.toLowerCase() === filterByType && (getDays(job.date) < postedDate && getDays(job.date) >= 0))
                setJobs(newFilteredJobs);
            } else if (filterByType === "" && postedDate) {
                newFilteredJobs = jobsByDate.filter(job => (getDays(job.date) < postedDate && getDays(job.date) >= 0))
                setJobs(newFilteredJobs);
            } else {
                setJobs(jobsByDate);
            }
        }
        else {
            setJobs(jobsByDate);
        }
    }, [searchKeyWord, filterByTypeKeyWord, filterByPostedDateKeyWord])
    console.log(jobs);
    return (
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
    )
}

export default observer(JobList);
