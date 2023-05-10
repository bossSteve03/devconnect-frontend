import React, { useState } from 'react';
import { format } from 'date-fns'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect } from 'react';
import CalendarModal from '../CalendarModal'
import { useProjects } from "../../context";

import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enGB from 'date-fns/locale/en-GB'

const locales = {
  'en-GB': enGB,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export default function TeamCalendar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({title: '', start: '', end: ''});
  const [eventList, setEventList] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const { projects } = useProjects();

  useEffect(() => {
    async function populateEvents() {
      const fetchedEvents = await fetchEvents();
      const eventsMapped = fetchedEvents.map(x => ({ id: x.id, title: x.name, start: new Date(x.start_date), end: new Date(x.due_date) }));
      setEventList(eventsMapped);
    }
    if (projects.length > 0) {
      populateEvents();
    }
  }, [projects]);

  const handleEventSelection = (e) => {
    setIsOpen(true);
    setSelectedEvent(e);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createCalendarEventHandler();
  };

  const createCalendarEventHandler = async () => {
    const options = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: eventTitle,
        start_date: eventStartDate,
        due_date: eventEndDate,
        complete: "false"        
      }),
    };
    // If the user can have more than one project, this needs to be changed.
    const response = await fetch(`http://127.0.0.1:8000/calendar/task/${projects[0].id}`, options);
    if (response.ok) {
      // TODO : Add alert instead of message?
      const data = await response.json();
      console.log("Calendar Event Creation result:", data);
      window.location.reload();
    } else {
      console.error("Calendar event creation failed!");
    }
  };

  const fetchEvents = async () => {
    const options = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json" 
      }
    };
    const response = await fetch(`http://127.0.0.1:8000/calendar/task/${projects[0].id}`, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching events for this project");
    }
  };


  return (
    <>
      <Calendar 
        localizer={localizer} 
        events={eventList} 
        startAccessor="start" 
        endAccessor="end" 
        style={{height: 500, margin: "50px"}}
        onSelectEvent={handleEventSelection}  />
      { isOpen && <CalendarModal closeModal={ setIsOpen } eventList={ eventList } setEventList={ setEventList } selectedEvent={ selectedEvent } /> }

      <form onSubmit={submitHandler}>
        <label>Title
          <input 
            type="text" 
            name='event-title' 
            value={ eventTitle }
            onChange={(e) => setEventTitle(e.target.value)} />
        </label>
        <br />
        <label>Start
          <input 
            type="date" 
            name='event-start' 
            value={ eventStartDate }
            onChange={(e) => setEventStartDate(e.target.value)} />
        </label>
        <br />
        <label>End
          <input 
            type="date" 
            name='event-end' 
            value={ eventEndDate }
            onChange={(e) => setEventEndDate(e.target.value)} />
        </label>
        <input type="submit" name='submit' />

      </form>
    </>
  )
}
