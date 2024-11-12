import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventFormModal from '../components/EventFormModal';
import { Container, Typography, Box, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from '../api/calendarApi';

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<EventSourceInput>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      window.history.replaceState({}, document.title, '/calendar');
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const jwtToken = localStorage.getItem('token');
      if (jwtToken) {
        try {
          const response = await getEvents({});
          setEvents(response.data);
          toast.success('Events loaded successfully');
        } catch (err) {
          console.error('Error fetching events', err);
          toast.error('Failed to load events');
        }
      }
    };
    fetchEvents();
  }, []);

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    setModalInitialData(null);
    setIsModalOpen(true);
  };

  const openUpdateModal = (eventData: any) => {
    setModalInitialData({
      ...eventData,
      id: eventData.id || eventData._id,
    });
    setIsModalOpen(true);
  };

  const handleEventSubmit = async (eventData: any) => {
    if (modalInitialData) {
      try {
        await updateEvent(modalInitialData.id, eventData);
        const updatedEvents = await getEvents({});
        setEvents(updatedEvents.data);
        toast.success('Event updated successfully');
      } catch (err) {
        console.error('Error updating event', err);
        toast.error('Failed to update event');
      }
    } else {
      try {
        await createEvent({ ...eventData, date: selectedDate });
        const updatedEvents = await getEvents({});
        setEvents(updatedEvents.data);
        toast.success('Event created successfully');
      } catch (err) {
        console.error('Error creating event', err);
        toast.error('Failed to create event');
      }
    }
    setIsModalOpen(false);
  };

  const handleEventDelete = async (eventId: string) => {
    try {
      await deleteEvent(eventId, {});
      const updatedEvents = await getEvents({});
      setEvents(updatedEvents.data);
      toast.success('Event deleted successfully');
      setModalInitialData(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error deleting event', err);
      toast.error('Failed to delete event');
    }
  };

  return (
    <Container maxWidth="lg">
      <ToastContainer position="top-right" autoClose={3000} />
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="20px"
        >
          <Typography variant="h4">Calendar</Typography>
        </Box>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={(info) => openUpdateModal(info.event.extendedProps)}
          height="auto"
        />
      </Paper>
      <EventFormModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleEventSubmit}
        onDelete={handleEventDelete}
        initialData={modalInitialData}
      />
    </Container>
  );
};

export default CalendarPage;
