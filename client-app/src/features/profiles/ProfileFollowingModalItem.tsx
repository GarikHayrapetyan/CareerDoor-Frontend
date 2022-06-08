import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { List,Image, Label, Card } from "semantic-ui-react";
import { Profile } from "../../app/models/userProfile";
import FollowButtonModal from "./FollowButtonModal";
import "./style.css"

interface Props {
    profile: Profile
}


export default observer(function ProfileFollowingsModalItme({ profile }: Props) {
    function truncate(str: string | undefined, len: number) {
		if (str) {
			return str.length >  len? str.substring(0, len-3) + '...' : str;
		}
	}
    return (
        <List.Item key={profile.username} as={Link} to={`/profiles/${profile.username}`}>            
            <div className="FollowingBtn">
                <FollowButtonModal profile={profile}/>
            </div>
    
            <Image avatar src={profile.image || '/assets/user.png'} />
            <List.Content >
                <List.Header as='a'>{truncate(profile.displayName,28)}</List.Header>
                <List.Description as='a'>{truncate(profile.city,15)}, {truncate(profile.country,14)}</List.Description>
            </List.Content>
        </List.Item>
    )
})