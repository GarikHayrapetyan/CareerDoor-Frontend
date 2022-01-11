import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/store/store";
import * as Yup from 'yup'

export default observer(function RegisterForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ displayname: '', username: '', email: '', password: '', country:'',city:'', error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values).catch(error =>
                setErrors({ error: "Invalid email or password" }))}
                validationSchema={Yup.object({
                    displayname: Yup.string().required(),
                    username: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().required(),
                    country: Yup.string().required(),
                    city: Yup.string().required(),
                })}
        >

            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as="h2" content="Sign up to CareerDoor" color="teal" textAlign='center'/>
                    <MyTextInput name="displayname" placeholder="Display Name" />
                    <MyTextInput name="username" placeholder="Username" />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="country" placeholder="Country" />
                    <MyTextInput name="city" placeholder="City" />
                    <MyTextInput name="password" placeholder="Password" type='password' />
                    <ErrorMessage 
                        name="error" render={() => 
                        <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />}/>
                    <Button disabled={!isValid || !dirty || isSubmitting}
                     loading={isSubmitting} positive content="Register" type="submit" fluid />
                </Form>
            )}

        </Formik>
    )
})