import { useEffect, useState } from "react";
import Description from "./Description/Description";
import ImgPicker from "./ImgPicker/ImgPicker";
import Styles from './EditEventForm.module.css';
import { useLocation } from "react-router-dom";

const EditEventForm = () => {

    const location= useLocation();
    const event = location.state?.event;
    const [selectedImage, setSelectedImage] = useState('');
        
    useEffect(() => {
        if (event && event.eventPicture) {
            setSelectedImage(event.eventPicture);
        }
    }, [event]);

    return (
        <div className={Styles.formContainer}>
            <ImgPicker
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                event={event}
            />
            <Description
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                event={event}
            />
        </div>
    )
}

export default EditEventForm;

