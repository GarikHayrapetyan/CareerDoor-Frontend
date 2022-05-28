import { NavLink } from "react-router-dom";
import { Button, Dropdown, Input, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";
import { datePosted } from "./getTogetherhelper";

interface Props {
    searchTerm: string;
}


function SearchGetTogther({ searchTerm }: Props) {
    const { getTogetherStore } = useStore();
    const { openForm, handleGetTogetherSearchTerm } = getTogetherStore;
    return (
        <Segment style={{ display: 'flex', width: '92%' }}>
            <Input
                style={{ paddingLeft: '10px', width: '53%'}}
                type='text'
                fluid
                icon="search"
                placeholder='Search...'
                value={searchTerm}
                onChange={handleGetTogetherSearchTerm}
            />
            <div style={{ flex: 2, display: 'flex', justifyContent: 'space-around' }}>
                {/* <Dropdown clearable selection placeholder="Date Posted" options={datePosted} /> */}
            </div>
            <Button
                as={NavLink}
				to="/createmeeting"
				positive
				content="Create Meeting"
			/>
        </Segment >

    )
}

export default SearchGetTogther;
