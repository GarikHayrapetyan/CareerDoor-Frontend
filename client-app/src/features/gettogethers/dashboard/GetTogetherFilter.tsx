import React, { Fragment } from 'react'
import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'

export default function GetTogetherFilter() {
    return(
        <Fragment >
            <Menu vertical size='large' style={{width: '100%', marginTop: 30}}>
                <Header icon='filter' attached content='Filters' color='teal' />
                <Menu.Item content='All meetings'/>
                <Menu.Item content="I'm going"/>
                <Menu.Item content="I'm hosting"/>
            </Menu>
            <Header />
            <Calendar className='cal'/>
        </Fragment>
    )
}