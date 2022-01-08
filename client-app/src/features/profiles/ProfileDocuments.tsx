import React from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Header, Tab, Image } from 'semantic-ui-react';
import { Profile } from '../../app/models/userProfile';

interface Props {
    profile: Profile;
}

export default observer(function ProfileDocuments({ profile }: Props) {

    return (
        <Tab.Pane>
            <Header icon="file" content="Documents" />
            <Card.Group itemsPerRow={10}>
                {profile.resumes?.map(resume => (
                    <Card>
                        <Image src={'/assets/file.jpg'} />
                    </Card>
                ))}

            </Card.Group>
        </Tab.Pane>
    )

})