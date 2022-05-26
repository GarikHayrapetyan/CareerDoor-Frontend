import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { List,Image, Label } from "semantic-ui-react";
import { Profile } from "../../app/models/userProfile";
import { useStore } from "../../app/store/store";
import FollowButtonModal from "./FollowButtonModal";
import "./style.css"

interface Props {
    profile: Profile
}


export default observer(function ProfileFollowingsModalItme({ profile }: Props) {
    
    return (
        <List.Item key={profile.username} as={Link} to={`/profiles/${profile.username}`}>            
            <div className="FollowingBtn">
                <FollowButtonModal profile={profile}/>
            </div>
    
            <Image avatar src={profile.image || '/assets/user.png'} />
            <List.Content >
                <List.Header as='a'>{profile.displayName}</List.Header>
                <List.Description as='a'>{profile.city}, {profile.country}</List.Description>
            </List.Content>
        </List.Item>
    )
})