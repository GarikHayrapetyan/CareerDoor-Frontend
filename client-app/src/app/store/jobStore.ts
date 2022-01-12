import { makeAutoObservable, runInAction, reaction } from 'mobx';
import agent from '../api/agent';
import { Job, JobFormValues } from '../models/job';
import { Profile } from '../models/userProfile';
import { store } from './store';

export default class JobStore {
	jobRegistry = new Map<string, Job>();
	selectedJob: Job | undefined = undefined;
	loadingInitial = false;
	loading = false;
	editMode = false;

	constructor() {
		makeAutoObservable(this);
	}

	get jobsByDate() {
		return Array.from(this.jobRegistry.values()).sort((a,b)=> 
			a.date!.getTime() - b.date!.getTime());
	}
	loadJobs = async () => {
		this.loadingInitial = true;
 		try {
			const jobs = await agent.Jobs.list();
			jobs.forEach((job) => {
				this.setJob(job);
			});
			this.setLoadingInitial(false);
		} catch (err) {
			this.setLoadingInitial(false);
			console.log(err);
		}
	};

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
}
