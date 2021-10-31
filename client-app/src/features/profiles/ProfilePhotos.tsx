import React, {useState} from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import { Profile } from '../../app/models/userProfile';
import { useStore } from '../../app/store/store';
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget';

interface Props {
	profile: Profile;
}
export default observer(function ProfilePhotos({ profile }: Props) {
    const {profileStore: {isCurrentUser}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
	return (
		<Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
			        <Header icon="image" content="Photos" />
                    {isCurrentUser && (
                        <Button floated='right' basic
                            content={addPhotoMode ? "Cancel" : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget />
                    ): (
                    <Card.Group itemsPerRow={5}>
                        {profile.photos?.map(photo => (
                        <Card key={photo.id}>
					     <Image src={photo.url} />
				        </Card>
                     ))}
		        	</Card.Group>
                    )}
                </Grid.Column>
            </Grid>
		</Tab.Pane>
	);
});
