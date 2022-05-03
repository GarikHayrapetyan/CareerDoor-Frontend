import { makeAutoObservable, runInAction } from 'mobx';
import { history } from '../..';
import agent from '../api/agent';
import { User, UserFormValues} from '../models/User';
import {EmailDto, ResetPasswordFormValues} from '../models/ResetPassword';
import { store } from './store';



export default class UserStore {
	user: User | null = null;
	emailDto:EmailDto | null = null;
	isSuccessfullReset:boolean = false;

	constructor() {
		makeAutoObservable(this);
		
	}

	get isLoggedIn() {
		return !!this.user;
	}

	sendOTP = async (creds: EmailDto) => {		
		try {
			this.emailDto = creds; 
			console.log("cred:"+creds.email);
			await agent.Account.sendOTP(creds);		
				
			
		} catch (error) {
			console.log("error:"+error);
			
			throw error;
		}
	}

	resetPassword = async (creds:ResetPasswordFormValues) => {
		try {
			console.log("Password:"+creds.newPassword);		
			creds.email = this.emailDto?.email;
			await agent.Account.resetPassword(creds);
		} catch (error) {
			console.log("errot:"+error);
			
			throw error;
		}
	}

	login = async (creds: UserFormValues) => {
		try {
			const user = await agent.Account.login(creds);
			store.commonStore.setToken(user.token);
			runInAction(() => (this.user = user));
			history.push('/meetings');
			store.modalStore.closeModal();
		} catch (error) {
			throw error;
		}
	};

	logout = () => {
		store.commonStore.setToken(null);
		window.localStorage.removeItem('jwt');
		this.user = null;
		history.push('/');
	};

	getUser = async () => {
		try {
			const user = await agent.Account.current();
			runInAction(() => (this.user = user));
		} catch (error) {
			console.log(error);
		}
	};

	register = async (creds: UserFormValues) => {
		try {
			const user = await agent.Account.register(creds);
			store.commonStore.setToken(user.token);
			runInAction(() => (this.user = user));
			history.push('/meetings');
			store.modalStore.closeModal();
		} catch (error) {
			throw error;
		}
	};

	setImage = (image: string) => {
		if (this.user) this.user.image = image;
	};

	setDisplayName = (name: string) => {
		if (this.user) this.user.displayName = name;
	};
}
