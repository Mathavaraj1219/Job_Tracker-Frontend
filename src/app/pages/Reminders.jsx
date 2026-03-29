import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ReminderCard from '../components/ReminderCard';
import EditReminder from './EditReminder';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReminders, addReminder, deleteReminder, updateReminder } from '../features/reminders/reminderSlice';
import { fetchJobs } from '../features/jobs/jobSlice';
import { Plus, Bell } from 'lucide-react';
import { toast } from 'sonner';

export default function Reminders() {
  const dispatch = useDispatch();

  // ✅ Redux state
  const { reminders, loading } = useSelector((state) => state.reminders);
  const { jobs } = useSelector((state) => state.jobs);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    jobId: '',
    type: 'Follow Up',
    date: '',
    time: '10:00',
    notifyEmail: true,
    notifyWhatsApp: false,
    notes: ''
  });

  useEffect(() => {
    // ✅ Fetch from Redux
    dispatch(fetchReminders());
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.jobId) {
      toast.error('Please select a job');
      return;
    }

    try {
      const selectedJob = jobs.find(j => j.id === parseInt(formData.jobId));

      const reminderData = {
        ...formData,
        jobId: parseInt(formData.jobId),
        company: selectedJob.company,
        position: selectedJob.position
      };

      // ✅ Redux dispatch
      await dispatch(addReminder(reminderData)).unwrap();

      setShowAddForm(false);
      setFormData({
        jobId: '',
        type: 'Follow Up',
        date: '',
        time: '10:00',
        notifyEmail: false,
        notifyWhatsApp: false,
        notes: ''
      });

      toast.success('Reminder created successfully!');
    } catch (error) {
      toast.error('Failed to create reminder');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this reminder?')) {
      return;
    }

    try {
      // ✅ Redux delete
      await dispatch(deleteReminder(id)).unwrap();
      toast.success('Reminder deleted');
    } catch (error) {
      toast.error('Failed to delete reminder');
    }
  };

  const handleEdit = (reminder) => {
    setSelectedReminder(reminder);
    setShowEditModal(true);
  };

  const handleUpdate = async (id, data) => {
    try {
      const selectedJob = jobs.find(j => j.id === parseInt(data.jobId));

      const updatedData = {
        ...data,
        jobId: parseInt(data.jobId),
        company: selectedJob.company,
        position: selectedJob.position
      };

      await dispatch(updateReminder({ id, data: updatedData })).unwrap();

      setShowEditModal(false);
      toast.success("Reminder updated ✅");
    } catch {
      toast.error("Update failed ❌");
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const now = new Date();

  const getDateTime = (r) => new Date(`${r.date}T${r.time}`);

  const upcomingReminders = reminders.filter(r => getDateTime(r) >= now);
  const pastReminders = reminders.filter(r => getDateTime(r) < now);

  return (
    <div className="min-h-screen mt-16 bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Reminders</h1>
            <p className="text-gray-600">Never miss an important deadline or follow-up</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Reminder
          </button>
        </div>

        {/* Add Reminder Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Reminder</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="jobId" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Job *
                  </label>
                  <select
                    id="jobId"
                    name="jobId"
                    value={formData.jobId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a job...</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.company} - {job.position}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Follow Up">Follow Up</option>
                    <option value="Interview">Interview</option>
                    <option value="Deadline">Deadline</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notification Methods
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="notifyEmail"
                      checked={formData.notifyEmail}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Email</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="notifyWhatsApp"
                      checked={formData.notifyWhatsApp}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">WhatsApp</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Add any additional notes..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Reminder
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reminders List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading reminders...</p>
          </div>
        ) : (
          <>
            {/* Upcoming Reminders */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Reminders</h2>
              {upcomingReminders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming reminders</h3>
                  <p className="text-gray-600 mb-6">Create a reminder to stay on top of your job search</p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Create Reminder
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingReminders.map((reminder) => (
                    <ReminderCard key={reminder.id} reminder={reminder} onDelete={handleDelete} onEdit={handleEdit}/>
                  ))}
                </div>
              )}
            </div>

            {/* Past Reminders */}
            {pastReminders.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Reminders</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastReminders.map((reminder) => (
                    <ReminderCard key={reminder.id} reminder={reminder} onDelete={handleDelete} onEdit={handleEdit} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <EditReminder isOpen={showEditModal} onClose={() => setShowEditModal(false)} selectedReminder={selectedReminder} onUpdate={handleUpdate} jobs={jobs} />

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-sm font-medium text-blue-900 mb-2">About Notifications</h3>
          <p className="text-sm text-blue-700">
            Email and WhatsApp notifications will be sent through your Spring Boot backend. 
            Configure your email service (SendGrid) and WhatsApp API (Twilio) in the backend to enable notifications.
          </p>
        </div>
      </div>
    </div>
  );
}
