import { Building2, MapPin, DollarSign, Calendar, Trash2, Pencil } from 'lucide-react';
import { Link } from 'react-router';

export default function JobCard({ job, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Interview':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Offer':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.position}</h3>
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">{job.company}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/edit-job/${job.id}`}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </Link>

          <button
            onClick={() => onDelete(job.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Applied: {(job.date) ? new Date(job.date).toLocaleDateString() : "Nill"}</span>
        </div>
      </div>

      {job.notes && (
        <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">{job.notes}</p>
      )}

      <div className="flex items-center justify-between">
        <span className={`inline-block px-3 py-1 rounded-full text-xs border ${getStatusColor(job.status)}`}>
          {job.status}
        </span>
      </div>
    </div>
  );
}
