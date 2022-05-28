import React, { Fragment } from 'react'
import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/store/store'

export default observer(function GetTogetherFilter() {
    const { getTogetherStore: { predicate, setPredicate } } = useStore();
    return (
        <Fragment >
            <Menu vertical size='large' style={{ width: '24%', marginTop: 30, top: "198px", position: "fixed" }}>
                <Header icon='filter' attached content='Filters' color='teal' />
                <Menu.Item
                    content='All meetings'
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')}
                />
                <Menu.Item
                    content="I'm going"
                    active={predicate.has('isGoing')}
                    onClick={() => setPredicate('isGoing', 'true')}
                />
                <Menu.Item
                    content="I'm hosting"
                    active={predicate.has('isHost')}
                    onClick={() => setPredicate('isHost', 'true')}
                />
            </Menu>
            <Header />
            <Menu style={{ width: '24%', marginTop: 30, top: "400px", position: "fixed" }}>
                <Calendar
                className='cal'
                onChange={(date) => setPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || new Date()}
            /></Menu>
        </Fragment>
    )
})