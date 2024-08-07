import Description from './Description/Description';
import ImgPicker from './ImgPicker/ImgPicker';
import Styles from './EventForm.module.css';
import { useState } from 'react';
import Lumatic from '../../../images/lumatic.ico';

const EventForm = () => {
  const [selectedImage, setSelectedImage] = useState(Lumatic);

  return (
    <div className={Styles.formContainer}>

      <ImgPicker
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <Description
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

export default EventForm;
