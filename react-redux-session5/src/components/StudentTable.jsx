// src/components/StudentTable.jsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import EditModal from './EditModal';

// ✅ import จากที่เดียว ไม่ซ้ำ
import {
  selectAllStudents,
  selectStudentsStatus,
  selectStudentsError,
} from '../features/students/selectors';

import {
  fetchStudents,
  deleteStudentAsync,
  updateStudentAsync,
} from '../features/students/studentsThunks';

// ✅ เอาไว้ใช้ใน StudentRow เท่านั้น
import { selectStudentById } from '../features/students/studentsSlice';

function StudentRow({ id, onEdit, onDelete }) {
  const student = useSelector(state => selectStudentById(state, id));
  if (!student) return null;

  return (
    <tr className={student.gpa >= 3.5 ? 'high-gpa' : ''}>
      <td style={{ fontWeight: 800 }}>{student.name}</td>
      <td className="td-id">{student.studentId}</td>
      <td className="td-major">{student.major}</td>
      <td>
        <span className={`gpa-chip${student.gpa >= 3.5 ? ' high' : ''}`}>
          {parseFloat(student.gpa).toFixed(2)}
        </span>
      </td>
      <td>
        <div className="row-actions">
          <button className="btn-edit" onClick={() => onEdit(student)}>Edit</button>
          <button className="btn-delete" onClick={() => onDelete(student.id)}>Delete</button>
        </div>
      </td>
    </tr>
  );
}

function StudentTable() {
  const students = useSelector(selectAllStudents);
  const status = useSelector(selectStudentsStatus);
  const error = useSelector(selectStudentsError);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(null);

  if (status === 'loading') {
    return <div className="spinner">⏳ Loading students...</div>;
  }

  if (status === 'failed') {
    return (
      <div className="error-banner">
        <p>❌ Error: {error}</p>
        <button onClick={() => dispatch(fetchStudents())}>Retry</button>
      </div>
    );
  }

  if (status !== 'succeeded') return null;

  const handleDelete = id => {
    if (window.confirm('ยืนยันการลบนักเรียนคนนี้?')) {
      dispatch(deleteStudentAsync(id));
    }
  };

  const handleEditSave = updated => {
    dispatch(updateStudentAsync(updated));
    setEditing(null);
  };

  return (
    <>
      <div className="table-wrap">
        <div className="table-header">
          <div className="table-title">Student Roster</div>
          <span className="count-badge">{students.length} students</span>
        </div>

        {students.length === 0 ? (
          <div className="empty-state">No students yet — add one above! 🎓</div>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Student ID</th>
                <th>Major</th>
                <th>GPA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* ✅ ใช้ StudentRow แทน inline map */}
              {students.map(student => (
                <StudentRow
                  key={student.id}
                  id={student.id}
                  onEdit={setEditing}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <EditModal
          student={editing}
          onSave={handleEditSave}
          onCancel={() => setEditing(null)}
        />
      )}
    </>
  );
}

export default StudentTable;