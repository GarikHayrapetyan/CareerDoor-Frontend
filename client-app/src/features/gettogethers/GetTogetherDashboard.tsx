import React, { useEffect } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import GetTogetherList from './GetTogetherList'
import GetTogetherFilter from './GetTogetherFilter'
import { useStore } from '../../app/store/store'
import { observer } from 'mobx-react-lite'

export default observer(function GetTogetherDashboard (){
    const {getTogetherStore} = useStore()
    const {loadingGetTogethers,getTogetherRegistry} = getTogetherStore

    useEffect(()=>{
        if (getTogetherRegistry.size <=1 ){
            loadingGetTogethers()
        }
                
    },[loadingGetTogethers,getTogetherRegistry])
    return(
            <Grid>
                <GridColumn width={8} style={{marginRight:'10em'}} >
                    <GetTogetherList />
                </GridColumn>
                <GridColumn width={6} >
                    <GetTogetherFilter />
                </GridColumn>
            </Grid> 
    )
})