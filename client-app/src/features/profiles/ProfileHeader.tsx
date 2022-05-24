import React from 'react';
import { observer } from 'mobx-react-lite';
import {
	Grid,
	Item,
	Segment,
	Header,
	Statistic,
	Divider,
	Button,
} from 'semantic-ui-react';
import { Profile } from '../../app/models/userProfile';
import FollowButton from './FollowButton';
import { useStore } from '../../app/store/store';
import ProfileFollowingsModal from './ProfileFollowingsModal';

interface Props {
	profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
	const { profileStore, modalStore } = useStore();
	const { setActiveTab } = profileStore;
	const IsFollowersZero = profile.followersCount==0 ? true:false;
	const IsFollowingsZero = profile.followingCount==0 ? true:false;

	const handleFollowers = () => {
		setActiveTab(4);
		modalStore.openModal(<ProfileFollowingsModal />)
	}
	const handleFollowings = () => {
		setActiveTab(5);
		modalStore.openModal(<ProfileFollowingsModal />)
	}



	return (
		<Segment>
			<Grid>
				<Grid.Column width={12}>
					<Item.Group>
						<Item>
							<Item.Image
								avatar
								size="small"
								src={profile.image || '/assets/user.png'}
							/>
							<Item.Content verticalAlign="middle">
								<Header as="h1" content={profile.displayName} /><br /><br />
								<Header as="h5" content={profile.city} />,
								<Header as="h5" content={profile.country} />
							</Item.Content>
						</Item>
					</Item.Group>
				</Grid.Column>
				<Grid.Column width={4}>
					<Statistic.Group>
						<Statistic>
							<Statistic.Value>{profile.followersCount}</Statistic.Value>
							<Button style={{ border: 'none', background: 'none' }} onClick={handleFollowers} disabled={IsFollowersZero}>Followers</Button>
						</Statistic>
						<Statistic>
							<Statistic.Value>{profile.followingCount}</Statistic.Value>
							<Button style={{ border: 'none', background: 'none' }} onClick={handleFollowings} disabled={IsFollowingsZero}>Followings</Button>
						</Statistic>
					</Statistic.Group>
					<Divider />
					<FollowButton profile={profile} />
				</Grid.Column>
			</Grid>
		</Segment>
	);
});
