import { Calendar, Mail, MessageCircle, Trash2, Building2, BadgeCheck, Pencil } from 'lucide-react';
import { useState } from 'react';
import EditReminder from '../pages/EditReminder';

export default function ReminderCard({ reminder, onDelete, onEdit }) {
  const getReminderTypeColor = (type) => {
    switch (type) {
      case 'Interview':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Follow Up':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Deadline':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const reminderDateTime = new Date(`${reminder.date}T${reminder.time}`);
  const now = new Date();

  const isPast = reminderDateTime < now;

  return (
    <div className={`bg-white rounded-xl border p-6 hover:shadow-md transition-shadow ${
      isPast ? 'border-gray-300 opacity-60' : 'border-gray-200'
    }`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-block px-3 py-1 rounded-full text-xs border ${getReminderTypeColor(reminder.type)}`}>
              {reminder.type}
            </span>
            {isPast && (
              <span className="text-xs text-gray-500">(Past)</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-medium">{reminder.company}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <BadgeCheck className="w-4 h-4" />
          <p className="text-sm text-gray-500">{reminder.position}</p>
          </div>
        </div>
        <div className="flex gap-2">
        <button
          onClick={() => onEdit(reminder)}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(reminder.id)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        </div>
      </div>

      <div className="space-y-2 mb-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date(reminder.date).toLocaleDateString()} at {reminder.time}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {reminder.notifyEmail && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </div>
          )}
          {reminder.notifyWhatsApp && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </div>
          )}
        </div>
      </div>

      {reminder.notes && (
        <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">{reminder.notes}</p>
      )}
      
    </div> 
  );
}
