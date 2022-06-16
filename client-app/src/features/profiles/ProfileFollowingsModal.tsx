import React, { useState } from 'react'
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroller';
import { Button, List, Segment, Divider } from 'semantic-ui-react'
import { PagingParams } from '../../app/models/pagination';
import { useStore } from '../../app/store/store';
import ProfileFollowingModalItem from './ProfileFollowingModalItem';
import './style.css'

export default observer(function ProfileFollowingsModal() {
	const { profileStore } = useStore();
	const [userId, setUserId] = React.useState<string | undefined>();
	const { followings, followers, loadingFollowings, setPagingParams, pagination, loadFollowings, predicate, once, setOnce } = profileStore;
	const [loadingNext, setLoadingNext] = useState(false);

	const handleClick = (username: string) => {
		setUserId(username);
	}

	function handleGetNext() {
		setLoadingNext(true);
		setPagingParams(new PagingParams(pagination!.currentPage + 1));
		loadFollowings(predicate).then(() => setLoadingNext(false));
		setOnce(true);
	}

	return (
		<Segment
			textAlign='left'
			vertical
			loading={loadingFollowings && !once}>
			<InfiniteScroll
				pageStart={0}
				loadMore={handleGetNext}
				hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
				initialLoad={false}
				useWindow={false}>
				<List relaxed divided>
					{predicate === 'followers' ? (
						followers.map((profile, index) => {
							return (
								<React.Fragment>
									<ProfileFollowingModalItem userId={userId} handleClick={handleClick} profile={profile} key={profile.username} />
									{index !== followings.length - 1 ? <Divider /> : null}
								</React.Fragment>
							)
						})) :
						(followings.map((profile, index) => {
							return (
								<React.Fragment>
									<ProfileFollowingModalItem userId={userId} handleClick={handleClick} profile={profile} key={profile.username} />
									{index !== followings.length - 1 ? <Divider /> : null}
								</React.Fragment>
							)
						}))}
				</List>
			</InfiniteScroll>
			<Button positive loading={loadingNext} style={{ backgroundColor: 'transparent', border: 'none' }} />
		</Segment>
	)
})