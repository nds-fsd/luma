import Description from "./Description/Description";
import ImgPicker from "./ImgPicker/ImgPicker";
import Styles from './EventForm.module.css'

const EventForm = ({ onColorChange, backgroundColor, buttonColor, userId, isAuthenticated }) => {

    return (
        <div className={Styles.formContainer}>
            <ImgPicker
                onColorChange={onColorChange}
                backgroundColor={backgroundColor}
                isAuthenticated={isAuthenticated}
                userId={userId}
            />
            <Description
                onColorChange={onColorChange}
                backgroundColor={backgroundColor}
                buttonColor={buttonColor}
                userId={userId}
                isAuthenticated={isAuthenticated}
            />
        </div>
    )
}

export default EventForm;