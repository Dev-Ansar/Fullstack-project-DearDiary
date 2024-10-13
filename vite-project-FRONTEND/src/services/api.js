// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/entries';  // Replace with your backend URL

export const getEntries = async () => {
  return await axios.get(API_URL);
};

export const createEntry = async (entryData) => {
    const response = await axios.post(API_URL, entryData);
    return response.data;
  };


// src/services/api.js
export const updateEntry = async (id, updatedData) => {
    const response = await fetch(`http://localhost:5000/api/entries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    return response.json();
  };
  
  export const deleteEntry = async (id) => {
    const response = await fetch(`http://localhost:5000/api/entries/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  };
  




