import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { Header } from 'semantic-ui-react'
import { useStore } from '../../../app/store/store'
import GetTogetherListItem from './GetTogetherListItem'

export default observer(function GetTogetherList() {
    const { getTogetherStore } = useStore()
    const { groupedGetTogethers } = getTogetherStore;

    return (
        <>
            {groupedGetTogethers.map(([group, getTogethers]) => (
                <Fragment key={group}>
                    <Header as='h4' content={group} color='teal' />
                    {getTogethers.map((getTogether) => (
                        <GetTogetherListItem
                            meeting={getTogether} />
                    ))}
                </Fragment>

            ))}

        </>


    )
})