import React from 'react'
import { Button, Dropdown, Input, Segment } from 'semantic-ui-react'
import { useStore } from '../../app/store/store';
import { datePosted, experienceLevel, jobType } from './helpers'

interface Props {
    searchKeyWord: string;
}

function SearchJob({ searchKeyWord }: Props) {
    const { jobStore } = useStore();
    const { openForm, setSearchTerm, setFilterByJobType, setFilterByPostedDate, setFilterByExperience } = jobStore;
    return (
        <Segment style={{ display: 'flex', width: '100%', flexWrap: 'wrap', gap: '1rem' }}>

            <Input
                style={{ paddingLeft: '10px', width: '250px', flex: '3, 1, 0' }}
                type='text'
                fluid
                icon="search"
                placeholder='Search...'
                value={searchKeyWord}
                onChange={setSearchTerm}
            />

            <Dropdown onChange={setFilterByPostedDate} clearable selection placeholder="Date Posted" options={datePosted} />
            <Dropdown onChange={setFilterByExperience} clearable selection placeholder="Experience" options={experienceLevel} />
            <Dropdown onChange={setFilterByJobType} style={{ marginRight: '6rem' }} clearable selection placeholder="Job Type" options={jobType} />
            <div>
                <Button
                    onClick={() => openForm("")}
                    positive
                    content="Create Job"
                    floated='right'
                />
            </div>
        </Segment >

    )
}

export default SearchJob;
