import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ userStatus, children }) => {
  if (userStatus === 0) {
    return <Navigate to="/" />;
  }
  return  children ;
};

const OpeningProtectedRoute = ({ userStatus, children }) => {
  if (userStatus !== 0) {
    return <Navigate to="/Home" />;
  }
  return  children ;
};

const App = () => {
  const userStatus = useSelector((state) => state.postHandler.users) || 0;
  return (
    <Router>
      <Routes>
        <Route
          exact path="/"
          element={
            <OpeningProtectedRoute userStatus={userStatus}>
               <Login />
            </OpeningProtectedRoute>
          }
        />
        <Route
          path="Home"
          element={
            <ProtectedRoute userStatus={userStatus}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;