import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import {GetTogether, GetTogetherFormValues} from '../models/GetTogether';
import { format } from 'date-fns';
import { store } from './store';
import { Profile } from '../models/userProfile';
import { Pagination, PagingParams } from '../models/pagination';
import {reaction} from 'mobx'

export default class GetTogetherStore {
	getTogetherRegistry = new Map<string, GetTogether>();
	selectedGetTogether: GetTogether | undefined = undefined;
	editMode = false;
	loading = false;
	loadingInitial = false;
	pagination: Pagination | null = null;
	pagingParams = new PagingParams();
	predicate = new Map().set('all', true);
	searchGetTogetherTerm: string = "";
	searchGetTogetherResults: GetTogether[] | undefined = undefined;

	constructor() {
		makeAutoObservable(this);
		
		reaction(
			() => this.predicate.keys(),
			() => {
				this.pagingParams = new PagingParams();
				this.getTogetherRegistry.clear();
				this.loadingGetTogethers();
			}
		);
	}

	setPagingParams = (pagingParams: PagingParams) => {
		this.pagingParams = pagingParams;
	}

	setPredicate = (predicate: string, value: string | Date) => {
		const resetPredicate = () => {
			this.predicate.forEach((value, key) => {
				if(key !== 'startDate') this.predicate.delete(key);
			})
		}
		switch(predicate) {
			case 'all':
				resetPredicate();
				this.predicate.set('all', true);
				break;
			case 'isGoing':
				resetPredicate();
				this.predicate.set('isGoing', true);
				break;
			case 'isHost':
				resetPredicate();
				this.predicate.set('isHost', true);
				break;
			case 'startDate':
				this.predicate.delete('startDate');
				this.predicate.set('startDate', value);
		}
 	}	
 
	get axiosParams() {
		const params = new URLSearchParams();
		params.append('pageNumber', this.pagingParams.pageNumber.toString());
		params.append("pageSize", this.pagingParams.pageSize.toString());
		this.predicate.forEach((value, key) => {
			if(key === "startDate") {
				params.append(key, (value as Date).toISOString())
			} else {
				params.append(key, value);
			}
		})
		return params;
	}

	get getTogethersByDate() {
		return Array.from(this.getTogetherRegistry.values()).sort(
			(a, b) => a.date!.getTime() - b.date!.getTime()
		);
	}

	get groupedGetTogethers() {
		return Object.entries(
			(this.searchGetTogetherResults|| this.getTogethersByDate).reduce(
				(getTogethers, getTogether) => {
					const date = format(getTogether.date!, 'dd MMM yyyy');
					getTogethers[date] = getTogethers[date]
						? [ ...getTogethers[date], getTogether ]
						: [ getTogether ];
					return getTogethers;
				},
				{} as { [key: string]: GetTogether[] }
			)
		);
	}

	loadingGetTogethers = async () => {
		this.loadingInitial = true;
		try {
			const results = await agent.GetTogethers.list(this.axiosParams);
			results.data.forEach((getTogether) =>
				this.setGetTogether(getTogether)
			);
			this.setPagination(results.pagination)
			this.setLoadingInitial(false);
		} catch (error) {
			console.log(error);
			this.setLoadingInitial(false);
		}
	};

	setPagination = (pagination: Pagination) => {
		this.pagination = pagination;
	}

	
	loadGetTogether = async (id: string) => {
		let getTogether = this.getGetTogether(id);
		if (getTogether) {
			this.selectedGetTogether = getTogether;
			return getTogether;
		} else {
			this.loadingInitial = true;
			try {
				getTogether = await agent.GetTogethers.details(id);
				this.setGetTogether(getTogether);
				runInAction(() => {
					this.selectedGetTogether = getTogether;
				});
				this.setLoadingInitial(false);
				return getTogether;
			} catch (error) {
				console.log(error);
				this.setLoadingInitial(false);
			}
		}
	};

	private setGetTogether = (getTogether: GetTogether) => {
		const user = store.userStore.user;
		if (user) {
			getTogether.isGoing = getTogether.attendees!.some(
				(a) => a.username === user.username
			);
			getTogether.isHost = getTogether.hostUsername === user.username;
			getTogether.host = getTogether.attendees?.find(x => x.username === getTogether.hostUsername);
		}
		getTogether.date = new Date(getTogether.date!);
		this.getTogetherRegistry.set(getTogether.id, getTogether);
	};

	private getGetTogether = (id: string) => {
		return this.getTogetherRegistry.get(id);
	};

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};

	createGetTogether = async (getTogether: GetTogetherFormValues) => {
		const user = store.userStore.user;
		const attendee = new Profile(user!);
		try {
			await agent.GetTogethers.create(getTogether);
			const newGetTogether = new GetTogether(getTogether);
			newGetTogether.hostUsername = user!.username;
			newGetTogether.attendees = [attendee];
			this.setGetTogether(newGetTogether);
			runInAction(() => {
				this.selectedGetTogether = newGetTogether;
			});
		} catch (error) {
			console.log(error);
		}
	};

	updateGetTogether = async (getTogether: GetTogetherFormValues) => {
		try {
			await agent.GetTogethers.update(getTogether);
			runInAction(() => {
				if(getTogether.id) {
					 let updatedGetTogether = {...this.getGetTogether(getTogether.id), ...getTogether}
					 this.getTogetherRegistry.set(getTogether.id, updatedGetTogether as GetTogether);
					 this.selectedGetTogether = updatedGetTogether as GetTogether;
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	deleteGetTogether = async (id: string) => {
		this.loading = true;
		try {
			await agent.GetTogethers.delete(id);
			runInAction(() => {
				this.getTogetherRegistry.delete(id);
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	updateAttence = async () => {
		const user = store.userStore.user;
		this.loading = true;
		try {
			await agent.GetTogethers.attend(this.selectedGetTogether!.id);
			runInAction(() => {
				if(this.selectedGetTogether?.isGoing) {
					this.selectedGetTogether.attendees = 
						this.selectedGetTogether.attendees?.filter(a => a.username !== user?.username);
						this.selectedGetTogether.isGoing = false;
				} else {
					const attendee = new Profile(user!);
					//const attendee = new Profile(user!);
					this.selectedGetTogether?.attendees?.push(attendee);
					this.selectedGetTogether!.isGoing = true;
				}
				this.getTogetherRegistry.set(this.selectedGetTogether!.id, this.selectedGetTogether!)
			})
		} catch(error) {
			console.log(error);
		} finally {
			runInAction(()=> this.loading = false);
		}
	}
	
	cancelGetTogetherToggle = async () => {
		this.loading = true;
		await agent.GetTogethers.attend(this.selectedGetTogether!.id);
		try {
			this.selectedGetTogether!.isCancelled = !this.selectedGetTogether?.isCancelled;
			this.getTogetherRegistry.set(this.selectedGetTogether!.id, this.selectedGetTogether!);
		} catch(error) {
			console.log(error);
		} finally {
			runInAction(() => this.loading = false);
		}
	}

	updateAttendeeFollowing = (username: string) => {
        this.getTogetherRegistry.forEach(getTogether => {
            getTogether.attendees.forEach(attendee => {
                if (attendee.username === username) {
                    attendee.following ? attendee.followersCount-- : attendee.followersCount++;
                    attendee.following = !attendee.following;
                }
            })
        })
    }

	clearSelectedGetTogether = () => {
        this.selectedGetTogether = undefined;
    }

	selectGetTogether = (id: string) => {
		this.closeForm();
		this.selectedGetTogether = this.getTogetherRegistry.get(id);
	};

	cancelSelectedGetTogether = () => {
		this.selectedGetTogether = undefined;
	};

	openForm = (id?: string) => {
		id ? this.selectGetTogether(id) : this.cancelSelectedGetTogether();
		this.editMode = true;
	};

	closeForm = () => {
		this.editMode = false;
	};

	handleGetTogetherSearchTerm = (event:  React.ChangeEvent<HTMLInputElement>) => {
		this.searchGetTogetherTerm = event.target.value;
		this.searchGetTogetherResults = this.getSearchedGetTogethers();
	}

	private getSearchedGetTogethers() {
		if(this.searchGetTogetherTerm !== "") {
			const newSearchedGetTogethers = this.getTogethersByDate
				.filter(getTogether => {
				return getTogether.title
						.toLowerCase()
						.includes(this.searchGetTogetherTerm.toLowerCase());
				})
		return newSearchedGetTogethers;
		} else {
			return undefined;
		}
		
	}
}
