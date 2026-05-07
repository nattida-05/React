import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent, updateStudent } from "../features/students/studentsSlice";
import { selectAllStudents } from "../features/students/selectors";

function StudentTable() {
    const dispatch = useDispatch();
    const allStudents = useSelector(selectAllStudents);
    const [editing, setEditing] = useState(null);

    function handleDelete(id) {
        if (window.confirm("Delete this student?")) {
            dispatch(deleteStudent(id));
        }
    }

    function handleEditSave(updatedData) {
        dispatch(updateStudent({ ...updatedData, gpa: parseFloat(updatedData.gpa) || 0 }));
        setEditing(null);
    }

    return (
        <>
            <table className="student-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Student ID</th>
                        <th>Major</th>
                        <th>GPA</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allStudents.map((student, index) => (
                        <tr key={student.id} className={student.gpa >= 3.5 ? "high-gpa" : ""}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.studentId}</td>
                            <td>{student.major}</td>
                            <td className="gpa-cell">{student.gpa.toFixed(2)}</td>
                            <td>
                                <button onClick={() => setEditing(student)}>Edit</button>
                                <button onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editing && (
                <div className="modal-overlay" onClick={() => setEditing(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Edit Student</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            handleEditSave({
                                id: editing.id,
                                name: formData.get('name'),
                                studentId: formData.get('studentId'),
                                major: formData.get('major'),
                                gpa: formData.get('gpa'),
                            });
                        }}>
                            <input type="text" name="name" defaultValue={editing.name} required />
                            <input type="text" name="studentId" defaultValue={editing.studentId} required />
                            <input type="text" name="major" defaultValue={editing.major} />
                            <input type="number" name="gpa" defaultValue={editing.gpa} step="0.01" min="0" max="4" required />
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setEditing(null)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default StudentTable;