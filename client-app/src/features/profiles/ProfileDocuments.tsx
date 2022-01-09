import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Header, Tab, Image, Grid, Button } from 'semantic-ui-react';
import { Profile } from '../../app/models/userProfile';
import { useStore } from '../../app/store/store';
import DocumentUploadWidget from '../../app/common/documentUpload/DocumentUploadWidget';
import { tmpdir } from 'os';
import { title } from 'process';

interface Props {
    profile: Profile;
}

export default observer(function ProfileDocuments({ profile }: Props) {

    const { profileStore: { isCurrentUser} } = useStore();
    const [addDocumentMode, setAddDocumentMode] = useState(false);

    const onDownload = (url:string) => {
        const downloadFlag = "upload/fl_attachment/";
        var tmp = url.split("upload/")
        var downloadUrl = tmp[0]+downloadFlag+tmp[1];  

        const link = document.createElement("a");
        link.setAttribute('target', '_blank');
        link.href = downloadUrl;
        link.click();
    }

    const handleFileName = (fileName:string)=>{
        var tmp = fileName;
        if (fileName && fileName.length>20) {
            tmp = fileName.substring(0,15)+"...";
        }

        return tmp;
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width='16'>
                    <Header floated='left' icon="file" content="Documents" />
                    {isCurrentUser && (
                        <Button floated='right' basic
                            content={addDocumentMode ? "Cancel" : 'Add Document'}
                            onClick={() => setAddDocumentMode(!addDocumentMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addDocumentMode ? (
                        <DocumentUploadWidget/>
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile.resumes?.map(resume => (
                                <Card key={resume.id}>
                                    <Image src={'/assets/file.jpg'} onClick={()=>{onDownload(resume.url)}} title={resume.fileName}/>
                                    <Header as="h5" content={()=>{handleFileName(resume.fileName)}}/>
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>


        </Tab.Pane>
    )

})