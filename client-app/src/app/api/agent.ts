import axios, { AxiosResponse } from 'axios';
import GetTogether from '../models/GetTogether';


axios.defaults.baseURL ="http://localhost:23050/api";
// https://cors-anywhere.herokuapp.com/

const responseBody = <T>(response:AxiosResponse<T>)=>response.data;

const requests={
    get:<T>(url:string)=>axios.get<T>(url).then(responseBody),
    post:(url:string,body:{})=>axios.post(url,body).then(responseBody),
    put:(url:string,body:{})=>axios.put(url,body).then(responseBody),
    del:(url:string)=>axios.delete(url).then(responseBody),
}

const GetTogethers={
    list:requests.get<GetTogether[]>('/gettogether'),
    details:(id:string)=>requests.get<GetTogether>(`/gettogether/${id}`),
    create:(meeting:GetTogether)=>requests.post('/gettogether',meeting),
    update:(meeting:GetTogether)=>requests.put(`/gettogether/${meeting.id}`,meeting),
    delete:(id:string) => requests.del(`/gettogether/${id}`)
}

const agent = {
    GetTogethers
}

export default agent;