import { useState } from 'react';
import Styles from './ImgPicker.module.css';
import { useForm } from 'react-hook-form';

const ImgPicker = ({ selectedImage, setSelectedImage, event }) => {
    const { formState: { errors } } = useForm();
    const [uploading, setUploading] = useState(false);

    const handleImageChange = async (event) => {
        
        const file = event.target.files[0];
        const cloudinary_url = 'https://api.cloudinary.com/v1_1/lumatic/image/upload';
        const uploadPreset = 'uploadImagePrivate';
        const cloudinaryFolder = 'images';

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('folder', cloudinaryFolder);

        setUploading(true);

        try {
            const response = await fetch(cloudinary_url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error en la carga de la imagen');
            }

            const json = await response.json();
            const imageUrl = json.secure_url;
            setSelectedImage(imageUrl);
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={Styles.ImageContainer}>
            <img src={selectedImage || event.eventPicture} alt="Selected event" className={Styles.eventImage} />
            <div className={Styles.imagePicker}>
                <label htmlFor="image_file" className={Styles.labels}>Seleccionar una imagen</label>
                <input
                    id="image_file"
                    name="image_file"
                    type="file"
                    accept="image/*"
                    className={Styles.input}
                    onChange={handleImageChange}
                    disabled={uploading}
                />
                {errors.eventPicture && <p className={Styles.errors}>La imagen del evento es requerida</p>}
            </div>
            {uploading && <p className={Styles.uploading}>Subiendo imagen...</p>}
        </div>
    );
};

export default ImgPicker;
