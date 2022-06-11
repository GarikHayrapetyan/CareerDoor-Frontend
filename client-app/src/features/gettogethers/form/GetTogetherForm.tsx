import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import { Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { GetTogetherFormValues } from '../../../app/models/GetTogether';

export default function GetTogetherForm() {
	let history = useHistory();
	const { getTogetherStore } = useStore();
	const {
		createGetTogether,
		updateGetTogether,
		loadGetTogether,
		loadingInitial
	} = getTogetherStore;
	const { id } = useParams<{ id: string }>();

	const [ meeting, setMeeting ] = useState<GetTogetherFormValues>(
		new GetTogetherFormValues()
	);

	const validationSchema = Yup.object({
		title: Yup.string().required('Title is a required field'),
		description: Yup.string().required('Description is a required field'),
		date: Yup.string().required('Date is a required field').nullable(),
		link: Yup.string().required('Link is a required field'),
		passCode: Yup.string().required('Passcode is a required field')
	});

	useEffect(
		() => {
			if (id)
				loadGetTogether(id).then((meeting) =>
					setMeeting(new GetTogetherFormValues(meeting!))
				);
		},
		[ id, loadGetTogether ]
	);

	function handleFormSubmit(meeting: GetTogetherFormValues) {
		if (!meeting.id) {
			let newMeeting = {
				...meeting,
				id: uuid()
			};
			createGetTogether(newMeeting).then(() =>
				history.push(`/meetings/${newMeeting.id}`)
			);
		} else {
			updateGetTogether(meeting).then(() =>
				history.push(`/meetings/${meeting.id}`)
			);
		}
	}

	if (loadingInitial)
		return <LoadingComponent content="Loading meeting..." />;

	return (
		<Segment clearing>
			<Header content="Meeting Details" sub color="teal" />
			<Formik
				validationSchema={validationSchema}
				enableReinitialize
				initialValues={meeting}
				onSubmit={(values) => handleFormSubmit(values)}
			>
				{({ handleSubmit, isValid, isSubmitting, dirty }) => (
					<Form
						className="ui form"
						onSubmit={handleSubmit}
						autoComplete="off"
					>
						<MyTextInput name="title" placeholder="Title" maxlength='60'/>
						<MyTextArea
							rows={3}
							name="description"
							placeholder="Description"
						/>
						{/* <MyDateInput
							placeholderText="Date"
							name="date"
							showTimeSelect
							timeCaption="Time"
							dateFormat="MMMM d, yyyy h:mm aa"
						/> */}
						<MyDateInput
							minDate={new Date()}
							placeholderText="Date"
							name="date"
							showTimeSelect
							timeCaption="Time"
							dateFormat="MMMM d, yyyy h:mm aa"
						/>
						<MyTextInput name="link" placeholder="Link" maxlength='160'/>
						<MyTextInput name="passCode" placeholder="Passcode" maxlength='50' />
						<Button
							disabled={isSubmitting || !dirty || !isValid}
							loading={isSubmitting}
							floated="right"
							positive
							type="submit"
							content="Submit"
						/>
						<Button
							as={Link}
							to={`/meetings/`}
							floated="right"
							type="button"
							content="Cancel"
						/>
					</Form>
				)}
			</Formik>
		</Segment>
	);
}
