import axios from 'axios';

const API_URL = 'http://localhost:5002/api';

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export const createEvent = async (eventData: any) => {
  return api.post('/create/events', eventData);
};

export const getEvents = async (eventData: any) => {
  return api.get('/get/events', eventData);
};

export const updateEvent = async (id: string, eventData: any) => {
  return api.put(`/update/events/${id}`, eventData);
};

export const deleteEvent = async (id: string, eventData: any) => {
  return api.delete(`/delete/events/${id}`, eventData);
};
