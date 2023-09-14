import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QuestionForm from './components/QuestionForm';
import QuestionPage from './components/QuestionPage';
import Auth from './components/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add this state
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
        setIsAuthenticated(true); // Set isAuthenticated to true when the user is logged in
      } else {
        dispatch(logout());
        setIsAuthenticated(false); // Set isAuthenticated to false when the user is logged out
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
          {isAuthenticated ? (
            <>
              <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/new-question" element={<QuestionForm />} />
        </Routes>
        <Routes>
          <Route path="/question-page" element={<QuestionPage />} />
        </Routes>
            </>
          ) : (
            <Navigate to="/auth" />
          )}
      </Router>
{/* 
      <Router>
        <Header />
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/new-question" element={<QuestionForm />} />
        </Routes>
        <Routes>
          <Route path="/question-page" element={<QuestionPage />} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
