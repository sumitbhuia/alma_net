import { useState, useEffect } from 'react';
import { createClient } from "../../utils/supabase/client"; // Make sure to import your Supabase client

export const useEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supabase = createClient();

  const fetchEvents = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('event')
      .select('id, name, description, is_online, location, url, date, created_by');

    if (error) {
      console.error('Error fetching events:', error);
    } else {
      setEvents(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, isLoading };
};
