import { createBrowserRouter } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import Reminders from './pages/Reminders';
import Profile from './pages/Profile';
import EditJob from './pages/EditJob';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },

  // ✅ USER DASHBOARD
  {
    path: '/',
    element: (
      <ProtectedRoute role="USER">
        <Dashboard />
      </ProtectedRoute>
    )
  },

  // ✅ ADMIN DASHBOARD (optional)
  {
    path: '/admin',
    element: (
      <ProtectedRoute role="ADMIN">
        <Dashboard />
      </ProtectedRoute>
    )
  },

  {
    path: '/add-job',
    element: (
      <ProtectedRoute role="USER">
        <AddJob />
      </ProtectedRoute>
    )
  },

  {
  path: '/edit-job/:id',
  element: (
    <ProtectedRoute role="USER">
      <EditJob />
    </ProtectedRoute>
  )
 },

  {
    path: '/reminders',
    element: (
      <ProtectedRoute role="USER">
        <Reminders />
      </ProtectedRoute>
    )
  },

  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  }
]);