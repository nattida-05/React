// src/App.jsx
// No useEffect / dispatch here — useGetStudentsQuery() in each component
// handles fetching automatically (and shares one cached request).
import GpaSummary from './components/GpaSummary';
import AddStudentForm from './components/AddStudentForm';
import StudentTable from './components/StudentTable';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎓 AcadeMate</h1>
        <p>Student Grade Management System (RTK Query)</p>
        <span className="header-badge">API Connected</span>
      </header>

      <main className="app-main">
        <GpaSummary />
        <AddStudentForm />
        <StudentTable />
      </main>
    </div>
  );
}

export default App;
