import React from 'react'
import { Button, Input, Segment } from 'semantic-ui-react'
import { useStore } from '../../app/store/store';

interface Props {
    searchTerm: string;
}


function SearchJob({ searchTerm }: Props) {
    const { jobStore } = useStore();
    const { openForm, handleSearchTerm } = jobStore;
    return (
        <Segment style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input
                style={{ paddingLeft: '10px', width: '50%' }}
                type='text'
                fluid
                icon="search"
                placeholder='Search...'
                value={searchTerm}
                onChange={handleSearchTerm}
            />
            <Button
                onClick={() => openForm("")}
                positive
                content="Create Job"
                floated='right'
            />
        </Segment>

    )
}

export default SearchJob;
