import React from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/store/store";
import LoginForm from "./LoginForm";

export default observer(function RenewPasswordForm() {
    const { userStore, modalStore } = useStore();
    return (
        <Formik
            initialValues={{otp: "", newPassword: "",error:null}}
            onSubmit={async (values, {setErrors}) => {           
                var isError = false;
                await userStore.resetPassword(values).catch((msg)=>{         
                    isError=true;            
                    setErrors({error:"Please make sure provided code is correct and new password is complex."})
                });
                if(!isError){ 
                    userStore.isSuccessfullReset=true;
                    modalStore.openModal(<LoginForm/>);
                }
            }}
        >
            
            {({ handleSubmit, isSubmitting,errors }) => (                
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <ErrorMessage 
                        name="error" render={() => 
                        <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error}/>}/>
                    <Header as="h2" content="We sent a code to your email" color="teal" textAlign='center' />
                    <p style={{color: "black"}}>Enter the 6-digit verification code sent to your email</p>
                    <MyTextInput name="otp" placeholder="Code" maxlength="6"/>
                    <MyTextInput name="newPassword" placeholder="New password" type='password' />                    
                    <Button loading={isSubmitting} positive content="Submit" type="submit" fluid />
                </Form>
            )}

        </Formik>
    )
})