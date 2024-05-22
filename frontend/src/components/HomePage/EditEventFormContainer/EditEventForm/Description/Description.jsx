import { useEffect, useState } from 'react';
import Styles from './Description.module.css';
import { useForm } from "react-hook-form";
import api from '../../../../../utils/api'
import { useNavigate } from 'react-router-dom';

const Description = ({ event }) => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const [showQuantityInput, setShowQuantityInput] = useState(false)

    const handleRadioChange = (event) => {
        if (event.target.value === "definir_cantidad") {
            setShowQuantityInput(true);
        } else {
            setShowQuantityInput(false);
        }
    };

    useEffect(() => {
        if (event) {
            setValue('eventDate', event.eventDate.split('T')[0]);
            setValue('eventStartTime', event.eventStartTime);
            setValue('eventEndTime', event.eventEndTime);
            setValue('eventTitle', event.eventTitle);
            setValue('eventDescription', event.eventDescription);
            setValue('eventLocation', event.eventLocation);
            setValue('eventPrice', event.eventPrice);
            
            if (event.eventCapacity && event.eventCapacity !== 'ilimitado') {
                setShowQuantityInput(true);
                setValue('eventCapacity', event.eventCapacity);
            }
        }
    }, [event, setValue]);

        const onSubmit = async (data) => {
            const eventData = {
                ...data,
                eventCapacity: parseInt(data.eventCapacity) || 'ilimitado',  
                eventPrice: parseInt(data.eventPrice)
            };

            console.log(eventData)
                
            try {
                const response = await api.patch(`/events/${event._id}`, eventData);
                navigate('/homepage');
            } catch (error) {
                console.error('Error al enviar la solicitud PATCH', error);
            }
        };    

    return (
        <div className={Styles.descriptionContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={Styles.formContainer}>
                <div className={Styles.dateContainer}>
                    <div className={Styles.dateTime}>
                        <label htmlFor="date" className={Styles.labels}>Fecha del evento </label>
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
                {errors.eventEndTime && <p className={Styles.errors}>La hora de finalizacioón del evento es requerida</p>}
                <div className={Styles.divContainer}>
                    <input type="text" placeholder={"Título del evento"} {...register("eventTitle", { required: true })} className={Styles.inputTitle} />
                </div>
                {errors.eventTitle && <p className={Styles.errors}>El título del evento es requerido</p>}
                <div className={Styles.divContainer}>
                    <textarea
                        {...register("eventDescription")}
                        placeholder="Descripción del evento"
                        className={Styles.inputDescription}
                    />                </div>
                <div className={Styles.priceLocation}>
                    <div className={Styles.divContainer}>
                        <label htmlFor="number" className={Styles.labels}>Localización</label>
                        <select
                            name="eventLocation"
                            className={Styles.inputLocation}
                            onChange={(e) => {
                                register('eventLocation', { required: true });
                            }}
                        >
                            <option value="barcelona">Barcelona</option>
                            <option value="madrid">Madrid</option>
                            <option value="valencia">Valencia</option>
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
                    <div>
                        <input
                            type="radio"
                            id="ilimitado"
                            value="ilimitado"
                            {...register("eventCapacity")}
                            onChange={handleRadioChange}
                            className={Styles.radio}
                        />
                        <label htmlFor="ilimitado" className={Styles.labels}>Ilimitado</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            id="definir_cantidad"
                            value="definir_cantidad"
                            {...register("eventCapacity")}
                            onChange={handleRadioChange}
                            checked={showQuantityInput}
                            className={Styles.radio}
                        />
                        <label htmlFor="definir_cantidad" className={Styles.labels}>Establecer límite</label>
                    </div>

                    {showQuantityInput && (
                        <input
                            className={Styles.inputPrice}
                            type="number"
                            min="1"
                            {...register("eventCapacity", { min: 1 }, { required: true })}
                        />
                    )}
                </div>
                {errors.eventCapacity && <p className={Styles.errors}>Se debe establecer la capacidad del evento</p>}
                <div className={Styles.divContainer}>
                    <input type="submit" value="ACTUALIZAR EVENTO" className={Styles.inputSubmit} />

                </div>

            </form>

        </div>
    )
}

export default Description;