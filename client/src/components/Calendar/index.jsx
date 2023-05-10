import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useEffect } from 'react';

// let data = require('date-fns/locale/en-GB')
// const locales = { 'en-GB': data };
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales
// })
const localizer = momentLocalizer(moment);

export default function TeamCalendar() {
  const [eventList, setEventList] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());


  useEffect(() => {
    async function populateEvents() {
      const fetchedEvents = await fetchEvents();
      const eventsMapped = fetchedEvents.map(x => ({ title: x.name, start: x.start_date, end: x.due_date }));
      setEventList(eventsMapped);
    }

    populateEvents();
  }, []);

  const handleEventSelection = (e) => {
    console.log(e, "Event data");
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
    const response = await fetch("http://127.0.0.1:8000/calendar/task/1", options);
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
    const response = await fetch("http://127.0.0.1:8000/calendar/task/1", options);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching events for this project");
    }
  };


  return (
    <>
      <div>This is a calendar</div>
      <Calendar 
        localizer={localizer} 
        events={eventList} 
        startAccessor="start" 
        endAccessor="end" 
        style={{height: 500, margin: "50px"}}
        onSelectEvent={handleEventSelection}  />

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
