import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'

function GetTogetherDetailedSidebar() {
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                3 People Going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    <Item style={{ position: 'relative' }}>
                        <Label
                            style={{ position: 'absolute' }}
                            color='orange'
                            ribbon='right'
                        >
                            Host
                        </Label>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <span >Bob</span >
                            </Item.Header>
                            <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item style={{ position: 'relative' }}>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <span>Tom</span>
                            </Item.Header>
                            <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item style={{ position: 'relative' }}>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <span>Sally</span>
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </List>
            </Segment>
        </>

    )
}

export default GetTogetherDetailedSidebar;