import { ErrorMessage, Form, Formik} from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/store/store"; 
import LoginForm from "./LoginForm"; 
import RenewPasswordForm from "./RenewPasswordForm";


export default observer(function ResetPasswordForm() {
    const { userStore, modalStore } = useStore();
    
    
    return (
        <Formik
            initialValues={{ email: "",error:null}}
            onSubmit={async (values,{setErrors}) =>{
                var isError = false;
                await userStore.sendOTP(values).catch(()=> {  
                    isError=true;                                 
                    setErrors({error:`We couldn't find an account associated with provided email. Please try with an alternate email.`});
                    
                });               
                if(!isError){ 
                    modalStore.openModal(<RenewPasswordForm/>);
                }
              
            }}
        >

            {({ handleSubmit,isSubmitting,errors}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <ErrorMessage 
                        name="error" render={() => 
                        <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error}/>}/>
                    <Header as="h2" content="Let's find your account" color="teal" textAlign='center'/>
                    <MyTextInput name="email" placeholder="Email address" />
                    <div className="reset-password-login-buttons">
                        <Button loading={isSubmitting} positive content="Submit" type="submit" fluid />
                        <p style={{ marginTop: 12, textAlign: "center"}}><a onClick={() => modalStore.openModal(<LoginForm/>)} style={{ textDecoration: "underline", cursor: "pointer"}}> Log in</a></p>
                    </div>
                </Form>
            )}

        </Formik>
    )
})

//