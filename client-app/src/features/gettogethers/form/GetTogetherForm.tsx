import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import GetTogether from '../../../app/models/GetTogether';
import { useStore } from '../../../app/store/store';
import * as Yup from 'yup';
import { v4 as uuid } from "uuid";
import { Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Link } from 'react-router-dom';

export default function GetTogetherForm() {
    let history = useHistory();
    const { getTogetherStore } = useStore();
    const { createGetTogether, updateGetTogether, loading, loadGetTogether, loadingInitial } = getTogetherStore;
    const { id } = useParams<{ id: string }>();

    const [getTogether, setGetTogether] = useState<GetTogether>({
        id: '',
        title: '',
        description: '',
        date: null,
        link: '',
        passCode: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The getTogether title is required'),
        description: Yup.string().required('The getTogether description is required'),
        date: Yup.string().required('date is a required field').nullable(),
        link: Yup.string().required(),
        passCode: Yup.string().required()
    })

    useEffect(() => {
        if (id) loadGetTogether(id).then(getTogether => setGetTogether(getTogether!));
    }, [id, getTogether])

    function handleFormSubmit(getTogether: GetTogether) {
        if (getTogether.id.length === 0) {
            let newGetTogether = {
                ...getTogether,
                id: uuid()
            };
            createGetTogether(newGetTogether).then(() => history.push(`/getTogethers/${newGetTogether.id}`))
        } else {
            updateGetTogether(getTogether).then(() => history.push(`/getTogether/${getTogether.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            <Header content='GetTogether Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={getTogether}
                onSubmit={values => handleFormSubmit(values)} >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea rows={3} name='description' placeholder='Description' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='Time'
                            dateFormat='MMMM d, yyyy h:mm aa' />
                        <MyTextInput name='link' placeholder='Link' />
                        <MyTextInput name='passcode' placeholder='Passcode' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            floated='right'
                            positive type='submit'
                            content='Submit' />
                        <Button as={Link} to={`/getTogethers/${getTogether.id}`} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}