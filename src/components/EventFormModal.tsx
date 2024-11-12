import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from '@mui/material';

interface EventFormModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (eventData: any) => void;
  onDelete?: (eventId: string) => void;
  initialData?: any;
}

const EventFormModal: React.FC<EventFormModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  onDelete,
  initialData,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title ?? '');
      setDescription(initialData.description ?? '');
      setParticipants(
        initialData.participants ? initialData.participants.join(', ') : ''
      );
      setDate(initialData.date ?? '');
      setTime(initialData.time ?? '');
      setDuration(initialData.duration ? initialData.duration.toString() : '');
      setSessionNotes(initialData.sessionNotes ?? '');
    } else {
      setTitle('');
      setDescription('');
      setParticipants('');
      setDate('');
      setTime('');
      setDuration('');
      setSessionNotes('');
    }
  }, [initialData]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = {
      title,
      description,
      participants: participants
        .split(',')
        .map((participant) => participant.trim()),
      date,
      time,
      duration: parseFloat(duration),
      sessionNotes,
    };
    onSubmit(eventData);
    onRequestClose();
  };

  const handleDelete = () => {
    if (initialData && onDelete) {
      onDelete(initialData.id || initialData._id);
      onRequestClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onRequestClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? 'Update Event' : 'Create New Event'}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Participants (comma-separated emails)"
                fullWidth
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Time"
                type="time"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Duration (hours)"
                type="number"
                fullWidth
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Session Notes"
                fullWidth
                multiline
                rows={4}
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRequestClose} color="secondary">
          Cancel
        </Button>
        {initialData && onDelete && (
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        )}
        <Button onClick={handleFormSubmit} variant="contained" color="primary">
          {initialData ? 'Update Event' : 'Create Event'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventFormModal;
