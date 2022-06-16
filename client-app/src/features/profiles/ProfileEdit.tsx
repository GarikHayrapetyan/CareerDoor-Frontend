import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/store/store";
import * as Yup from 'yup';
interface Props {
    setEditMode: (editMode: boolean) => void;
}
export default observer(function ProfileEditForm({ setEditMode }: Props) {
    const { profileStore: { profile, updateProfile } } = useStore();
    return (
        <Formik
            initialValues={{
                displayName: profile?.displayName, 
                bio: profile?.bio,
                city: profile?.city,
                country: profile?.country
            }}
            onSubmit={values => {
                updateProfile(values).then(() => {
                    setEditMode(false);
                })
            }}
            validationSchema={Yup.object({
                displayName: Yup.string()
                .required("Display name is required.")
                .min(2,"Please provide at least 2 characters.")
                .max(40,"Length is limited up to 40 characters."),
                city: Yup.string()
                .required("City is required.")
                .min(2,"Please provide at least 2 characters.")
                .max(60,"Length is limited up to 60 characters."),
                country: Yup.string()
                .required("Country is required.")
                .min(2,"Please provide at least 2 characters.")
                .max(60,"Length is limited up to 60 characters."),
            })}
        >
            {({ isSubmitting, isValid, dirty }) => (
                <Form className='ui form'>
                    <MyTextInput placeholder='Display Name'
                        name='displayName' maxlength="41"/>
                    <MyTextInput placeholder='City'
                        name='city' maxlength="61"/>
                    <MyTextInput placeholder='Country'
                        name='country' maxlength="61"/>
                    <MyTextArea rows={10} placeholder='Add your bio'
                        name='bio' />
                    <Button
                        positive
                        type='submit'
                        loading={isSubmitting}
                        content='Update profile'
                        floated='right'
                        disabled={!isValid || !dirty}
                    />
                </Form>
            )}
        </Formik>
    )
})