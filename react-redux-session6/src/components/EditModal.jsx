// src/components/EditModal.jsx
import { useState } from 'react';

function EditModal({ student, onSave, onCancel }) {
  const [form, setForm] = useState({ ...student });

  const onChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = () => {
    onSave({ ...form, gpa: parseFloat(form.gpa) });
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className="modal">
        <h3>Edit Student</h3>

        <div className="modal-fields">
          <div className="modal-field">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Full name"
            />
          </div>

          <div className="modal-field">
            <label>Major</label>
            <input
              name="major"
              value={form.major}
              onChange={onChange}
              placeholder="Major"
            />
          </div>

          <div className="modal-field">
            <label>GPA</label>
            <input
              name="gpa"
              type="number"
              step="0.01"
              min="0"
              max="4"
              value={form.gpa}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-save" onClick={handleSave}>Save</button>
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
