import { Link } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents.js';
import './styles.css';
import { FaLocationDot } from 'react-icons/fa6';


export default function Events({ limit }) {
  const { events: displayedEvents, loading, error } = useEvents({ limit });

  if (loading) {
    return (
      <section id='events' className="events-section" style={{ pointerEvents: 'none' }}>
        <h2 className="events-section-title">
          Eventos e Agenda
        </h2>
        <div className="events-grid">
          {[1, 2].map((n) => (
            <div key={n} className="event-card" style={{ minHeight: '150px' }}>
              <div className="event-date-container skeleton" style={{ width: '55px', height: '65px', background: 'none' }}>
                <div className="skeleton" style={{ height: '20px', width: '60%', margin: '4px auto' }} />
                <div className="skeleton" style={{ height: '14px', width: '80%', margin: '4px auto' }} />
              </div>
              <div className="event-info" style={{ flex: 1 }}>
                <div className="skeleton" style={{ height: '22px', width: '70%', marginBottom: '0.6rem' }} />
                <div className="skeleton" style={{ height: '15px', width: '90%', marginBottom: '0.4rem' }} />
                <div className="skeleton" style={{ height: '15px', width: '50%', marginBottom: '0.8rem' }} />
                <div className="skeleton" style={{ height: '14px', width: '30%' }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="events-error"><p>{error}</p></div>;
  }

  if (displayedEvents.length === 0) {
    return null;
  }

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
              <Link key={event._id} to="/agenda" state={{ eventId: event._id }} className="event-card">
                {event.imageUrl && (
                  <img src={event.imageUrl} alt="event-img" />
                )}
                {/* <img src={eventImg} alt="event-img" /> */}
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
              </Link>
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
