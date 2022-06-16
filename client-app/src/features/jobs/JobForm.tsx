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
import { typeOptions, experienceOptions } from '../../app/common/options/typeOptions';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup'

function JobForm() {
    const { jobStore } = useStore();
    const { selectedJob, closeForm, createJob, updateJob, loading, deleteJob } = jobStore;
    const [target, setTarget] = React.useState("");

    const initialState = {
        id: "",
        title: '',
        type: '',
        experience: '',
        description: '',
        company: '',
        functionality: '',
        industry: '',
        location: '',
        expiration: null,
        employeeCount: '',
    }
    const [job, setJob] = React.useState<JobFormValues>(initialState);
    React.useEffect(() => {
        if (selectedJob) {
            setJob(selectedJob);
        } else {
            setJob(initialState);
        }
    }, [selectedJob])

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is a required field').min(3, "Title must be 3 words at least").max(18, "Title cannot exceed 18 words"),
        type: Yup.string().required('Type is a required field'),
        experience: Yup.string().required('Experience is a required field'),
        description: Yup.string().required('Description is a required field').min(110, "Description cannot be less than 110 words"),
        company: Yup.string().required('Company is a required field').max(40, "Company cannot exceed 40 words"),
        functionality: Yup.string().required('Functionality is a required field').max(20, "Functionality cannot exceed 20 words"),
        industry: Yup.string().required('Industry is a required field').max(30, "Industry cannot exceed 30 words"),
        location: Yup.string().required('Location is a required field').max(30, "Location cannot exceed 30 words"),
        date: Yup.string().required("Date is required!").nullable(),
        employeeCount: Yup.string().required('Employee Count is a required field').max(30, "Employee cannot exceed 30 words").matches(/^[1-9]\d*$/, "Must be only positive numbers"),
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
                experience,
                description,
                company,
                functionality,
                industry,
                location,
                expiration,
                employeeCount } = job;
            const editedJob = {
                id,
                title,
                type,
                experience,
                description,
                company,
                functionality,
                industry,
                location,
                expiration,
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
                        <MyTextInput name='title' placeholder='Title' maxlength="18" />
                        <MySelectInput option={typeOptions} placeholder="Type" name='type' />
                        <MySelectInput option={experienceOptions} placeholder="Experience" name='experience' />
                        <MyTextArea rows={8} placeholder="Description" name='description' minlength="300" />
                        <MyTextInput placeholder="Company Name" name='company' maxlength="40" />
                        <MyTextInput placeholder="Functionality" name='functionality' maxlength="20" />
                        <MyTextInput placeholder="Industry" name='industry' maxlength="30" />
                        <MyTextInput placeholder="Location" name='location' maxlength="30" />
                        <MyDateInput
                            minDate={new Date()}
                            placeholderText="Expiry Date"
                            name="date"
                            showTimeSelect
                            timeCaption="Time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                        <MyTextInput placeholder="Employees" name='employeeCount' maxlength="30" />
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
