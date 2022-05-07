import { Profile } from './userProfile';

export interface Job {
	id: string;
	title: string;
	type: string;
	description: string;
	Function: string;
	company: string;
	industry: string;
	location: string;
	date: Date | null;
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
	description: string = '';
	company: string = '';
	Function: string = '';
	industry: string = '';
	location: string = '';
	date: Date | null = null;
	employeeCount: string = '';

	constructor(job?: JobFormValues) {
		if (job) {
			this.id = job.id;
			this.title = job.title;
			this.type = job.type;
			this.description = job.description;
			this.company = job.company;
			this.Function = job.Function;
			this.industry = job.industry;
			this.location = job.location;
			this.date = job.date;
			this.employeeCount = job.employeeCount;
		}
	}
}
