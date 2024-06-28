import Styles from './ImgPicker.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ImgPicker = ({ selectedImage, setSelectedImage }) => {
    const { formState: { errors } } = useForm();
    const [uploading, setUploading] = useState(false);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);

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
                const errorResponse = await response.json();
                console.error('Respuesta de error de Cloudinary:', errorResponse);
                throw new Error('Error en la carga de la imagen');
            }

            const json = await response.json();
            const imageUrl = json.secure_url;

            console.log('Respuesta exitosa de Cloudinary:', json);
            setSelectedImage(imageUrl);
            
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={Styles.imageContainer}>
            {selectedImage && <img src={selectedImage} alt="Selected event" className={Styles.eventImage} />}
            <div className={Styles.imagePicker}>
                <label htmlFor="image_file" className={Styles.customFileUpload}>
                    Seleccionar archivo
                </label>
                <input
                    id="image_file"
                    name='image_file'
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
