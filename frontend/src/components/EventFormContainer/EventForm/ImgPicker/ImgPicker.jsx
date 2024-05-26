import party from './party.png';
import birthday from './birthday.png';
import christmas from './christmas.png';
import green from './green.png';
import halloween from './halloween.png';
import Styles from './ImgPicker.module.css';
import { useState } from 'react';

const ImgPicker = ({ onColorChange, backgroundColor }) => {
  const [selectedImage, setSelectedImage] = useState(party);

  const handleImageClick = (imageUrl, color) => {
    setSelectedImage(imageUrl);
    onColorChange(color);
  };
  return (
    <div className={Styles.ImageContainer}>
      <img src={selectedImage} alt='Imagen de fiesta' className={Styles.eventImage} />
      <div className={Styles.imagePicker}>
        <div onClick={() => handleImageClick(party, 'violet')}>
          <img src={party} alt='Imagen de fiesta' className={Styles.imgSelect} />
        </div>
        <div onClick={() => handleImageClick(birthday, 'pink')}>
          <img src={birthday} alt='Imagen de fiesta' className={Styles.imgSelect} />
        </div>
        <div onClick={() => handleImageClick(christmas, 'gold')}>
          <img src={christmas} alt='Imagen de fiesta' className={Styles.imgSelect} />
        </div>
        <div onClick={() => handleImageClick(halloween, 'orange')}>
          <img src={halloween} alt='Imagen de fiesta' className={Styles.imgSelect} />
        </div>
        <div onClick={() => handleImageClick(green, 'green')}>
          <img src={green} alt='Imagen de fiesta' className={Styles.imgSelect} />
        </div>
      </div>
    </div>
  );
};

export default ImgPicker;
