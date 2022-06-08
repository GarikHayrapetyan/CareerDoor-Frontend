import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { Button, Grid, GridColumn, List, Loader, Segment } from 'semantic-ui-react'
import { PagingParams } from '../../app/models/pagination';
import { Profile } from '../../app/models/userProfile';
import { useStore } from '../../app/store/store';
import ProfileFollowingModalItem from './ProfileFollowingModalItem';
import './style.css'




export default observer(function ProfileFollowingsModal() {
	const { profileStore } = useStore();
	const { followings, followers, loadingFollowings, setPagingParams, pagination, loadFollowings, predicate, once, setOnce } = profileStore;
	const [loadingNext, setLoadingNext] = useState(false);


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
							{predicate == 'followers' ? (
								followers.map(profile => (
									<ProfileFollowingModalItem profile={profile} />
								))) :
								(followings.map(profile => (
									<ProfileFollowingModalItem profile={profile} />
								)))}
						</List>
					 </InfiniteScroll>
					 <Button positive loading={loadingNext} style={ {  backgroundColor: 'transparent',border: 'none'}}/>		

		</Segment>




	)
})