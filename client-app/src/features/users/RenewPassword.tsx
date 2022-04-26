import React from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";

export default observer(function LoginForm() {
    return (
        <Formik
            initialValues={{ code: "", newPassword: "", error: null }}
            onSubmit={() => console.log("Submitted")}
        >

            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as="h2" content="Enter your new Password" color="teal" textAlign='center' />
                    <MyTextInput name="code" placeholder="Code" />
                    <MyTextInput name="newPassoord" placeholder="New password" type='password' />
                    <ErrorMessage
                        name="error" render={() =>
                            <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />} />
                    <Button loading={isSubmitting} positive content="Submit New Password" type="submit" fluid />
                </Form>
            )}

        </Formik>
    )
})