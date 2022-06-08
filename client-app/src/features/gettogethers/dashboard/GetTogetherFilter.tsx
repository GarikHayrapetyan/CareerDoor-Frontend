import React, { Fragment } from 'react'
import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/store/store'

export default observer(function GetTogetherFilter() {
    const { getTogetherStore: { predicate, setPredicate } } = useStore();
    return (
        <Fragment >
            <Menu vertical size='large' style={{ width: '100%', marginTop: 30 }}>
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
            <Menu vertical size='large' style={{ width: '100%', marginTop: 30 }}>
                <Calendar
                    className='cal'
                    onChange={(date) => setPredicate('startDate', date as Date)}
                    value={predicate.get('startDate') || new Date()}
                    minDate={new Date()}
                /></Menu>
        </Fragment>
    )
})