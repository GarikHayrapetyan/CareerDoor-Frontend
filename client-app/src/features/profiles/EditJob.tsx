import React from 'react'
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/store/store'

import ProfileJobDetail from './ProfileJobDetail';
import JobForm from '../jobs/JobForm';

function EditJob() {
    const { jobStore } = useStore()
    const { editMode, } = jobStore;


    return editMode ? <JobForm isItFromJopPage={true} /> : <ProfileJobDetail />

}

export default observer(EditJob);
