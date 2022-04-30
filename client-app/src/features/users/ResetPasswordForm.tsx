import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/store/store"; 
import LoginForm from "./LoginForm"; 
import RenewPassword from "./RenewPassword";

export default observer(function ResetPasswordForm() {
    const { userStore, modalStore } = useStore();
    return (
        <Formik
            initialValues={{ email: "", error: null }}
            onSubmit={values => console.log(values)}
        >

            {({ handleSubmit}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as="h2" content="Let's find your account" color="teal" textAlign='center'/>
                    <MyTextInput name="email" placeholder="Email address" />
                    <div className="reset-password-login-buttons">
                        <Button onClick={() => modalStore.openModal(<RenewPassword/>)} positive content="Submit" type="submit" fluid />
                        <p style={{ marginTop: 12, textAlign: "center"}}><a onClick={() => modalStore.openModal(<LoginForm/>)} style={{ textDecoration: "underline", cursor: "pointer"}}> Log in</a></p>
                    </div>
                </Form>
            )}

        </Formik>
    )
})