import React from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/store/store";
import ResetPasswordForm from "./ResetPasswordForm";

export default observer(function LoginForm() {
    const { userStore, modalStore } = useStore();
    return (
        <Formik
            initialValues={{ email: "", password: "", error: null }}
            onSubmit={(values, { setErrors }) => userStore.login(values).catch(error =>
                setErrors({ error: "Invalid email or password" }))}
        >

            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as="h2" content="Login to CareerDoor" color="teal" textAlign='center'/>
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type='password' />
                    <ErrorMessage 
                        name="error" render={() => 
                        <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />}/>
                    <Button loading={isSubmitting} positive content="Login" type="submit" fluid />
                    <p style={{ marginTop: 12, textAlign: "center"}}>Forgot password? Reset it <a onClick={() => modalStore.openModal(<ResetPasswordForm/>)} style={{ textDecoration: "underline", cursor: "pointer"}}>here</a>!</p>
                </Form>
            )}

        </Formik>
    )
})