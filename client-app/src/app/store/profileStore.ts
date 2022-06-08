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
	followers: Profile[] = [];
	hostings: UserGetTogether [] = [];
	pasts: UserGetTogether [] = [];
	futures: UserGetTogether [] = [];
	generalMeetings: UserGetTogether [] = [];
	applieds: UserJob [] = [];
	employers: UserJob [] = [];
	generalJobs: UserJob [] = [];
	loadingFollowings = false;
	activeTab = 0;
	loadingGetTogethers = false;
	userJobs: UserJob[] = [];
	loadingJobs = false;
	pagination: Pagination | null = null;
	pagingParams = new PagingParams();
	predicate: string = '';
	once:boolean = false;


	constructor() {
		makeAutoObservable(this);

		reaction(
			() => this.activeTab,
			activeTab => {			
				
				if (activeTab === 4 || activeTab === 5) {
					this.predicate = activeTab === 4 ? 'followers' : 'following';
					this.pagingParams = new PagingParams();
					this.loadFollowings(this.predicate);
				
				} 
			}
		)
	}

	setOnce = (x:boolean) => {
		this.once = x;
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


				if(this.predicate=='followers'){
					this.followers.forEach(profile => {
						if (profile.username === username) {
							profile.following ? profile.followersCount-- : profile.followersCount++;
							profile.following = !profile.following;
						}
					})
				}else if(this.predicate=='following'){
					this.followings.forEach(profile => {
						if (profile.username === username) {
							profile.following ? profile.followersCount-- : profile.followersCount++;
							profile.following = !profile.following;
						}
					})
				}
			
				this.loading = false;
			})
		} catch (error) {
			console.log(error);
			runInAction(() => this.loading = false);
		}
	}

	loadFollowings = async (predicate: string) => {
		this.loadingFollowings = true;
		try {
			const result = await agent.Profiles.listFollowings(this.axiosParams(predicate));
			runInAction(() => {
				if (predicate == 'following') {
					this.followings.push(...result.data);
				} else if (predicate == 'followers') {
					this.followers.push(...result.data);
				}
				this.loadingFollowings = false;
				this.setPagination(result.pagination);
				console.log(this.followings);

			})
		} catch (error) {
			runInAction(() => this.loadingFollowings = false);
		}
	}

	setPagination = (pagination: Pagination) => {
		this.pagination = pagination;
	}

	emptyFollowings = () =>{
		this.followers = [];
		this.followings = [];
	}


	axiosParams = (predicate: string) => {
		if(this.profile!.followingCount <= this.pagingParams.pageSize && predicate=='following'){
			this.pagingParams.pageNumber = 1;
		}
		const params = new URLSearchParams();
		params.append("pageNumber", this.pagingParams.pageNumber.toString());
		params.append("pageSize", this.pagingParams.pageSize.toString());
		params.append("username", this.profile!.username);
		params.append("predicate", predicate);
		return params;
	}

	loadUserGetTogethers = async (predicate: string) => {
		this.loadingGetTogethers = true;
		try {
			const result = await agent.Profiles.listActivities(this.axiosParams(predicate));			
			runInAction(() => {
				if(predicate=="hosting"){
					this.hostings.push(...result.data)
				}else if(predicate=="past"){
					this.pasts.push(...result.data)
				}else{
					this.futures.push(...result.data)
				}			
				this.setMeeting(predicate);
				this.setPagination(result.pagination); 
				this.loadingGetTogethers = false;
			})
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loadingGetTogethers = false;
			})
		}
	}

	setMeeting = (tab:string) =>{
        if(tab=='future'){
            this.generalMeetings=this.futures;
        }else if (tab=='past'){
         this.generalMeetings=this.pasts;
        }else if (tab=='hosting'){
            this.generalMeetings=this.hostings;
        }
    }

	resetMeetings = () =>{
		this.pasts = [];
		this.futures = [];
		this.hostings = [];
		this.generalMeetings = [];
		this.pagingParams.pageNumber = 1;
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

	loadUserJobs = async (predicate: string) => {
		this.loadingJobs = true;
		try {
			const result = await agent.Profiles.listJobs(this.axiosParams(predicate));
			runInAction(() => {
				if(predicate=="applied"){
					this.applieds.push(...result.data)
				}else if(predicate=="employer"){
					this.employers.push(...result.data)
				}
				this.setJob(predicate);
				this.setPagination(result.pagination); 
				this.loadingJobs = false;
			})

		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loadingJobs = false;
			})
		}
	}

	
	setJob = (tab:string) =>{
        if(tab=='applied'){
            this.generalJobs=this.applieds;
        }else if (tab=='employer'){
         this.generalJobs=this.employers;
		}
    } 

	resetJobs = () =>{
		this.applieds = [];
		this.employers = [];
		this.generalJobs = [];
		this.pagingParams.pageNumber = 1;
	}

}

