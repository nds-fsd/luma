import { useState } from 'react';
import Styles from './Description.module.css';
import { useForm } from "react-hook-form";
import api from '../../../utils/api'

const Description = ({ buttonColor }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [showQuantityInput, setShowQuantityInput] = useState(false)

    const handleRadioChange = (event) => {
        if (event.target.value === "definir_cantidad") {
            setShowQuantityInput(true);
        } else {
            setShowQuantityInput(false);
        }
    };

    //http://localhost:3001/api/events
    const onSubmit = async (data) => {
        console.log({ ...data, eventCapacity: parseInt(data.eventCapacity), eventPrice: parseInt(data.eventPrice) })
        console.log("EVENT DATE", data.eventDate)
        try {
            const response = await api.post('/events', {...data, eventCapacity: parseInt(data.eventCapacity), eventPrice: parseInt(data.eventPrice)});

        } catch (error) {
            console.error('Error while sending the POST request', error)
        }
    }

    return (
        <div className={Styles.descriptionContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={Styles.formContainer}>
                <div className={Styles.dateContainer}>
                    <label htmlFor="date" className={Styles.labels}>Fecha del evento </label>
                    <input type="date" {...register("eventDate", { required: true })} className={Styles.inputDate} />
                </div>
                {/* {errors.creationDate && <p className={Styles.labels}>La fecha del evento es requerida</p>} */}
                <div className={Styles.divContainer}>
                    <input type="text" placeholder={"Título del evento"} {...register("eventTitle", { required: true })} className={Styles.inputTitle} />
                </div>
                <div className={Styles.divContainer}>
                    <textarea
                        {...register("eventDescription")}
                        placeholder="Descripción del evento"
                        className={Styles.inputDescription}
                    />                </div>

                <div className={Styles.divContainer}>
                    <label htmlFor="number" className={Styles.labels}>Precio de la entrada</label>
                    <input
                        type="number"
                        min="0"
                        {...register("eventPrice", { min: 0, required: true })}
                        className={Styles.inputPrice}
                    /> €
                </div>
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
                            className={Styles.radio}
                        />
                        <label htmlFor="definir_cantidad" className={Styles.labels}>Establecer límite</label>
                    </div>

                    {showQuantityInput && (
                        <input
                            className={Styles.inputPrice}
                            type="number"
                            min="1"
                            {...register("eventCapacity", { min: 1 })} // Aplica validación de mínimo 1
                        />
                    )}

                    {/* Muestra error si la cantidad es requerida y no está definida */}
                    {errors.eventCapacity && <p className={Styles.error}>La cantidad es requerida</p>}
                </div>

                <div className={Styles.divContainer}>
                    <input type="submit" value="Crear evento" className={Styles.inputSubmit} style={{ backgroundColor: buttonColor.backgroundColor, borderColor: buttonColor.borderColor }} />

                </div>

            </form>

        </div>
    )
}

export default Description;