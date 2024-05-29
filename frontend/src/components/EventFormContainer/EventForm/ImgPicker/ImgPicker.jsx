import Styles from './ImgPicker.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ImgPicker = ({selectedImage, setSelectedImage}) => {

    const {formState: { errors } } = useForm();

    //  const handleImageClick = (imageUrl, color) => {
    //      setSelectedImage(imageUrl);
    //      onColorChange(color)

    //  }

    const handleImageChange = (event) => {
        const base64Url = event.target.value;
        if (base64Url.startsWith("data:image")) {
            setSelectedImage(base64Url);
        } else {
            console.error("Invalid base64 image URL");
        }
    };

    return (
        <div className={Styles.ImageContainer}>
            <img src={selectedImage} alt="Selected event" className={Styles.eventImage} />
            <div className={Styles.imagePicker}>
                <label htmlFor="texty" className={Styles.labels}>Seleccionar una imagen</label>
                <input
                    type="text"
                    className={Styles.input}
                    onChange={handleImageChange}
                />
                {errors.eventPicture && <p className={Styles.errors}>La imagen del evento es requerida</p>}
            </div>
        </div>
  );
};

export default ImgPicker;
