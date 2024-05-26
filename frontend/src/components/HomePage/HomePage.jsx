import { useState } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import styles from './HomePage.module.css';
import api from '../../utils/api';
import party from './party.png'
import { useNavigate } from 'react-router-dom';


const HomePage = ({ userId }) => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useState(null);

    const getEvents = async () => {
        const res = await api.get('/events');
        return res.data;
    };

    const { data: events, isLoading, isError, error } = useQuery('events', getEvents);

    const deleteEvent = async (id) => {
        try {
            await api.delete(`/events/${id}`);
            queryClient.invalidateQueries('events');
            console.log(`Evento con ID ${id} eliminado.`);
        } catch (e) {
            console.log(`Error eliminando evento con ID ${id}: `, e);
        }
    };

    const handleEditEvent = (event) => {
        setSelectedEvent(event);
        navigate('/editevent', { state: { event } });
    }

    const userEvents = events ? events.filter(event => event.owner && event.owner._id === userId) : [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES");
    };


    return (
        <>
            <div className={styles.myEventsContainer}>
            <div className={styles.title}>
                <h1>MIS EVENTOS</h1>
            </div>

            {userEvents.map((event, index) => (
                <div key={index} className={styles.event}>
                    <div className={styles.leftPart}>
                        <img src={event.eventPicture} className={styles.eventImg} alt="Event" />
                        <div className={styles.datosEvento}>{formatDate(event.eventDate)}</div>
                        <div className={styles.datosEvento}>{event.eventStartTime} - {event.eventEndTime}</div>
                    </div>
                    <div className={styles.rightPart}>
                        <div className={styles.rightPartUp}>
                            <div className={styles.datosEvento}>{event.eventTitle}</div>
                            <div className={styles.datosEvento}>ORGANIZADO POR: {event.owner && event.owner.fullname}</div>
                            <div className={styles.datosEvento}>UBICACIÓN: {event.eventLocation && event.eventLocation.cityName}</div>
                        </div>
                        <div className={styles.rightPartDown}>
                            <button className={styles.deleteEvent} onClick={() => deleteEvent(event._id)}>ELIMINAR EVENTO</button>
                            <button className={styles.editEvent} onClick={() => handleEditEvent(event)}>EDITAR EVENTO</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default HomePage;
