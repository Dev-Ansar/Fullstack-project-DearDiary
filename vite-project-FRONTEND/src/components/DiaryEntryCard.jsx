
// src/components/DiaryEntryCard.jsx
import React from 'react';
import { deleteEntry } from '../services/api';
import './DiaryEntryCard.css'; 

const DiaryEntryCard = ({ entry, onEdit, onDelete }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this entry?');
    if (confirmed) {
      try {
        await deleteEntry(entry._id);
        onDelete();  // Callback to refresh entries
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

  return (
    <div className="diary-entry-card">
      <h3>{entry.title}</h3>
      <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
      <p>Mood: {entry.mood}</p>
      <p>{entry.content}</p>
      <p>Tags: {entry.tags.join(', ')}</p>
      <div className="buttons">
        <button className="button-edit" onClick={() => onEdit(entry)}>Edit</button>
        <button className="button-delete" onClick={handleDelete}>Delete</button>
      </div>


    </div>
  );
};

export default DiaryEntryCard;





