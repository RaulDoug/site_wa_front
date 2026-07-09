import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api.js';
import './styles.css';
import eventImg from '../../assets/evento.png';
import { FaLocationDot } from 'react-icons/fa6';


export default function Events({ limit }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await api.get('/events');

        setEvents(response.data);
      } catch (error) {
        console.log(error);
        setError('Não foi possível carregar a agenda de eventos no momento.');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return <div className='events-loading'><p>Carregendo eventos...</p></div>;
  }

  if (error) {
    return <div className="events-error"><p>{error}</p></div>;
  }

  const sortedEvents = [...events].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  const displayedEvents = limit ? sortedEvents.slice(0, limit) : sortedEvents;

  return (
    <section id='events' className="events-section">
      <h2 className="events-section-title">
        Eventos e Agenda
      </h2>

      <div className="events-grid">
        {displayedEvents.length === 0 ? (
          <p className="no-events">
            Não há nenhum evento agendado para os próximos dias.
          </p>
        ) : (
          displayedEvents.map((event) => {
            const dateObj = new Date(event.eventDate);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const monthInitials = dateObj.toLocaleDateString('pt-br', { month: 'short' });
            const month = monthInitials.replace('.', '').toUpperCase();

            return (
              <div key={event._id} className="event-card">
                {/* {event.imageUrl && (
                  <img src={event.imageUrl} alt="event-img" />
                )} */}
                <img src={eventImg} alt="event-img" />
                <div className="event-date-container">
                  <span className="event-day">{day}</span>
                  <span className="event-month">{month}</span>
                </div>
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <p className="event-desc">{event.desc}</p>

                  <div className="event-datails">
                    <span className='event-loc'>
                      <FaLocationDot className='event-loc-icon' />
                      <p>{event.eventLoc}</p>
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="view-more-container">
        {limit && (
          <Link to='/agenda' className='view-more-btn'>
            Ver mais
          </Link>
        )}
      </div>
    </section>
  );
}
