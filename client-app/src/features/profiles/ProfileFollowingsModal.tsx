import { observer } from 'mobx-react-lite';
import React from 'react'
import { List, Segment } from 'semantic-ui-react'
import { useStore } from '../../app/store/store';
import ProfileFollowingModalItem from './ProfileFollowingModalItem';
import './style.css'




export default observer(function ProfileFollowingsModal() {
  const { profileStore } = useStore();
  const { followings, loadingFollowings} = profileStore;

  return (
    <Segment
      textAlign='left'
      // style={{ padding: '0em', minHeight: 50, maxHeight: 100, width: "100%" }}
      vertical
      loading={loadingFollowings}>
      <List relaxed divided>
        {followings.map(profile => (
          <ProfileFollowingModalItem profile={profile}/>
        ))}
      </List>
    </Segment>
  )
})

