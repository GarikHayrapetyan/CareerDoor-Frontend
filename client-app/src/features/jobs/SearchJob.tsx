import React from 'react'
import { Button, Dropdown, Input, Segment } from 'semantic-ui-react'
import { useStore } from '../../app/store/store';
import { datePosted, experienceLevel, jobType } from './helpers'

interface Props {
    searchTerm: string;
}


function SearchJob({ searchTerm }: Props) {
    const { jobStore } = useStore();
    const { openForm, handleSearchTerm } = jobStore;
    return (
        <Segment style={{ display: 'flex', width: '100%' }}>
            <Input
                style={{ paddingLeft: '10px', width: '250px', flex: '2, 1, 0' }}
                type='text'
                fluid
                icon="search"
                placeholder='Search...'
                value={searchTerm}
                onChange={handleSearchTerm}
            />
            <div style={{ flex: 2, display: 'flex', justifyContent: 'space-around' }}>
                <Dropdown clearable selection placeholder="Date Posted" options={datePosted} />
                <Dropdown clearable selection placeholder="Experience" options={experienceLevel} />
                <Dropdown clearable selection placeholder="Job Type" options={jobType} />
            </div>
            <Button
                style={{ flex: '2, 1, 0' }}
                onClick={() => openForm("")}
                positive
                content="Create Job"
                floated='right'
            />
        </Segment >

    )
}

export default SearchJob;
