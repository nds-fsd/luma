import { useEffect, useState } from 'react';
import Styles from './Description.module.css';
import { useForm } from "react-hook-form";
import { api } from '../../../../../../utils/api';
import { useNavigate } from 'react-router-dom';

const Description = ({ event, selectedImage }) => {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const [cities, setCities] = useState([]);
    const [loadingCities, setLoadingCities] = useState(true);
    const [showQuantityInput, setShowQuantityInput] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await api().get('/city');
                setCities(res.data);
                reset(...res.data, { "eventLocation": event.eventLocation.cityName });
            } catch (error) {
                console.error('Error fetching cities:', error);
            } finally {
                setLoadingCities(false);
            }
        };
        fetchCities();
    }, []);

    useEffect(() => {
        if (event) {
            setValue('eventDate', event.eventDate?.split('T')[0] || '');
            setValue('eventStartTime', event.eventStartTime || '');
            setValue('eventEndTime', event.eventEndTime || '');
            setValue('eventTitle', event.eventTitle || '');
            setValue('eventDescription', event.eventDescription || '');
            setValue('eventLocation', event.eventLocation.cityName || '');
            setValue('eventPrice', event.eventPrice || '');

            if (event.eventCapacity && event.eventCapacity !== 'ilimitado' && event.eventCapacity !== -1) {
                setShowQuantityInput(true);
                setValue('eventCapacity', 'quantity');
                setValue('eventCapacity1', event.eventCapacity || 1);
            } else {
                setShowQuantityInput(false);
                setValue('eventCapacity', 'ilimitado');
            }
        }
    }, [event, setValue]);

    const handleRadioChange = (event) => {
        if (event.target.value === "quantity") {
            setShowQuantityInput(true);
        } else {
            setShowQuantityInput(false);
            setValue('eventCapacity1', '');
        }
    };

    const onSubmit = async (data) => {

        const { cityLogo, cityWallpaper, ...eventDataToSend } = data;
        
        const eventData = {
            ...eventDataToSend,
            eventCapacity: data.eventCapacity === 'ilimitado' ? -1 : parseInt(data.eventCapacity1),
            eventPrice: parseInt(data.eventPrice),
            eventPicture: selectedImage
        };
        console.log('eventData: ', eventData);

        try {
            await api().patch(`/events/${event._id}`, eventData);
            navigate('/home');
        } catch (error) {
            console.error('Error al enviar la solicitud PATCH', error);
        }
    };

    return (
        <div className={Styles.descriptionContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={Styles.formContainer}>
                <div className={Styles.dateContainer}>
                    <div className={Styles.dateTime}>
                        <label htmlFor="date" className={Styles.labels}>Fecha del evento</label>
                        <input type="date" {...register("eventDate", { required: true })} className={Styles.inputDate} />
                    </div>
                    <div className={Styles.dateTime}>
                        <label htmlFor="date" className={Styles.labels}>Hora de comienzo</label>
                        <input type="time" {...register("eventStartTime", { required: true })} className={Styles.inputTime} />
                    </div>
                    <div className={Styles.dateTime}>
                        <label htmlFor="date" className={Styles.labels}>Hora de finalización</label>
                        <input type="time" {...register("eventEndTime", { required: true })} className={Styles.inputTime} />
                    </div>
                </div>
                {errors.eventDate && <p className={Styles.errors}>La fecha del evento es requerida</p>}
                {errors.eventStartTime && <p className={Styles.errors}>La hora de comienzo del evento es requerida</p>}
                {errors.eventEndTime && <p className={Styles.errors}>La hora de finalización del evento es requerida</p>}
                <div className={Styles.divContainer}>
                    <input type="text" placeholder={"Título del evento"} {...register("eventTitle", { required: true })} className={Styles.inputTitle} />
                </div>
                {errors.eventTitle && <p className={Styles.errors}>El título del evento es requerido</p>}
                <div className={Styles.divContainer}>
                    <textarea
                        {...register("eventDescription")}
                        placeholder="Descripción del evento"
                        className={Styles.inputDescription}
                    />
                </div>
                <div className={Styles.priceLocation}>
                    <div className={Styles.divContainer}>
                        <label htmlFor="number" className={Styles.labels}>Localización</label>
                        <select
                            name="eventLocation"
                            className={Styles.inputLocation}
                            {...register("eventLocation", { required: true })}
                            disabled={loadingCities}
                        >
                            {loadingCities ? (
                                <option>Cargando ciudades...</option>
                            ) : (
                                cities.map((city, index) => (
                                    <option key={index} value={city._id} selected={city.cityName === event.eventLocation.cityName}>
                                        {city.cityName}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                    <div className={Styles.divContainer}>
                        <label htmlFor="number" className={Styles.labels}>Precio de la entrada</label>
                        <input
                            type="number"
                            min="0"
                            {...register("eventPrice", { min: 0, required: true })}
                            className={Styles.inputPrice}
                        /> €
                    </div>
                </div>
                {errors.eventPrice && <p className={Styles.errors}>El precio de la entrada es requerido</p>}
                <div className={Styles.capacityContainer}>
                    <label className={Styles.labels}>Capacidad</label>
                    <div>
                        <input
                            type="radio"
                            id="ilimitado"
                            value="ilimitado"
                            {...register("eventCapacity")}
                            onChange={handleRadioChange}
                            checked={!showQuantityInput}
                            className={Styles.radio}
                        />
                        <label htmlFor="ilimitado" className={Styles.labels}>Ilimitado</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="quantity"
                            value="quantity"
                            {...register("eventCapacity")}
                            onChange={handleRadioChange}
                            checked={showQuantityInput}
                            className={Styles.radio}
                        />
                        <label htmlFor="quantity" className={Styles.labels}>Establecer límite</label>
                    </div>
                    {showQuantityInput && (
                        <input
                            className={Styles.inputPrice}
                            type="number"
                            min="1"
                            {...register("eventCapacity1", { min: 1 }, { required: true })}
                        />
                    )}
                </div>
                {errors.eventCapacity && <p className={Styles.errors}>Se debe establecer la capacidad del evento</p>}
                <div className={Styles.divContainer}>
                    <input type="submit" value="ACTUALIZAR EVENTO" className={Styles.inputSubmit} />
                </div>
            </form>
        </div>
    );
};

export default Description;
