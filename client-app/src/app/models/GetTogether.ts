import { Profile } from './Profile';
export default interface GetTogether {
	id: string;
	title: string;
	description: string;
	date: Date | null;
	link: string;
	passCode: string;
	hostUsername?: boolean;
	isCancelled?: boolean;
	attendees?: Profile[];
};
