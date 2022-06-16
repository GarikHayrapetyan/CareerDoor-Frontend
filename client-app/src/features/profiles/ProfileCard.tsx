import React from 'react';
import { Profile } from '../../app/models/userProfile';
import { observer } from 'mobx-react-lite';
import { Icon, Image, Card, Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FollowButton from './FollowButton';

interface Props {
	profile: Profile;
}

export default observer(function ProfileCard({ profile }: Props) {
	function truncate(str: string | undefined) {
		if (str) {
			return str.length > 40 ? str.substring(0, 37) + '...' : str;
		}
	}
	return (
		<Card as={Link} to={`/profiles/${profile.username}`}>
			<Image src={profile.image || '/assets/user.png'} size='massive' style={{ width: '100%' }} />
			<Card.Content>
				<Card.Header style={{ width: '100%', flexWrap: 'wrap', wordWrap: 'break-word', fontSize: '13px' }}>
					{profile.displayName}
				</Card.Header>
				{/* <Card.Description style={{ fontSize: '11px' }}>
					{truncate(profile.bio)}
				</Card.Description> */}
			</Card.Content>
			<Card.Content extra style={{ fontSize: '11px' }}>
				<Icon name='user' />
				{profile.followersCount} followers
			</Card.Content>
			<FollowButton profile={profile}/>
		</Card>
	)
})

