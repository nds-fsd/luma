import Description from "./Description/Description";
import ImgPicker from "./ImgPicker/ImgPicker";
import Styles from './EditEventForm.module.css'

const EditEventForm = ({ onColorChange, backgroundColor, buttonColor, event }) => {

    return (
        <div className={Styles.formContainer}>
            <ImgPicker
                onColorChange={onColorChange}
                backgroundColor={backgroundColor}
            />
            <Description
                onColorChange={onColorChange}
                backgroundColor={backgroundColor}
                buttonColor={buttonColor}
                event={event}
            />
        </div>
    )
}

export default EditEventForm;