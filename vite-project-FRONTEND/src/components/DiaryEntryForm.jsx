// src/components/DiaryEntryForm.jsx
import React, { useEffect, useState } from 'react';
import { createEntry, updateEntry } from '../services/api'; // Import the updateEntry function
import './DiaryEntryForm.css';


const DiaryEntryForm = ({ onNewEntry, entry }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [mood, setMood] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    if (entry) {
      // If editing, populate the fields with the entry data
      setTitle(entry.title);
      setDate(new Date(entry.date).toISOString().slice(0, 16)); // Format for datetime-local
      setMood(entry.mood);
      setContent(entry.content);
      setTags(entry.tags.join(', ')); // Convert array to comma-separated string
    } else {
      // Reset fields if not editing
      setTitle('');
      setDate('');
      setMood('');
      setContent('');
      setTags('');
    }
  }, [entry]);


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const entryData = {
      title,
      date: new Date(date).toISOString(),
      mood,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      createdAt: entry ? entry.createdAt : new Date().toISOString(), // Preserve createdAt for edits
      updatedAt: new Date().toISOString(),
    };

    try {
      if (entry) {
        // If editing, call the update function
        await updateEntry(entry._id, entryData);
        setMessage('Entry successfully updated!');
      } else {
        // Create a new entry
        await createEntry(entryData);
        setMessage('Entry successfully submitted!');
      }

      // Clear form fields after submission
      if (!entry) {
        setTitle('');
        setDate('');
        setMood('');
        setContent('');
        setTags('');
      }

      if (onNewEntry) {
        onNewEntry(); // Notify parent to refresh entries
      }
      window.location.reload();
    } catch (error) {
      console.error('Failed to create/update a diary entry', error);
      setMessage('Failed to create/update the diary entry.');
    } finally {
      setLoading(false);
    }
  };

  return (

      <div className="diary-form-card">
        <div className="form-content">
        <form onSubmit={handleSubmit}>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-input"
            required
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="title-input"
            required
          />
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="mood-select"
            required
          >
            <option value="">Select your mood</option>
            <option value="Happy">😊 Happy</option>
            <option value="Sad">😢 Sad</option>
            <option value="Neutral">😐 Neutral</option>
          </select>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="How was your day?"
            className="content-textarea"
            required
          />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="tags-input"
          />
          <button type="submit" className="submit-button">Submit</button>
          {/* {message && <p>{message}</p>} */}
        </form>
        

        </div>
      </div>

  );
};


export default DiaryEntryForm;
