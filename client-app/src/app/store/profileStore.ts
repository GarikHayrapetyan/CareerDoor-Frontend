import { makeAutoObservable, reaction, runInAction } from 'mobx';
import agent from '../api/agent';
import { Pagination, PagingParams } from '../models/pagination';
import { Photo, Profile, Resume, UserGetTogether, UserJob } from '../models/userProfile';
import { store } from './store';

export default class ProfileStore {
	profile: Profile | null = null;
	loadingProfile = false;
	uploading = false;
	loading = false;
	followings: Profile[] = [];
	loadingFollowings = false;
	activeTab = 0;
	userGetTogethers: UserGetTogether[] = [];
	loadingGetTogethers = false;
	userJobs: UserJob[] = [];
	loadingJobs = false;
	pagination: Pagination | null = null;
	pagingParams = new PagingParams();
	predicate: string|null = null;


	constructor() {
		makeAutoObservable(this);

		reaction(
			() => this.activeTab,
			activeTab => {
				if (activeTab === 4 || activeTab === 5) {
					const predicate = activeTab === 4 ? 'followers' : 'following';				
					this.pagingParams = new PagingParams();
					this.loadFollowings(predicate);				
				} else {
					this.followings = [];
				}
			}
		)
	}

	setPagingParams = (pagingParams: PagingParams) => {
		this.pagingParams = pagingParams;
	}

	setActiveTab = (activeTab: any) => {
		this.activeTab = activeTab;		
	}

	get isCurrentUser() {
		if (store.userStore && this.profile) {
			return store.userStore.user?.username === this.profile.username;
		}
		return false;
	}
	loadProfile = async (username: string) => {
		this.loadingProfile = true;
		try {
			const profile = await agent.Profiles.get(username);
			runInAction(() => {
				this.profile = profile;
				this.loadingProfile = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => (this.loadingProfile = false));
		}
	};

	uploadPhoto = async (file: Blob) => {
		this.uploading = true;
		try {
			const response = await agent.Profiles.uploadPhoto(file);
			const photo = response.data;
			runInAction(() => {
				if (this.profile) {
					this.profile.photos?.push(photo);
					if (photo.isMain && store.userStore.user) {
						store.userStore.setImage(photo.url);
						this.profile.image = photo.url
					}
				}
				this.uploading = false;
			})
		} catch (error) {
			console.log(error);
			runInAction(() => this.uploading = false);
		}
	}

	setMainPhoto = async (photo: Photo) => {
		this.loading = true;

		try {
			await agent.Profiles.setMainPhoto(photo.id);
			store.userStore.setImage(photo.url);
			runInAction(() => {
				if (this.profile && this.profile.photos) {
					this.profile.photos.find(p => p.isMain)!.isMain = false;
					this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
					this.profile.image = photo.url;
					this.loading = false;
				}
			})
		} catch (error) {
			runInAction(() => this.loading = false);
			console.log(error);
		}
	}

	deletePhoto = async (photo: Photo) => {
		this.loading = true;
		try {
			await agent.Profiles.deletePhoto(photo.id);
			runInAction(() => {
				if (this.profile) {
					this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
					this.loading = false;
				}
			})
		} catch (error) {
			runInAction(() => this.loading = false);
			console.log(error)
		}
	}

	updateProfile = async (profile: Partial<Profile>) => {
		this.loading = true;
		try {
			await agent.Profiles.updateProfile(profile);
			runInAction(() => {
				if (profile.displayName && profile.displayName !==
					store.userStore.user?.displayName) {
					store.userStore.setDisplayName(profile.displayName);
				}
				this.profile = { ...this.profile, ...profile as Profile };
				this.loading = false;
			})
		} catch (error) {
			console.log(error);
			runInAction(() => this.loading = false);
		}
	}

	updateFollowing = async (username: string, following: boolean) => {
		this.loading = true;
		try {
			await agent.Profiles.updateFollowing(username);
			store.getTogetherStore.updateAttendeeFollowing(username);
			runInAction(() => {
				if (this.profile && this.profile.username !== store.userStore.user?.username && this.profile.username === username) {
					following ? this.profile.followersCount++ : this.profile.followersCount--;
					this.profile.following = !this.profile.following;
				}
				if (this.profile && this.profile.username === store.userStore.user?.username) {
					following ? this.profile.followingCount++ : this.profile.followingCount--;
				}
				this.followings.forEach(profile => {
					if (profile.username === username) {
						profile.following ? profile.followersCount-- : profile.followersCount++;
						profile.following = !profile.following;
					}
				})
				this.loading = false;
			})
		} catch (error) {
			console.log(error);
			runInAction(() => this.loading = false);
		}
	}

	loadFollowings = async (predicate:string) => {
		this.loadingFollowings = true;
		try {
			const result = await agent.Profiles.listFollowings(this.axiosParams(predicate));
			runInAction(() => {
				 this.followings = result.data;
				 this.loadingFollowings = false;
				 this.setPagination(result.pagination);
				 console.log(this.followings);
				
			})
		} catch (error) {
			runInAction(() => this.loadingFollowings = false);
		}
	}

	setPagination = (pagination:Pagination) =>{
		this.pagination = pagination;
	}

	
	axiosParams = (predicate:string) => {
		const params = new URLSearchParams();
		params.append("pageNumber", this.pagingParams.pageNumber.toString());
		params.append("pageSize", this.pagingParams.pageSize.toString());
		params.append("username",store.userStore.user!.username);
		params.append("predicate",predicate);
		return params;
	}

	loadUserGetTogethers = async (username: string, predicate?: string) => {
		this.loadingGetTogethers = true;
		try {
			const activities = await agent.Profiles.listActivities(username,
				predicate!);
			runInAction(() => {
				this.userGetTogethers = activities;
				this.loadingGetTogethers = false;
			})
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loadingGetTogethers = false;
			})
		}
	}

	uploadDocument = async (file: Blob) => {
		this.uploading = true;
		try {
			const response = await agent.Profiles.uploadDocument(file);
			const photo = response.data;
			runInAction(() => {
				if (this.profile) {
					this.profile.resumes?.push(photo);
				}
				this.uploading = false;
			})
		} catch (error) {
			console.log(error);
			runInAction(() => this.uploading = false);
		}
	}
	
	deleteDocument = async (resume: Resume) => {
		this.loading = true;
		try {
			await agent.Profiles.deleteResume(resume.id);
			runInAction(() => {
				if (this.profile) {
					this.profile.resumes = this.profile.resumes?.filter(p => p.id !== resume.id);
					this.loading = false;
				}
			})
		} catch (error) {
			runInAction(() => this.loading = false);
			console.log(error)
		}
	}

	loadJobs = async (username: string, predicate: string) => {		
		this.loadingJobs = true;
		try {
			const jobs = await agent.Profiles.listJobs(username, predicate!);
			runInAction(()=> {
				this.userJobs = jobs;
				this.loadingJobs = false;
			})

		} catch(error) {
			console.log(error);
			runInAction(()=> {
				this.loadingJobs = false;
			})
		}
	}
}

