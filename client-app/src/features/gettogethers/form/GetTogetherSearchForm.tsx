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
        <Segment style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Input
                style={{ paddingLeft: '10px', width: '55%'}}
                type='text'
                fluid
                icon="search"
                placeholder='Search...'
                value={searchTerm}
                onChange={handleGetTogetherSearchTerm}
            />
            <Button
            style={{float: 'right'}}
                as={NavLink}
				to="/createmeeting"
				positive
				content="Create Meeting"
			/>
        </Segment >

    )
}

export default SearchGetTogther;
