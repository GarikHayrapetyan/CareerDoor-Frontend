import React from 'react'
import { Button, Container, Search, Segment } from 'semantic-ui-react'
import { useStore } from '../../app/store/store';

function SearchJob() {
    const { jobStore } = useStore();
    const { openForm } = jobStore;
    return (
        <Segment style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', width: '47%', justifyContent: 'space-between' }}>
                <Search />
                <Button
                    content="Search"

                    type="button"
                    color='blue'
                />
                <Button
                    content="Reset"
                    basic
                    type="button"
                    color='red'
                />
            </div>
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
