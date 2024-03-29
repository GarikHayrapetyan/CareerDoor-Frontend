import React, { SyntheticEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Header, Tab, Image, Grid, Button, List } from 'semantic-ui-react';
import { Profile, Resume } from '../../app/models/userProfile';
import { useStore } from '../../app/store/store';
import DocumentUploadWidget from '../../app/common/documentUpload/DocumentUploadWidget';
import { tmpdir } from 'os';
import { title } from 'process';

interface Props {
    profile: Profile;
}

export default observer(function ProfileDocuments({ profile }: Props) {

    const { profileStore: { isCurrentUser, loading, deleteDocument, uploadDocument, uploading,isMoreThanMaxDoc } } = useStore();
    const [addDocumentMode, setAddDocumentMode] = useState(false);
    const [target, setTarget] = useState('');

    const onDownload = (url: string) => {
        const downloadFlag = "upload/fl_attachment/";
        var tmp = url.split("upload/")
        var downloadUrl = tmp[0] + downloadFlag + tmp[1];

        const link = document.createElement("a");
        link.setAttribute('target', '_blank');
        link.href = downloadUrl;
        link.click();
    }
    const onOpen = (url: string) => {
        const link = document.createElement("a");
        link.setAttribute('target', '_blank');
        link.href = url;
        link.click();
    }

    const handleFileName = (fileName: string) => {
        var tmp = fileName;
        if (fileName && fileName.length > 20) {
            tmp = fileName.substring(0, 15) + "...";
        }

        return tmp;
    }

    function handleDeleteDocument(resume: Resume, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deleteDocument(resume);
    }

    function handleUploadDocument(file: Blob) {
        uploadDocument(file).then(() => setAddDocumentMode(false));
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon="file" content="Documents" />
                    {isCurrentUser && (
                        <Button floated='right' basic
                            content={addDocumentMode ? "Cancel" : 'Add Document'}
                            onClick={() => setAddDocumentMode(!addDocumentMode)}
                            disabled={isMoreThanMaxDoc}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addDocumentMode ? (
                        <DocumentUploadWidget uploadDocument={handleUploadDocument} uploading={uploading} />
                    ) : (
                        <List relaxed divided>
                            {profile.resumes?.map(resume => (
                                <List.Item key={resume.id} style={{padding:'10px'}} >
                                    <Image avatar src={'/assets/file.jpg'} title={resume.fileName} onClick = {()=>{onOpen(resume.url)}}/>
                                    <List.Content onClick = {()=>{onOpen(resume.url)}}>
                                        <List.Header as="h4" content={handleFileName(resume.fileName)} textAlign='center'/>
                                    </List.Content>
                                    <Button.Group style={{ position: 'absolute', right: '30px'}}>
                                    <Button                                          
                                            basic
                                            color="green"
                                            icon='download'
                                            loading={target === (resume.id+"1") && loading}
                                            onClick={() => onDownload(resume.url)}
                                            name={(resume.id+"1")}
                                            floated="right"/>
                                     {isCurrentUser && (
                                        <Button                                         
                                            basic
                                            color="red"
                                            icon='trash'
                                            loading={target === resume.id && loading}
                                            onClick={e => handleDeleteDocument(resume, e)}
                                            name={resume.id}
                                            floated="right"
                                        />
                                        
                                    )} 
                                   
                                        </Button.Group>
                                </List.Item>
                            ))}
                        </List>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )

})
