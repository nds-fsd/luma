import { useState, useEffect } from 'react';
import Styles from './Description.module.css';
import { useForm } from 'react-hook-form';
import { api } from '../../../../utils/api';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

const Description = ({ selectedImage, userId }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showQuantityInput, setShowQuantityInput] = useState(false);
    const [cities, setCities] = useState([]);
    const [loadingCities, setLoadingCities] = useState(true);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            const fetchCities = async () => {
                try {
                    const res = await api().get('/city');
                    setCities(res.data);
                } catch (error) {
                    console.error('Error fetching cities:', error);
                } finally {
                    setLoadingCities(false);
                }
            };
            fetchCities();
        }
    }, [userId]);

  const handleRadioChange = (event) => {
    setShowQuantityInput(event.target.value === 'quantity');
  };

    const onSubmit = async (data) => {
        const eventData = {
            ...data,
            eventCapacity: data.eventCapacity === 'ilimitado' ? -1 : parseInt(data.eventCapacity),
            eventPrice: parseInt(data.eventPrice),
            owner: userId,
            eventPicture: selectedImage
        };
        try {
            await api().post('/events', eventData);
            navigate('/home');
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else {
                console.error('Error while sending the POST request', error);
            }
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
                                    <option key={index} value={city._id}>{city.cityName}</option>
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
                    <label htmlFor="ilimitado" className={Styles.labels}>Capacidad</label>
                    <div className={Styles.capacityBorder}>
                        <div>
                            <input
                                type="radio"
                                id="ilimitado"
                                value='ilimitado'
                                {...register("eventCapacity")}
                                checked={!showQuantityInput}
                                onChange={handleRadioChange}
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
                                id='capacity'
                                min="1"
                                {...register("eventCapacity", { min: 1 }, { required: true })}
                            />
                        )}
                    </div>
                </div>
                {errors.eventCapacity && <p className={Styles.errors}>Se debe establecer la capacidad del evento</p>}
                <div className={Styles.divContainer}>
                    <input type="submit" value="CREAR EVENTO" className={Styles.inputSubmit} />
                </div>
            </form>
        </div>
    );
};

export default Description;
