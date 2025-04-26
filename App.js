import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import Login from './components/Login';
import Signup from './components/Signup';
import MainPage from './components/MainPage';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  if (user === null) {
    // Show front page and login/signup routes
    return (
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainPage user={user} theme={theme} setTheme={setTheme} />} />
      </Routes>
    </Router>
  );
}

export default App;
