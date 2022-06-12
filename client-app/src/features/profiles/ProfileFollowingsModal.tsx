import React from 'react'
import { observer } from 'mobx-react-lite';
import { List, Segment } from 'semantic-ui-react'
import { useStore } from '../../app/store/store';
import ProfileFollowingModalItem from './ProfileFollowingModalItem';
import './style.css'




export default observer(function ProfileFollowingsModal() {
  const { profileStore } = useStore();
  const { followings, loadingFollowings } = profileStore;
  const [userId, setUserId] = React.useState<string | undefined>();

  const handleClick = (username: string) => {
    setUserId(username);
  }

  return (
    <Segment
      textAlign='left'
      vertical
      loading={loadingFollowings}>
      <List relaxed divided>
        {followings.map(profile => (
          <ProfileFollowingModalItem userId={userId} handleClick={handleClick} profile={profile} key={profile.username} />
        ))}
      </List>
    </Segment>
  )
})

