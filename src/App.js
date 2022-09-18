import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginSignUp from './pages/login_signup';
import Dashboard from './pages/Dashboard/Dashboard';
import { ProtectedRoute } from '../src/components/ProtectedRoute';
import { AuthProvider } from '../src/hooks/useAuth'

function App() {
  return (
    // <div className="App">
    //   <LoginSignUp/>
    // </div>
    <>
      <div className="wrapper">

        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/auth" element={<LoginSignUp />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
