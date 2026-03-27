import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../features/profile/profileSlice';
import { User, Mail, Phone, Bell, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function Profile() {
  const dispatch = useDispatch();

  const { profile, loading, saving, error } = useSelector((state) => state.profile);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    emailNotifications: true,
    whatsappNotifications: false
  });

  // ✅ Load profile
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // ✅ Sync Redux → form
  useEffect(() => {
    if (profile) {
      setProfileData(profile);
    }
  }, [profile]);

  // ✅ Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProfile(profileData))
      .unwrap()
      .then(() => toast.success('Profile updated successfully!'))
      .catch(() => toast.error('Failed to update profile'));
  };

  const handleChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setProfileData({
      ...profileData,
      [e.target.name]: value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen mt-16 bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 bg-gray-50">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account and notification preferences</p>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={profileData.whatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    This number will be used for WhatsApp reminder notifications
                  </p>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={profileData.emailNotifications}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-900">Email Notifications</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Receive reminder notifications via email
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="whatsappNotifications"
                    checked={profileData.whatsappNotifications}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-900">WhatsApp Notifications</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Receive reminder notifications via WhatsApp
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-200 pt-6">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Backend Integration Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Backend Integration</h3>
          <p className="text-sm text-blue-700 mb-3">
            This frontend is ready to connect to your Spring Boot backend. Update the API endpoints in 
            <code className="mx-1 px-2 py-1 bg-blue-100 rounded text-xs">/src/app/services/api.js</code>
          </p>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>Configure JWT authentication in your Spring Boot backend</li>
            <li>Set up email service (SMTP) for email notifications</li>
            <li>Integrate Twilio or similar service for WhatsApp notifications</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
