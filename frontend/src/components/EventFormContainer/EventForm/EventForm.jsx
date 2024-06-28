import Description from './Description/Description';
import ImgPicker from './ImgPicker/ImgPicker';
import Styles from './EventForm.module.css';
import { useState } from 'react';
import Lumatic from '../../../images/lumatic.ico';

const EventForm = ({ userId, isAuthenticated }) => {
  const [selectedImage, setSelectedImage] = useState(Lumatic);

  return (
    <div className={Styles.formContainer}>

      <ImgPicker
        isAuthenticated={isAuthenticated}
        userId={userId}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <Description
        userId={userId}
        isAuthenticated={isAuthenticated}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

export default EventForm;
