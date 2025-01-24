import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import User from './pages/User';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/User/:id" element={<User />} />
          <Route path="/" element={<Navigate to="/User/1" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;