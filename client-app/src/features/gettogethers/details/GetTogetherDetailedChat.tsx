import React, { useEffect } from 'react';
import { Field, FieldProps, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Segment, Header, Comment, Form, Button, Loader, Item } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface Props {
    getTogetherId: string;
}

export default observer(function GetTogetherDetailedChat({ getTogetherId }: Props) {

    const { commentStore } = useStore();

    useEffect(() => {
        if (getTogetherId) {
            commentStore.createHubConnection(getTogetherId);
        }
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, getTogetherId]);

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached clearing>
                <Formik
                    onSubmit={(values, { resetForm }) =>
                        commentStore.addComment(values).then(() => resetForm())}
                    initialValues={{ body: '' }}
                    validationSchema={Yup.object({
                        body: Yup.string().required()
                    })}
                >
                    {({ isSubmitting, isValid, handleSubmit }) => (
                        <Form className='ui form'>
                            <Field name='body'>
                                {(props: FieldProps) => (
                                    <div style={{ position: 'relative' }}>
                                        <Loader active={isSubmitting} />
                                        <textarea
                                            placeholder='Enter your comment (Enter to submit, SHIFT + enter for new line)'
                                            rows={2}
                                            {...props.field}
                                            onKeyPress={e => {
                                                if (e.key === 'Enter' && e.shiftKey) {
                                                    return;
                                                }
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
                <Comment.Group style={{ overflowY: 'scroll', height: '32vh', paddingRight: '10px' }}>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                            {/* <Comment.Avatar src={comment.image || '/assets/user.png'} /> */}
                            <Item.Image 
                                style={{ float: 'left', marginRight: '10px', width: '40px', height: '40px', }}
                                src={comment.image || "/assets/user.png"}
                                circular
                                size='tiny'
                            />
                            <Comment.Content style={{ width: '82%', display: 'inline-block', flexWrap: 'wrap', wordWrap: 'break-word' }}>
                                <Comment.Author as={Link} to={`/profile/${comment.username}`} style={{ marginTop: '2px', width: '75%', flexWrap: 'wrap', wordWrap: 'break-word' }}>
                                    {comment.displayName}
                                </Comment.Author>
                                <br></br>
                                <Comment.Metadata style={{ marginLeft: '0', paddingLeft: '0'}}>
                                    <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                                </Comment.Metadata>
                                <Comment.Text style={{ whiteSpace: 'pre-wrap', marginRight: '1px'}}>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}
                </Comment.Group>
            </Segment>
        </>
    )
})