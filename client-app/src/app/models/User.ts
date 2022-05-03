export interface User {
    username: string;
    displayName: string;
    token: string;
    image?: string;
    country:string;
    city:string;
}

export interface UserFormValues{
    email:string;
    password:string;
    displayName?:string;
    username?:string;
    city?:string;
    country?:string;
}

