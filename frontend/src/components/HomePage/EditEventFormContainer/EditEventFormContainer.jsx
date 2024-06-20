import { useEffect, useState } from 'react';
import Styles from './EditEventFormContainer.module.css'
import EditEventForm from './EditEventForm/EditEventForm';
import { useLocation } from 'react-router-dom';

const EditEventFormContainer = () => {



    return (
        <div className={Styles.container} >
            <EditEventForm
            />
        </div>
    )
}
export default EditEventFormContainer;