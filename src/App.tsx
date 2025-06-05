import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import AppRouter from './routes/AppRouter';
import { StationProvider } from './context/StationContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <StationProvider>
          <AppRouter />
        </StationProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;