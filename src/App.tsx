import React from 'react';
import { AuthenticatedApp } from 'authenticated-app';
import { useAuth } from 'context/auth-context';
import { UnanthenticatedApp } from 'unauthenticated-app';
import './App.css';
function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {
        user ? <AuthenticatedApp /> : <UnanthenticatedApp />
      }
    </div>
  );
}

export default App;
