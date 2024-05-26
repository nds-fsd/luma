import Description from './Description/Description';
import ImgPicker from './ImgPicker/ImgPicker';
import Styles from './EventForm.module.css';

const EventForm = ({ onColorChange, backgroundColor, buttonColor }) => {
  return (
    <div className={Styles.formContainer}>
      <ImgPicker onColorChange={onColorChange} backgroundColor={backgroundColor} />
      <Description onColorChange={onColorChange} backgroundColor={backgroundColor} buttonColor={buttonColor} />
    </div>
  );
};

export default EventForm;
