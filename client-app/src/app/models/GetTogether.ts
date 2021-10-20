import { Profile } from './userProfile';

export interface GetTogether {
	id: string;
	title: string;
	description: string;
	date: Date | null;
	link: string;
	passCode: string;
	hostUsername: string;
	isCancelled: boolean;
	isGoing: boolean;
	isHost: boolean;
	host?: Profile;
	attendees: Profile[];
};
export class GetTogether implements GetTogether {
	constructor(init?: GetTogetherFormValues) {
		Object.assign(this, init);
	}
}

export class GetTogetherFormValues {
	id?: string = undefined;
	title: string = '';
	description: string = '';
	date: Date | null = null;
	link: string = '';
	passCode: string = '';

	constructor(getTogether?: GetTogetherFormValues) {
		if (getTogether) {
			this.id = getTogether.id;
			this.title = getTogether.title;
			this.description = getTogether.description;
			this.date = getTogether.date;
			this.link = getTogether.link;
			this.passCode = getTogether.passCode;
		}
	}
}
