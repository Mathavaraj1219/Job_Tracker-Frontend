import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import { fetchJobs, deleteJob } from '../features/jobs/jobSlice';
import ReminderCard from '../components/ReminderCard';
import { fetchReminders, deleteReminder } from '../features/reminders/reminderSlice';
import { Plus, Briefcase, Clock, CheckCircle, XCircle, Bell } from 'lucide-react';
import { toast } from 'sonner';

export default function Dashboard() {
  const dispatch = useDispatch();

  const { jobs, loading } = useSelector((state) => state.jobs);
  const { reminders } = useSelector((state) => state.reminders);

  const [filter, setFilter] = useState('All');
  const [view, setView] = useState('jobs');

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchReminders());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this job application?')) return;

    dispatch(deleteJob(id))
      .unwrap()
      .then(() => toast.success('Job deleted'))
      .catch(() => toast.error('Failed to delete job'));
  };

  const handleDeleteReminder = (id) => {
    if (!window.confirm('Are you sure you want to delete this reminder?')) return;

    dispatch(deleteReminder(id))
      .unwrap()
      .then(() => toast.success('Reminder deleted'))
      .catch(() => toast.error('Failed to delete reminder'));
  };

  const filteredJobs =
    filter === 'All'
      ? jobs
      : jobs.filter((job) => job.status === filter);

  const stats = [
    {
      label: 'Total Applications',
      value: jobs.length,
      icon: Briefcase,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      label: 'In Progress',
      value: jobs.filter(j => j.status === 'Applied' || j.status === 'Interview').length,
      icon: Clock,
      color: 'bg-orange-50 text-orange-600'
    },
    {
      label: 'Offers',
      value: jobs.filter(j => j.status === 'Offer').length,
      icon: CheckCircle,
      color: 'bg-green-50 text-green-600'
    },
    {
      label: 'Rejected',
      value: jobs.filter(j => j.status === 'Rejected').length,
      icon: XCircle,
      color: 'bg-red-50 text-red-600'
    }
  ];

  return (
    <div className="min-h-screen mt-16 bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">
              Track and manage your job applications
            </p>
          </div>

          <Link
            to="/add-job"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            <Plus className="w-5 h-5" />
            Add Job
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Toggle View */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView('jobs')}
            className={`px-4 py-2 rounded-lg text-sm ${
              view === 'jobs' ? 'bg-blue-600 text-white' : 'bg-white border'
            }`}
          >
            Jobs ({jobs.length})
          </button>

          <button
            onClick={() => setView('reminders')}
            className={`px-4 py-2 rounded-lg text-sm ${
              view === 'reminders' ? 'bg-blue-600 text-white' : 'bg-white border'
            }`}
          >
            Reminders ({reminders.length})
          </button>
        </div>

        {/* CONTENT */}
        {view === 'jobs' ? (
          <>
            {/* Loading */}
            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading jobs...</p>
              </div>
            ) : (
              <>
                {/* Filters */}
                <div className="flex gap-2 mb-6">
                  {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-4 py-2 rounded-lg text-sm ${
                        filter === status ? 'bg-blue-600 text-white' : 'bg-white border'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                {/* Job List */}
                {filteredJobs.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl">
                    <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                    <p className="text-gray-600 mb-6">
                      {filter === 'All'
                        ? 'Start by adding your first job'
                        : `No jobs with status "${filter}"`}
                    </p>

                    {filter === 'All' && (
                      <Link
                        to="/add-job"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                      >
                        Add Job
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reminders.length === 0 ? (
              <div className="text-center col-span-full py-12 bg-white rounded-xl">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No reminders found</h3>
                <p className="text-gray-600">Start by adding a reminder</p>
              </div>
              
            ) : (
              reminders.map((reminder) => (
                <ReminderCard
                  key={reminder.id}
                  reminder={reminder}
                  onDelete={handleDeleteReminder}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}