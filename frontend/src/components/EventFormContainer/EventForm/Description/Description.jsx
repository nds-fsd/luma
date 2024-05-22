import { useState } from 'react';
import Styles from './Description.module.css';
import { useForm } from "react-hook-form";
import api from '../../../../utils/api'
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

const Description = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [showQuantityInput, setShowQuantityInput] = useState(false)

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useState(null);

    const getCities = async () => {
        const res = await api.get('/city');
        return res.data;
    };

    const { data: cities, isLoading, isError, error } = useQuery('City', getCities);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const handleRadioChange = (event) => {
        if (event.target.value === "definir_cantidad") {
            setShowQuantityInput(true);
        } else {
            setShowQuantityInput(false);
        }
    };

    const onSubmit = async (data) => {
        console.log({ ...data, eventCapacity: parseInt(data.eventCapacity), eventPrice: parseInt(data.eventPrice) })
        console.log("EVENT DATE", data.eventDate)
        try {
            const response = await api.post('/events', { ...data, eventCapacity: parseInt(data.eventCapacity), eventPrice: parseInt(data.eventPrice) });
            navigate('/homepage');
        } catch (error) {
            console.error('Error while sending the POST request', error)
        }
    }

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
                            {cities.map((city, index) => (<option key={index} value={city._id}>{city.cityName}</option>))}

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
                    <input type="submit" value="CREAR EVENTO" className={Styles.inputSubmit} />

                </div>

            </form>

        </div>
    )
}

export default Description;