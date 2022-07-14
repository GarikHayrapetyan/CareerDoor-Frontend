import React, { useEffect, useState } from 'react'
import { List, Segment, Divider, Message } from 'semantic-ui-react'
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
const getExperience = (value: any) => {
    switch (value) {
        case 1:
            return 'intern';
        case 2:
            return 'Junior';
        default:
            return ""
    }
}

const getJobPostedDate = (value: any) => {
    switch (value) {
        case 1:
            return 0;
        case 2:
            return 30;
        case 3:
            return 7;
        default:
            return undefined;
    }
}

function getDays(date: Date) {
    const oned = 24 * 60 * 60 * 1000;
    return Math.ceil((new Date().getTime() - new Date(date).getTime()) / oned);
}
function JobList() {
    const { jobStore } = useStore();
    const { filterByTypeKeyWord, filterByPostedDateKeyWord, filterByExperienceKeyWord, jobsByDate, searchKeyWord } = jobStore;
    const [jobs, setJobs] = useState(jobsByDate);

    useEffect(() => {
        setJobs(jobsByDate);
    }, [jobsByDate])

    useEffect(() => {
        const postedDate = getJobPostedDate(filterByPostedDateKeyWord);
        const filterByType = getJobType(filterByTypeKeyWord);
        const filterByExperience = getExperience(filterByExperienceKeyWord);

        let newFilteredJobs: Job[] = [];

        if (searchKeyWord.trim() !== "") {
            if (filterByType === "" && postedDate === undefined && filterByExperience === "") {
                newFilteredJobs = jobsByDate.filter(job => job.title.toLowerCase().includes(searchKeyWord.toLowerCase()))
                setJobs(newFilteredJobs);
            }
            if (filterByType && postedDate && filterByExperience) {
                newFilteredJobs = jobsByDate.filter(job => job.title.toLowerCase().includes(searchKeyWord.toLowerCase()) && job.type.toLowerCase() === filterByType.toLowerCase() && (getDays(job.creation) <= postedDate && getDays(job.creation) >= 0) && job.experience.toLowerCase() === filterByExperience.toLowerCase())
                setJobs(newFilteredJobs);
            }
            if (filterByType === "" && filterByExperience === "" && postedDate) {
                newFilteredJobs = jobsByDate.filter(job => job.title.toLowerCase().includes(searchKeyWord.toLowerCase()) && (getDays(job.creation) <= postedDate && getDays(job.creation) >= 0))
                setJobs(newFilteredJobs);
            }
            if (filterByType === "" && filterByExperience && postedDate) {
                newFilteredJobs = jobsByDate.filter(job => job.title.toLowerCase().includes(searchKeyWord.toLowerCase()) && (getDays(job.creation) <= postedDate && getDays(job.creation) >= 0) && job.experience.toLowerCase() === filterByExperience.toLowerCase())
                setJobs(newFilteredJobs);
            }
            if (filterByType && filterByExperience === "" && postedDate === undefined) {
                newFilteredJobs = jobsByDate.filter(job => job.title.toLowerCase().includes(searchKeyWord.toLowerCase()) && job.type.toLowerCase() === filterByType.toLowerCase())
                setJobs(newFilteredJobs);
            }
            if (filterByType && filterByExperience && postedDate === undefined) {
                newFilteredJobs = jobsByDate.filter(job => job.title.toLowerCase().includes(searchKeyWord.toLowerCase()) && job.type.toLowerCase() === filterByType.toLowerCase() && job.experience.toLowerCase() === filterByExperience.toLowerCase())
                setJobs(newFilteredJobs);
            }
            if (filterByType === "" && filterByExperience && postedDate === undefined) {
                newFilteredJobs = jobsByDate.filter(job => job.title.toLowerCase().includes(searchKeyWord.toLowerCase()) && job.experience.toLowerCase() === filterByExperience.toLowerCase())
                setJobs(newFilteredJobs);
            }
        } else if (searchKeyWord.trim() === "") {
            if (filterByType === "" && postedDate === undefined && filterByExperience === "") {
                setJobs(jobsByDate);
            }
            if (filterByType && postedDate && filterByExperience) {
                newFilteredJobs = jobsByDate.filter(job => job.type.toLowerCase() === filterByType.toLowerCase() && (getDays(job.creation) <= postedDate && getDays(job.creation) >= 0) && job.experience.toLowerCase() === filterByExperience.toLowerCase())
                setJobs(newFilteredJobs);
            }
            if (filterByType === "" && filterByExperience === "" && postedDate) {
                newFilteredJobs = jobsByDate.filter(job => (getDays(job.creation) <= postedDate && getDays(job.creation) >= 0))
                setJobs(newFilteredJobs);
            }
            if (filterByType === "" && filterByExperience && postedDate) {
                newFilteredJobs = jobsByDate.filter(job => (getDays(job.creation) <= postedDate && getDays(job.creation) >= 0) && job.experience.toLowerCase() === filterByExperience.toLowerCase())
                setJobs(newFilteredJobs);
            }
            if (filterByType && filterByExperience === "" && postedDate === undefined) {
                newFilteredJobs = jobsByDate.filter(job => job.type.toLowerCase() === filterByType.toLowerCase())
                setJobs(newFilteredJobs);
            }
            if (filterByType && filterByExperience && postedDate === undefined) {
                newFilteredJobs = jobsByDate.filter(job => job.type.toLowerCase() === filterByType.toLowerCase() && job.experience.toLowerCase() === filterByExperience.toLowerCase())
                setJobs(newFilteredJobs);
            }
            if (filterByType === "" && filterByExperience && postedDate === undefined) {
                newFilteredJobs = jobsByDate.filter(job => job.experience.toLowerCase() === filterByExperience.toLowerCase())
                setJobs(newFilteredJobs);
            }
        }
        else {
            setJobs(jobsByDate);
        }
    }, [searchKeyWord, filterByTypeKeyWord, filterByPostedDateKeyWord, filterByExperienceKeyWord])

    if (jobs.length === 0) {
        return (
            <Message warning>
                <Message.Header>There is no a job!</Message.Header>
                <p>Something went wrong, please add a job which you want to have.</p>
            </Message >)
    }
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
