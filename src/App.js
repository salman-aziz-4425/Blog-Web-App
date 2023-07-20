import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
const ProtectedRoute = ({ userStatus, children }) => {

  return  children ;
};

const OpeningProtectedRoute = ({ userStatus, children }) => {
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
