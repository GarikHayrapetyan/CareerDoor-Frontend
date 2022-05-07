import React, { SyntheticEvent } from 'react'
import { Button, Header, Segment } from 'semantic-ui-react'
import { useStore } from '../../app/store/store'
import { observer } from 'mobx-react-lite';
import { JobFormValues } from '../../app/models/job';
import { Formik, Form } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';
import MyTextArea from '../../app/common/form/MyTextArea';
import MySelectInput from '../../app/common/form/MySelectInput';
import MyDateInput from '../../app/common/form/MyDateInput';
import { typeOptions } from '../../app/common/options/typeOptions';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup'

function JobForm() {
    const { jobStore } = useStore();
    const { selectedJob, closeForm, createJob, updateJob, loading, deleteJob } = jobStore;
    const [target, setTarget] = React.useState("");

    const initialState = selectedJob ?? {
        id: "",
        title: '',
        type: '',
        description: '',
        company: '',
        Function: '',
        industry: '',
        location: '',
        date: null,
        employeeCount: '',
    }
    const [job, setJob] = React.useState<JobFormValues>(initialState);

    const validationSchema = Yup.object({
        title: Yup.string().required('The job title is required!'),
        type: Yup.string().required(),
        description: Yup.string().required(),
        company: Yup.string().required(),
        Function: Yup.string().required(),
        industry: Yup.string().required(),
        location: Yup.string().required(),
        date: Yup.string().required("Date is required!").nullable(),
        employeeCount: Yup.string().required(),
    })

    function handleDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteJob(id);
    }

    function handleFormSubmit(job: JobFormValues) {
        if (job.id) {
            const { id,
                title,
                type,
                description,
                company,
                Function,
                industry,
                location,
                date,
                employeeCount } = job;
            const editedJob = {
                id,
                title,
                type,
                description,
                company,
                Function,
                industry,
                location,
                date,
                employeeCount
            }
            updateJob(editedJob);
        } else {
            let newJob = {
                ...job,
                id: uuid()
            }
            createJob(newJob);
        }
    }

    return (
        <Segment clearing>
            <Header content="Job Details" sub color='teal' />
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={job} onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MySelectInput option={typeOptions} placeholder="Type" name='type' />
                        <MyTextArea rows={8} placeholder="Description" name='description' />
                        <MyTextInput placeholder="Company Name" name='company' />
                        <MyTextInput placeholder="Function" name='Function' />
                        <MyTextInput placeholder="Industry" name='industry' />
                        <MyTextInput placeholder="Location" name='location' />
                        <MyDateInput
                            placeholderText="Date"
                            name="date"
                            showTimeSelect
                            timeCaption="Time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                        <MyTextInput placeholder="Employees" name='employeeCount' />
                        {selectedJob?.isEmployeer && <Button
                            name={job.id}
                            loading={loading && target === job.id}
                            floated='left'
                            content="Delete"
                            color="red"
                            onClick={(e) => handleDelete(e, selectedJob!.id)}
                        />}
                        <Button disabled={isSubmitting || !dirty || !isValid} laoding={loading} floated="right" positive type="submit" content="Submit" />
                        <Button onClick={closeForm} floated="right" type='button' content="Cancel" />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}
export default observer(JobForm);
