import './styles.css';
import { useEvents } from '../../hooks/useEvents.js';
import { useState, useEffect } from 'react';


export default function EventsSubPage() {
  const { events: displayedEvents, loading, error } = useEvents();

  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedEvent]);

  if (loading) {
    return (
      <div className="event-sub-container" style={{ pointerEvents: 'none' }}>
        {[1, 2, 3].map((n) => (
          <div key={n} className="event-sub-card">
            <div className="event-sub-img-container">
              <div className="skeleton" style={{ height: '100%', minHeight: '180px', borderRadius: '12px' }} />
            </div>
            <div className="event-sub-date-container skeleton" style={{ width: '55px', height: '65px', background: 'none' }}>
              <div className="skeleton" style={{ height: '20px', width: '60%', margin: '4px auto' }} />
              <div className="skeleton" style={{ height: '14px', width: '80%', margin: '4px auto' }} />
            </div>
            <div className="event-sub-info" style={{ flex: 1 }}>
              <div className="skeleton" style={{ height: '24px', width: '70%', marginBottom: '0.6rem' }} />
              <div className="skeleton" style={{ height: '14px', width: '50%', marginBottom: '0.6rem' }} />
              <div className="skeleton" style={{ height: '15px', width: '90%', marginBottom: '0.4rem' }} />
              <div className="skeleton" style={{ height: '15px', width: '80%', marginBottom: '0.8rem' }} />
              <div className="skeleton" style={{ height: '14px', width: '20%' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="events-error"><p>{error}</p></div>;
  }

  if (selectedEvent) {
    const dateObj = new Date(selectedEvent.eventDate);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const monthInitials = dateObj.toLocaleDateString('pt-br', { month: 'short' });
    const month = monthInitials.replace('.', '').toUpperCase();

    return (
      <div className="event-detail-container">
        <button onClick={() => setSelectedEvent(null)} className="back-btn">
          ← Voltar para agenda
        </button>
        <img src={selectedEvent.imageUrl} alt={selectedEvent.title} />
        <div className="text-content-event">
          <h1>{selectedEvent.title}</h1>
          <div className="event-sub-date-loc-info">
            <div className="event-sub-loc">
              <p>{`${selectedEvent.eventLoc} | `}</p>
            </div>
            <div className="event-sub-date">
              <span className="event-sub-date-day">{day}</span>
              <span className="event-sub-date-month">{month}</span>
            </div>
          </div>
          <div className="event-full-content">
            <p>{selectedEvent.desc}</p>
          </div>
        </div>
        <a href='whatsapp.com' className='event-sub-btn'>
          <p>Confirmar participação</p>
        </a>
      </div>
    );
  }

  return (
    <div className="event-sub-container">
      {displayedEvents.map((event) => {
        const dateObj = new Date(event.eventDate);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const monthInitials = dateObj.toLocaleDateString('pt-br', { month: 'short' });
        const month = monthInitials.replace('.', '').toUpperCase();

        const formatedDate = (
          <div className="event-sub-date-loc-info">
            <div className="event-sub-loc">
              <p>{`${event.eventLoc} | `}</p>
            </div>
            <div className="event-sub-date">
              <span className="event-sub-date-day">{day}</span>
              <span className="event-sub-date-month">{month}</span>
            </div>
          </div>
        );

        return (
          <div key={event._id} className="event-sub-card" onClick={() => setSelectedEvent(event)}>
            <div className="event-sub-img-container">
              {event.imageUrl && (
                <img src={event.imageUrl} alt="event-img" />
              )}
            </div>
            <div className="event-sub-date-container">
              <span className="event-sub-day">{day}</span>
              <span className="event-sub-month">{month}</span>
            </div>
            <div className="event-sub-info">
              <h3 className="event-sub-title">
                {event.title}
              </h3>
              {formatedDate}
              <p className="event-sub-desc">
                {event.desc}
              </p>
              <span className="event-sub-read-more">
                Ver mais
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
