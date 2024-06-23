import { useEffect } from 'react';
import { useQueryClient, useQuery, QueryClient } from 'react-query';
import styles from './MyEvent.module.css';
import api from '../../../utils/api';
import party from '../party.png'
import { Link } from 'react-router-dom';

const MyEvent = () => {

    const queryClient = useQueryClient();

    const getEvents = async () => {
        const res = await api.get('/events');
        return res.data;
    };

    const { data: events, isLoading, isError, error } = useQuery('events', getEvents);
    
    useEffect(() => {
        if (!isLoading && !isError) {
            queryClient.invalidateQueries('events'); 
        }
    }, [isLoading,isError,queryClient]);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/events/${id}`);
        } catch (e) {
            console.log(e);
        }
    };


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
            <div className={styles.myEventContainer}>
                <h1>MIS EVENTOS</h1>
                {events.map((event, index) => (
                <div key={index} className={styles.event}>
                    <div className={styles.leftPart}>
                        <img src={party} className={styles.eventImg} alt="Event image" />
                        <div className={styles.datosEvento}>{formatDate(event.eventDate)}</div>
                    </div>
                    <div className={styles.rightPart}>
                        <div className={styles.rightPartUp}>
                            <div className={styles.datosEvento}>{event.eventTitle}</div>
                            <div className={styles.datosEvento}>ORGANIZADO POR: {event.owner && event.owner.fullname}</div>
                        </div>
                        <div className={styles.rightPartDown}>
                            <button className={styles.deleteEvent} onClick={() => handleDelete(event.id)}>ELIMINAR EVENTO</button>
                           <Link to='/editevent'><button className={styles.editEvent}>EDITAR EVENTO</button></Link> 
                        </div>
                    </div>
                </div>
            ))}
            </div>

        </>
    )
}

export default MyEvent;

