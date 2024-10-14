// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DiaryEntryForm from './components/DiaryEntryForm';
import DiaryEntriesPage from './components/DiaryEntriesPage';
import './App.css'; 


import logo from './assets/images/diary.png';


const App = () => {
  const [diaryOpen, setDiaryOpen] = useState(false);

  const handleOpenDiary = () => {
    setDiaryOpen(true); // Opens the form
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/entries" element={<DiaryEntriesPage />} />
          <Route
            path="/"
            element={
              !diaryOpen ? (
                <div className="closed-diary">
                  <img src={logo} alt="Closed Diary" className="diary-image" />
                  <button className="open-button" onClick={handleOpenDiary}>
                    Open
                  </button>
                  <Link to="/entries" className="see-entries-button">
                    See Old Entries
                  </Link>
                </div>
              ) : (
                <DiaryEntryForm onNewEntry={() => alert('Entry submitted successfully!')} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
