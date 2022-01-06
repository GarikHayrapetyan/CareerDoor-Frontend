import { User } from './User';

export interface Profile {
	username: string;
	displayName: string;
	image?: string;
	bio?: string;
	country: string;
	city: string;
	followersCount: number;
	followingCount: number;
	following: boolean;
	photos?: Photo[];
}

export class Profile implements Profile {
	constructor(user: User) {
		this.username = user.username;
		this.displayName = user.displayName;
		this.image = user.image;
		this.country = user.country; 
		this.city = user.city; 
	}
}

export interface Photo {
	id: string;
	url: string;
	isMain: boolean;
}

export interface UserGetTogether {
	id: string;
	title: string;
	date: Date;
}
