import React, { useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";

import DocumentWidgetDropzone from "./DocumentWidgetDropzone";

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

export default function DocumentUploadWidget() {
    const [ isUploaded, setUploaded ] = useState(false);  

    const styles = {
        marginLeft: 'auto',
        marginRight: 'auto',   
        color:'teal'    
	}
    

    return (
        <>
        <Grid>
            <Grid.Column width={4}>
                <Header sub color="teal" content="Add Document"/>
                <DocumentWidgetDropzone setUploaded={setUploaded}/>
            </Grid.Column>              
        </Grid>
        {isUploaded &&
                <Header sub style={{...styles}}  content="Uploaded"/>}
        </>
    )
}