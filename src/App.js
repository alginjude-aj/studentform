

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentForm from './components/studentForm';
import StudentList from './components/StudentList';
import StudentFormEdit from './components/StudentFormEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add" element={<StudentForm />} />
        <Route path="/edit/:studentId" element={<StudentFormEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
