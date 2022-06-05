import { makeAutoObservable, runInAction } from 'mobx';
import { format } from 'date-fns';
import agent from '../api/agent';
import { Job, JobFormValues } from '../models/job';
import { Pagination, PagingParams } from '../models/pagination';
import { Profile } from '../models/userProfile';
import { store } from './store';
import React, { SyntheticEvent } from 'react';
import { DropdownProps } from 'semantic-ui-react';

export default class JobStore {
	jobRegistry = new Map<string, Job>();
	selectedJob: Job | undefined = undefined;
	loadingInitial = false;
	loading = false;
	editMode = false;
	pagination: Pagination | null = null;
	pagingParams = new PagingParams();
	searchKeyWord: string = "";
	filterByTypeKeyWord: any = "";
	filterByPostedDateKeyWord: any = ""

	constructor() {
		makeAutoObservable(this);
	}

	setPagingParams = (pagingParams: PagingParams) => {
		this.pagingParams = pagingParams;
	}

	get axiosParams() {
		const params = new URLSearchParams();
		params.append('pageNumber', this.pagingParams.pageNumber.toString());
		params.append('pageSize', this.pagingParams.pageSize.toString());
		return params;
	}

	get jobsByDate() {
		return Array.from(this.jobRegistry.values()).sort((a,b)=> 
			a.date!.getTime() - b.date!.getTime());
	}

	get groupedJobs(){
		return Object.entries(
			this.jobsByDate.reduce((jobs, job) => {
				const date = format(job.date!, 'dd MMM yyyy');
				jobs[date] = jobs[date] ? [...jobs[date], job] : [job];
				return jobs;
			}, {} as {[key: string]: Job[]})
		)
	}
 
	loadJobs = async () => {
		this.loadingInitial = true;
 		try {
			const results = await agent.Jobs.list(this.axiosParams);
			results.data.forEach((job) => {			
				this.setJob(job);
			});
			this.setPagination(results.pagination);
			this.setLoadingInitial(false);
		} catch (err) {
			this.setLoadingInitial(false);
			console.log(err);
		}
	};

	setPagination = (pagination: Pagination) => {
		this.pagination = pagination;
	}

	loadJob = async (id: string) => {
		let job = this.getJob(id);
		if(job) {
			this.selectedJob = job;
		} else {
			this.loadingInitial = true;
			try {
				job = await agent.Jobs.details(id);
				this.setJob(job);
				this.selectedJob = job;
				this.setLoadingInitial(false);
			} catch(err) {
				console.log(err)
				this.setLoadingInitial(false);
			}
		}
	}

	private setJob = (job: Job) => {
		const user = store.userStore.user;
		if(user) {
			job.isGoing = job.candidates!.some(
				a => a.username === user.username
			);
			job.isEmployeer = job.employeerUsername === user.username;
			job.employeer = job.candidates?.find(x => x.username === job.employeerUsername);
		}
		job.date = new Date(job.date!);
		this.jobRegistry.set(job.id, job)
	}

	private getJob = (id: string) => {
		return this.jobRegistry.get(id);
	}
	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};

	selectJob = (id: string) => {
		this.closeForm();
		this.selectedJob = this.jobRegistry.get(id);
	};

	cancelSelectedJob = () => {
		this.selectedJob = undefined;
	};

	openForm = (id?: string) => {
		id ? this.selectJob(id) : this.cancelSelectedJob();
		this.editMode = true;
	};

	closeForm = () => {
		this.editMode = false;
	};

	createJob = async (job: JobFormValues) => {
		this.loading = true;
		const user = store.userStore.user;
		const candidate = new Profile(user!);
		try {
			await agent.Jobs.create(job);
				const newJob = new Job(job);
				newJob.employeerUsername = user!.username;
				newJob.candidates = [candidate]
				this.setJob(newJob);
				runInAction(() => {
					this.selectedJob = newJob;
					//this.jobRegistry.set(newJob.id, newJob);
					this.closeForm();
					this.loading = false;
				})
		} catch (err) {
			console.log(err);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	updateJob = async (job: JobFormValues) => {
		this.loading = true;
		try {
			await agent.Jobs.update(job);
			runInAction(() => {
				if(job.id) {
					let updatedJob = {...this.getJob(job.id), ...job}
					this.jobRegistry.set(job.id, updatedJob as Job);
					this.selectedJob = updatedJob as Job;
					this.closeForm();
					this.loading = false;
				}
			});
		} catch (err) {
			console.log(err);
			runInAction(() => {
				this.closeForm();
				this.loading = false;
			});
		}
	};

	deleteJob = async (id: string) => {
		this.loading = true;
		try {
			await agent.Jobs.delete(id);
			runInAction(() => {
				this.jobRegistry.delete(id);
				if (this.selectedJob?.id === id) this.cancelSelectedJob();
				this.editMode = false;
				this.loading = false;
			});
		} catch (err) {
			console.log(err);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	updateCandidates = async () => {
		const user = store.userStore.user;
		this.loading = true;
		try {
				await agent.Jobs.attend(this.selectedJob!.id);
				runInAction(() => {
					if(this.selectedJob?.isGoing) {
						this.selectedJob.candidates = 
						this.selectedJob.candidates?.filter(a => a.username !== user?.username);
						this.selectedJob.isGoing = false;
					} else {
						const candidate = new Profile(user!);
						this.selectedJob?.candidates?.push(candidate);
						this.selectedJob!.isGoing = true;
					}
					this.jobRegistry.set(this.selectedJob!.id, this.selectedJob!)
				})
			} catch(err) {
			console.log(err);
		} finally {
			runInAction(() => this.loading = false);
		}

	}

	setSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.searchKeyWord = event.target.value;
	}

	setFilterByJobType = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
		this.filterByTypeKeyWord = data.value; 
	}

	setFilterByPostedDate = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
		this.filterByPostedDateKeyWord = data.value; 
	}
}
