import { useState, useEffect } from 'react';
import api from '../services/api';

export function useEvents({ limit } = {}) {
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

  const sortedEvents = [...events].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  const displayedEvents = limit ? sortedEvents.slice(0, limit) : sortedEvents;

  return { events: displayedEvents, loading, error };
}

