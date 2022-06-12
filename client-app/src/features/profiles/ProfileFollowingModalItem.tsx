import React, { SyntheticEvent, useRef } from "react";
import { useStore } from '../../app/store/store';
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { List, Image, Button } from "semantic-ui-react";
import { Profile } from "../../app/models/userProfile";
import "./style.css"

interface Props {
    profile: Profile
    userId?: string
    handleClick: (username: string) => void
}

export default observer(function ProfileFollowingsModalItme({ profile, userId, handleClick }: Props) {
    const { profileStore, userStore, modalStore } = useStore();
    const { updateFollowing, loading } = profileStore;
    const buttonRef = useRef<any>({});

    const bgColor = profile.following ? "white" : 'teal';
    const textColor = profile.following ? "black" : "white";

    function handleFollow(e: SyntheticEvent<HTMLButtonElement>, username: string) {
        e.preventDefault();
        handleClick(buttonRef.current.ref.current.name)
        modalStore.modal.open = true;
        profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
    }

    return (
        <React.Fragment >
            {userStore.user?.username === profile.username ? null :
                <div className="FollowingBtn">
                    <Button
                        disabled={loading && userId === profile.username}
                        ref={buttonRef}
                        fluid
                        name={profile.username}
                        content={profile.following ? 'Unfollow' : 'Follow'}
                        loading={loading && userId === profile.username}
                        onClick={(e) => handleFollow(e, profile.username)}
                        style={{ backgroundColor: bgColor, color: textColor }}
                    />
                </div>}
            <List.Item as={Link} to={`/profiles/${profile.username}`}>
                <Image avatar src={profile.image || '/assets/user.png'} />
                <List.Content >
                    <List.Header as='a'>{profile.displayName}</List.Header>
                    <List.Description as='a'>{profile.city}, {profile.country}</List.Description>
                </List.Content>
            </List.Item>
        </React.Fragment>
    )
})