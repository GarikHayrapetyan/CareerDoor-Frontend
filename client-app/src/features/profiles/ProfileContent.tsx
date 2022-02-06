import React from 'react';
import { observer } from 'mobx-react-lite';
import { Tab } from 'semantic-ui-react';
import { Profile } from '../../app/models/userProfile';
import { useStore } from '../../app/store/store';
import ProfileAbout from './ProfileAbout';
import ProfileDocuments from './ProfileDocuments';
import ProfileFollowings from './ProfileFollowings';
import ProfileGetTogethers from './ProfileGetTogethers';
import ProfilePhotos from './ProfilePhotos';
interface Props {
	profile: Profile;
}
export default observer(function ProfileContent({ profile }: Props) {

	const {profileStore} = useStore();

	const panes = [
		{ menuItem: 'About', render: () => <ProfileAbout /> },
		{
			menuItem: 'Documents', render: () => <ProfileDocuments profile={profile}/>
		},
		{
			menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} />
		},
		{
			menuItem: 'Events', render: () => <ProfileGetTogethers/>
		},
		{
			menuItem: 'Followers', render: () => <ProfileFollowings />
		},
		{
			menuItem: 'Following', render: () => <ProfileFollowings />
		},
	];
	return (
		<Tab
			menu={{ fluid: true, vertical: true }}
			menuPosition='right'
			panes={panes}
			onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
		/>
	)
})