import Description from "./Description/Description";
import ImgPicker from "./ImgPicker/ImgPicker";
import Styles from './EditEventForm.module.css'

const EditEventForm = ({ event, selectedImage, setSelectedImage }) => {

    return (
        <div className={Styles.formContainer}>
            <ImgPicker
               selectedImage={selectedImage}
               setSelectedImage={setSelectedImage} 
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