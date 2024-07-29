import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/authentication/ProtectedRoutes';
import Workbook from './pages/Workbook';

function App() {
  return (
    <div id='App'>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/workbook/:id' element={
          <ProtectedRoute>
            <Workbook />
          </ProtectedRoute>
        } />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
