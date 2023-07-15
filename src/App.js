import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ userStatus, children }) => {
<<<<<<< HEAD
=======

>>>>>>> feats:project setup
  return  children ;
};

const OpeningProtectedRoute = ({ userStatus, children }) => {
<<<<<<< HEAD


=======
>>>>>>> feats:project setup
  return  children ;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          exact path="/"
          element={
            <OpeningProtectedRoute >
               <Login />
            </OpeningProtectedRoute>
          }
        />
        <Route
          path="Home"
          element={
            <ProtectedRoute >
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
