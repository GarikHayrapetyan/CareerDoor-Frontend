import { Profile } from './Profile';
export default interface GetTogether {
	id: string;
	title: string;
	description: string;
	date: Date | null;
	link: string;
	passCode: string;
	hostUsername?: string;
	isCancelled?: boolean;
	isGoing?: boolean;
	isHost?: boolean;
	host?: Profile;
	attendees?: Profile[];
};
