import { Mail, Phone, MessageCircle, LogOut, Users, Copy } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUsers } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { logout } from "../features/auth/authSlice";
import logo from "../../assets/logo2.png";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users = [], loading } = useSelector((state) => state.users);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // ✅ Logout
  const handleLogout = () => {
      dispatch(logout());
      navigate('/login');
    };

  const handleCopy = async (email) => {
  try {
    await navigator.clipboard.writeText(email);
    toast.success("Copied ✅");
  } catch {
    toast.error("Copy failed ❌");
  }
};

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔥 Navbar */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/admin" className="flex items-center gap-2 hover:opacity-80 transition">
            <img src={logo} alt="logo" className="h-10" />
            <span className="text-lg font-semibold text-black">
              FollowUp<span className="text-2xl text-green-600 font-bold">PRO</span>
            </span>
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      <div className="p-6">

        <div className="flex items-center justify-center gap-2 mb-5">
          <Users className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </div>

        {/* 🔥 Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">  

          {/* Header */}
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Users</h2>
            <span className="text-sm text-gray-500">
              Total : {users.length}
            </span>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="text-center py-10">
              <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-3 text-gray-500">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No users found
            </div>
          ) : (

            <table className="w-full text-sm text-left">

              {/* HEADER */}
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Notifications</th>
                  <th className="p-4">Joined</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {currentUsers.map(user => (
                  <tr key={user.id} className="border-t hover:bg-gray-50 transition">

                    <td className="p-4 text-gray-600">
                      {user.id}
                    </td>

                    {/* User Info */}
                    <td className="p-4">
                      <p className="font-medium">{user.username}</p>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2 group">
    
                        <span className="text-gray-600 text-sm">
                          {user.email}
                        </span>

                        <button
                          onClick={() => handleCopy(user.email)}
                          className="opacity-0 group-hover:opacity-100 transition p-1 rounded hover:bg-gray-100"
                          title="Copy email"
                        >
                          <Copy className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>  
                    </td>

                    {/* Contact */}
                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4 text-blue-700" />
                        {user.phoneNumber || "None"}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MessageCircle className="w-4 h-4 text-green-700" />
                        {user.whatsappNumber || "None"}
                      </div>
                    </td>

                    {/* Notifications */}
                    <td className="p-4">
                      <div className="flex gap-2 flex-wrap">

                        {user.notifyEmail && (
                          <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            <Mail className="w-3 h-3" />
                            Email
                          </span>
                        )}

                        {user.notifyWhatsApp && (
                          <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            <MessageCircle className="w-3 h-3" />
                            WhatsApp
                          </span>
                        )}

                        {!user.notifyEmail && !user.notifyWhatsApp && (
                          <span className="text-gray-600 text-sm">
                            None
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="p-4 text-gray-500 text-sm">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleString('en-IN', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          })
                        : "-"}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

          )}
        </div>
        <div className="flex justify-center items-center gap-4 p-4 border-t">

          {/* Previous */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm border border-gray-500 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm border border-gray-500 rounded-lg disabled:opacity-50"
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
}