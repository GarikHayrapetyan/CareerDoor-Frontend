import { observer } from 'mobx-react-lite';
import React, { HtmlHTMLAttributes, SyntheticEvent, useEffect, useState } from 'react';
import { Reveal, Button } from 'semantic-ui-react';
import { Profile } from '../../app/models/userProfile';
import { useStore } from '../../app/store/store';


interface Props {
    profile: Profile;
}

export default observer(function FollowButton({ profile }: Props) {
    const {profileStore, userStore,modalStore} = useStore();
    const {updateFollowing,loading} = profileStore;
    const [backgroundColor,setBackgroundColor] = useState<string>();
    const [color,setColor] = useState<string>();
    const [target,setTarget] = useState('');

    useEffect(() => { 
      profile.following ? setBackgroundColor("white"):setBackgroundColor("teal");  
      profile.following ? setColor("black"):setColor("white");  
      }, [profile.following]); 

    if (userStore.user?.username === profile.username) return null;

    function handleFollow(e: SyntheticEvent<HTMLButtonElement>, username: string) {
        e.preventDefault();    
        modalStore.modal.open=true;      
        setTarget(e.currentTarget.name);
        profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
        profile.following ? setBackgroundColor("white"):setBackgroundColor("teal");      
        
            
    }

    return (          
                <Button
                    fluid   
                    name={profile.username!}                 
                    content={profile.following ? 'Unfollow' : 'Follow'}
                    loading={loading && target === profile.username}
                    onClick={(e) => handleFollow(e, profile.username)}
                    style={{backgroundColor:backgroundColor, color:color}}
                />
    )
})