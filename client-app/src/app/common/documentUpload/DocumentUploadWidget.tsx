import React, { useState } from "react";
import { Grid, Header } from "semantic-ui-react";
import DocumentWidgetDropzone from "./DocumentWidgetDropzone";

export default function DocumentUploadWidget() {
    const [ isUploaded, setUploaded ] = useState(false);    

    return (
        <>
        <Grid>
            <Grid.Column width={4}>
                <Header sub color="teal" content="Add Document"/>
                <DocumentWidgetDropzone setUploaded={setUploaded}/>
            </Grid.Column>              
        </Grid>
        {isUploaded &&
                <Header sub color={'teal'}  content="Uploaded"/>}
        </>
    )
}