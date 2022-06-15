import { Profile } from './userProfile';

export interface Job {
	id: string;
	title: string;
	type: string;
	experience: string;
	description: string;
	functionality: string;
	company: string;
	industry: string;
	location: string;
	creation: Date;
	expiration: Date;
	employeeCount: string;
	employeerUsername: string;
	isCanceled: boolean;
	isGoing?: boolean;
	isEmployeer?: boolean;
	employeer?: Profile;
	candidates: Profile[];
}

export class Job implements Job {
	constructor(init?: JobFormValues) {
		Object.assign(this, init);
	}
}

export class JobFormValues {
	id?: string = undefined;
	title: string = '';
	type: string = '';
	experience: string = '';
	description: string = '';
	company: string = '';
	functionality: string = '';
	industry: string = '';
	location: string = '';
	expiration: Date | null = null;
	employeeCount: string = '';

	constructor(job?: JobFormValues) {
		if (job) {
			this.id = job.id;
			this.title = job.title;
			this.type = job.type;
			this.experience = job.experience;
			this.description = job.description;
			this.company = job.company;
			this.functionality = job.functionality;
			this.industry = job.industry;
			this.location = job.location;
			this.expiration = job.expiration;
			this.employeeCount = job.employeeCount;
		}
	}
}
