import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Header, Tab, Image, Grid, Button } from 'semantic-ui-react';
import { Profile } from '../../app/models/userProfile';
import { useStore } from '../../app/store/store';
import DocumentUploadWidget from '../../app/common/documentUpload/DocumentUploadWidget';

interface Props {
    profile: Profile;
}

export default observer(function ProfileDocuments({ profile }: Props) {

    const { profileStore: { isCurrentUser } } = useStore();
    const [addDocumentMode, setAddDocumentMode] = useState(false);

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header icon="file" content="Documents" />
                    {isCurrentUser && (
                        <Button floated='right' basic
                            content={addDocumentMode ? "Cancel" : 'Add Photo'}
                            onClick={() => setAddDocumentMode(!addDocumentMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addDocumentMode ? (
                        <DocumentUploadWidget/>
                    ) : (
                        <Card.Group itemsPerRow={10}>
                            {profile.resumes?.map(resume => (
                                <Card>
                                    <Image src={'/assets/file.jpg'} />
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>


        </Tab.Pane>
    )

})