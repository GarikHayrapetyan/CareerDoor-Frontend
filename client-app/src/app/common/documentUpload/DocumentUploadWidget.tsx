import React from "react";
import { Grid, Header } from "semantic-ui-react";
import LoadingComponent from "../../layout/LoadingComponent";
import DocumentWidgetDropzone from "./DocumentWidgetDropzone";

interface Props{
    uploadDocument: (file: Blob) => void;
    uploading: boolean
}

export default function DocumentUploadWidget({uploadDocument, uploading}:Props) {
    return (
        <Grid>
            <Grid.Column width={4}>
                <Header sub color="teal" content="Add Document"/>
                <DocumentWidgetDropzone uploadDocument={uploadDocument}/>
                {uploading && <LoadingComponent content="Uploading ..."/>}
            </Grid.Column>              
        </Grid>
    )
}