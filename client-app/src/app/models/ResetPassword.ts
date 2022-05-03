export interface ResetPasswordFormValues{
    otp:string, 
    email?:string,
    newPassword:string
}

export interface EmailDto {
    email:string;
}