import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { List,Image } from "semantic-ui-react";
import { Profile } from "../../app/models/userProfile";
import { useStore } from "../../app/store/store";

interface Props {
    profile: Profile
}


export default observer(function ProfileFollowingsModalItme({ profile }: Props) {
    const {modalStore} = useStore();
    const {closeModal} = modalStore;
    return (
        <List.Item as={Link} to={`/profiles/${profile.username}`} onClick={closeModal}>            
            <List.Icon
                name="save outline"
                style={{ position: 'absolute', right: '0px', top: 'auto'}}
                size="large"
            />
            <Image avatar src={profile.image || '/assets/user.png'}/>
            <List.Content>
                <List.Header as='a'>{profile.displayName}</List.Header>
                <List.Description as='a'>{profile.city}, {profile.country}</List.Description>
            </List.Content>
        </List.Item>
    )
})