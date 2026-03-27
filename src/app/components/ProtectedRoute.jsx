import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children, role }) {
  const { token, user, loading } = useSelector((state) => state.auth);

  const storedToken = token;
  const storedUser = user;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ✅ Auth check
  if (!storedToken || !storedUser) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Role check
  if (role && storedUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}