import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import GetTogether from '../models/GetTogether';
import { User, UserFormValues } from '../models/User';
import { store } from '../store/store';

axios.defaults.baseURL = '/api';
// https://cors-anywhere.herokuapp.com/

axios.interceptors.request.use( config =>{
	const token = store.commonStore.token;
	if (token) config.headers.Authorization = `Bearer ${token}`

	return config;
})

const sleep = (delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
};

axios.interceptors.response.use(
	async (response) => {
		await sleep(1000);
		return response;
	},
	(error: AxiosError) => {
		const { data, status, config } = error.response!;

		switch (status) {
			case 400:
				if (typeof data === 'string') {
					toast.error('bad request');
				}
				if (
					config.method === 'get' &&
					data.errors.hasOwnProperty('id')
				) {
					toast.error('bad guid');
				}
				if (data.errors) {
					const modalStateErrors = [];
					for (const key in data.errors) {
						console.log('key:' + key);

						if (data.errors[key]) {
							modalStateErrors.push(data.errors[key]);
						}
					}
					toast.error('Validation Error');
					throw modalStateErrors.flat();
				}
				break;
			case 401:
				toast.error('Unauthorized');
				break;
			case 404:
				toast.error('Not Found');
				break;
			case 500:
				toast.error('Server error');
				break;
		}

		return Promise.reject(error);
	}
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

const GetTogethers = {
	list: requests.get<GetTogether[]>('/gettogether'),
	details: (id: string) => requests.get<GetTogether>(`/gettogether/${id}`),
	create: (meeting: GetTogether) => requests.post('/gettogether', meeting),
	update: (meeting: GetTogether) =>
		requests.put(`/gettogether/${meeting.id}`, meeting),
	delete: (id: string) => requests.del(`/gettogether/${id}`),
	attend: (id: string) => requests.post<void>(`/gettogether/${id}/attend`, {})
};

const Account = {
	current: ()=>requests.get<User>('/account'),
	login: (user: UserFormValues) => requests.post<User>('/account/login',user),
	register: (user: UserFormValues) => requests.post<User>('/account/register',user)
	
}
const agent = {
	GetTogethers,
	Account
};

export default agent;
