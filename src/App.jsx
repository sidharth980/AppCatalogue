import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PomodoroApp from './apps/PomodoroApp';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pomodoro" element={<PomodoroApp />} />
      </Routes>
    </Router>
  );
};

export default App;