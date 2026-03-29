import React, { useEffect, useState } from "react";

const EditReminder = ({
  isOpen,
  onClose,
  selectedReminder,
  onUpdate,
  jobs
}) => {

  const [formData, setFormData] = useState({
    jobId: "",
    type: "Follow Up",
    date: "",
    time: "",
    notifyEmail: false,
    notifyWhatsApp: false,
    notes: ""
  });

  useEffect(() => {
  if (selectedReminder) {
    setFormData({
      jobId: selectedReminder.jobId,
      type: selectedReminder.type,
      date: selectedReminder.date,
      time: selectedReminder.time,
      notifyEmail: selectedReminder.notifyEmail,
      notifyWhatsApp: selectedReminder.notifyWhatsApp,
      notes: selectedReminder.notes || ""
    });
  }
}, [selectedReminder]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(selectedReminder.id, formData);
    };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Edit Reminder
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Job */}
            <select
                name="jobId"
                value={formData.jobId}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
                >
                <option value="">Choose a job...</option>
                {jobs?.map(job => (
                    <option key={job.id} value={job.id}>
                    {job.company} - {job.position}
                    </option>
                ))}
            </select>

            {/* Type */}
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option value="Follow Up">Follow Up</option>
              <option value="Interview">Interview</option>
              <option value="Deadline">Deadline</option>
              <option value="Other">Other</option>
            </select>

            {/* Date */}
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />

            {/* Time */}
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          {/* Notifications */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="notifyEmail"
                checked={formData.notifyEmail}
                onChange={handleChange}
              />
              Email
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="notifyWhatsApp"
                checked={formData.notifyWhatsApp}
                onChange={handleChange}
              />
              WhatsApp
            </label>
          </div>

          {/* Notes */}
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="Add notes..."
          />

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg"
            >
              Update Reminder
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border rounded-lg"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditReminder;