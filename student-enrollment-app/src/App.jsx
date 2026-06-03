import { useState, useEffect } from 'react';
import { getStudents, registerStudent, updateStudentStatus, deleteStudent } from './API/StudentAPI';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentName: '',
    programme: '',
    enrollmentStatus: 'Pending'
  });

  // D1. Load Student Records
  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // D2. Register Student
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newStudent = await registerStudent(formData);
    if (newStudent) {
      fetchStudents(); 
      setFormData({ studentName: '', programme: '', enrollmentStatus: 'Pending' }); 
    }
  };

  // D3. Update Enrollment Status
  const handleUpdateStatus = async (id, currentStatus) => {
    const updated = await updateStudentStatus(id, currentStatus);
    if (updated) {
      fetchStudents();
    }
  };

  // D4. Delete Student Record
  const handleDelete = async (id) => {
    const deleted = await deleteStudent(id);
    if (deleted !== false) { 
      fetchStudents(); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Student Enrollment Management System
        </h1>

        {/* C2. Student Registration Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Register New Student</h2>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="studentName"
              placeholder="Student Name"
              value={formData.studentName}
              onChange={handleChange}
              required
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="programme"
              placeholder="Programme"
              value={formData.programme}
              onChange={handleChange}
              required
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="enrollmentStatus"
              value={formData.enrollmentStatus}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Register Student
            </button>
          </form>
        </div>

        {/* C3. Student Enrollment Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="p-4 border-b">Student Name</th>
                <th className="p-4 border-b">Programme</th>
                <th className="p-4 border-b">Enrollment Status</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{student.studentName}</td>
                  <td className="p-4 border-b">{student.programme}</td>
                  <td className="p-4 border-b">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      student.enrollmentStatus === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {student.enrollmentStatus}
                    </span>
                  </td>
                  <td className="p-4 border-b space-x-2">
                    <button
                      onClick={() => handleUpdateStatus(student.id, student.enrollmentStatus)}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition text-sm"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No student records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;