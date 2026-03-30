import { Mail, Phone, MessageCircle } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from "../features/user/userSlice";

export default function AdminDashboard() {
    const dispatch = useDispatch();

    const { users } = useSelector((state) => state.users);
    console.log(users);

    useEffect(() => {
        dispatch(fetchUsers());
      }, [dispatch]);
 
      console.log(users);

  return (
    <div className="bg-white rounded-xl border overflow-hidden">

      <table className="w-full text-sm text-left">

        {/* HEADER */}
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Username</th>
            <th className="p-4">Email</th>
            <th className="p-4">Phone</th>
            <th className="p-4">WhatsApp</th>
            <th className="p-4">Notifications</th>
            <th className="p-4">Joined</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>

          {users.map(user => (
            <tr key={user.id} className="border-b hover:bg-gray-50">

              <td className="p-4 text-gray-500">{user.id}</td>

              <td className="p-4 font-medium">
                {user.username}
              </td>

              <td className="p-4 text-gray-600">
                {user.email}
              </td>

              <td className="p-4 text-gray-600 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {user.phoneNumber || "-"}
              </td>

              <td className="p-4 text-gray-600 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                {user.whatsappNumber || "-"}
              </td>

              {/* Notification Methods */}
              <td className="p-4">
                <div className="flex gap-2">

                  {user.notifyEmail && (
                    <span className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      <Mail className="w-3 h-3" />
                      Email
                    </span>
                  )}

                  {user.notifyWhatsApp && (
                    <span className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                      <MessageCircle className="w-3 h-3" />
                      WhatsApp
                    </span>
                  )}

                  {!user.notifyEmail && !user.notifyWhatsApp && (
                    <span className="text-gray-400 text-xs">None</span>
                  )}

                </div>
              </td>

              <td className="p-4 text-gray-500">
                {user.createdAt}
              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}