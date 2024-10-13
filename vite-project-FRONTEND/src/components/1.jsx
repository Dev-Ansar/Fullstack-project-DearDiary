import React, { useEffect, useState } from 'react';
import { getEntries } from '../services/api';
import DiaryEntryCard from '../components/DiaryEntryCard';
import DiaryEntryForm from '../components/DiaryEntryForm'; 
import './DiaryEntriesPage.css'; 

const DiaryEntriesPage = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);

  const fetchEntries = async () => {
    try {
      const response = await getEntries();
      setEntries(response.data);
    } catch (err) {
      console.error("Error fetching entries:", err);
      setError('Failed to fetch entries. Please try again later.');
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleEdit = (entry) => {
    setEditingEntry(entry);
  };

  const handleDelete = async (id) => {
    setEntries(entries.filter(entry => entry._id !== id));
  };

  const handleNewEntry = () => {
    setEditingEntry(null);
    fetchEntries();
  };

  return (
    <div className="diary-entries-page">
      <h1>Diary Entries</h1>
      {error && <p>{error}</p>}
      {editingEntry ? (
        <DiaryEntryForm onNewEntry={handleNewEntry} entry={editingEntry} />
      ) : (
        <div className="entries-container">
          <div className="entry-cards">
            {entries.map((entry) => (
              <DiaryEntryCard 
                key={entry._id} 
                entry={entry} 
                onEdit={handleEdit}
                onDelete={() => handleDelete(entry._id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryEntriesPage;
