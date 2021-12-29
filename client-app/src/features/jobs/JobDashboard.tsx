import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { Job } from '../../app/models/job'
import JobDetails from './JobDetails'
import JobList from './JobList'

const dummyJobs = [
    {
        id: 1,
        title: 'React.js',
        date: "2019-10-07",
        companyName: 'Relayr',
        location: 'Katowice, Poland',
        type: 'Full-time',
        position: 'Front-end',
        industry: "IoT",
        employees: "1000+",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
    },
    {
        id: 2,
        title: 'Node.js',
        date: '2020-01-07',
        companyName: 'Ey',
        location: 'Warsaw, Poland',
        type: 'Full-time',
        position: 'Back-end',
        industry: "IT",
        employees: "100+",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
        id: 1,
        title: 'Customer Service',
        date: "2021-07-17",
        companyName: 'CCIG Polska',
        location: 'Warsaw, Poland',
        type: 'Part-time',
        position: 'Customer Specialist',
        industry: "IT",
        employees: "200+",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
]

function JobDashboard() {
    const [selectedJob, setSelectedJob] = React.useState<Job | undefined>(undefined)

    const handleSelectJob = (id: number) => {
        setSelectedJob(dummyJobs.find(x => x.id === id));
    }

    const handleCancelSelectJob = () => {
        setSelectedJob(undefined);
    }
    return (
        <Grid>
            <Grid.Column width='10'>
                <JobList jobs={dummyJobs} selectJob={handleSelectJob} />
            </Grid.Column>
            <Grid.Column width="6">
                {dummyJobs[0] && <JobDetails job={selectedJob} cancelJob={handleCancelSelectJob} />}
            </Grid.Column>
        </Grid>
    )
}

export default JobDashboard
