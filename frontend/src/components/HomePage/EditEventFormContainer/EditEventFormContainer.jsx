import { useEffect, useState } from 'react';
import Styles from './EditEventFormContainer.module.css'
import EditEventForm from './EditEventForm/EditEventForm';
import { useLocation } from 'react-router-dom';

const EditEventFormContainer = () => {

const location= useLocation();
const event = location.state?.event;
const [selectedImage, setSelectedImage] = useState('');
    
useEffect(() => {
    if (event && event.eventPicture) {
        setSelectedImage(event.eventPicture);
    }
}, [event]);

    return (
        <div className={Styles.container} >
            <EditEventForm
                event={event}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
            />
        </div>
    )
}
export default EditEventFormContainer;