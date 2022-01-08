import React from "react";
import { Grid, Header } from "semantic-ui-react";

export default function DocumentUploadWidget() {
    return (
        <Grid>
            <Grid.Column width={4}>
                <Header sub color="teal" content="Add Document"/>
            </Grid.Column>
        </Grid>
    )
}