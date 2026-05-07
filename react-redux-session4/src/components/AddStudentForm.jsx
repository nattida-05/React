// src/components/AddStudentForm.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudentAsync } from '../features/students/studentsThunks';

const EMPTY = { name: '', studentId: '', major: '', gpa: '' };

function AddStudentForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');

  const onChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name.trim())      return 'กรุณากรอกชื่อนักเรียน';
    if (!form.studentId.trim()) return 'กรุณากรอก Student ID';
    if (!form.major.trim())     return 'กรุณากรอกสาขาวิชา';
    const gpa = parseFloat(form.gpa);
    if (isNaN(gpa) || gpa < 0 || gpa > 4) return 'GPA ต้องอยู่ระหว่าง 0.00 - 4.00';
    return '';
  };

  const onSubmit = async e => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    await dispatch(addStudentAsync({ ...form, gpa: parseFloat(form.gpa) }));
    setForm(EMPTY);
  };

  return (
    <div className="card add-form">
      <div className="card-title">Add New Student</div>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={onChange}
            />
          </div>

          <div className="field">
            <label htmlFor="studentId">Student ID</label>
            <input
              id="studentId"
              name="studentId"
              placeholder="e.g. S00123"
              value={form.studentId}
              onChange={onChange}
            />
          </div>

          <div className="field">
            <label htmlFor="major">Major</label>
            <input
              id="major"
              name="major"
              placeholder="e.g. Computer Science"
              value={form.major}
              onChange={onChange}
            />
          </div>

          <div className="field">
            <label htmlFor="gpa">GPA</label>
            <input
              id="gpa"
              name="gpa"
              type="number"
              step="0.01"
              min="0"
              max="4"
              placeholder="0.00 – 4.00"
              value={form.gpa}
              onChange={onChange}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary">
          + Add Student
        </button>
      </form>
    </div>
  );
}

export default AddStudentForm;
