import React, { useState } from 'react';
import './calendarModal.css';

export default function Modal({ closeModal, eventList, setEventList, selectedEvent }) {
    const [newEventTitle, setNewEventTitle] = useState("");
    const [newEventStartDate, setNewEventStartDate] = useState(new Date());
    const [newEventEndDate, setNewEventEndDate] = useState(new Date());

    const handleDeleteEvent = async () => {
        let eventToBeDeleted = eventList.filter(event => event.title == selectedEvent.title)

        const options = {
            method: "DELETE",
            headers: { 
              "Content-Type": "application/json"
            }
          };
          const response = await fetch(`http://127.0.0.1:8000/calendar/task/${eventToBeDeleted[0].id}`, options);
          console.log(response)
          if (response.status == 201) {
            const data = await response.json();
            console.log("Calendar Event Deleted:", data);
            window.location.reload();
          } else {
            console.error("Couldn't delete event!");
          }
    };

    const handleUpdateEvent = async () => {
        let eventToBeUpdated = eventList.filter(event => event.title == selectedEvent.title)

        const options = {
            method: "PUT",
            headers: { 
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: newEventTitle,
              start_date: newEventStartDate,
              due_date: newEventEndDate,
              complete: "false"        
            }),
          };
          const response = await fetch(`http://127.0.0.1:8000/calendar/task/${eventToBeUpdated[0].id}`, options);
          if (response.ok) {
            // TODO : Add alert instead of message?
            const data = await response.json();
            console.log("Calendar Event Creation result:", data['message']);
            window.location.reload();
          } else {
            console.error("Calendar event creation failed!");
          }
    };
    
  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
            <button className='cancelBtn' onClick={() => closeModal(false)}>X</button>
            <div className='modal-title'>Update event details</div>
            <div className='modal-body'>
                <form>
                    <label>Title
                    <input 
                        type="text" 
                        name='event-title'
                        value={ newEventTitle }
                        onChange={(e) => setNewEventTitle(e.target.value)} />
                    </label>
                    <label>New Start Date
                    <input 
                        type="date" 
                        name='event-start'
                        value={ newEventStartDate }
                        onChange={(e) => setNewEventStartDate(e.target.value)} />
                    </label>
                    <label>New End Date
                    <input 
                        type="date" 
                        name='event-end'
                        value={ newEventEndDate }
                        onChange={(e) => setNewEventEndDate(e.target.value)} />
                    </label>
                </form>
            </div>
            <div className='modal-footer'>
                <button onClick={ handleUpdateEvent }>Save changes</button>
                <button onClick={ handleDeleteEvent }>Delete event</button>
            </div>
        </div>
    </div>
  )
}
