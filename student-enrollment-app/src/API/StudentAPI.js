import axios from 'axios';

const API_URL = 'http://localhost:5050/api/students';

// D1. Load Student Records
export const getStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch students:", error);
    return []; 
  }
};

// D2. Register Student
export const registerStudent = async (studentData) => {
  try {
    const response = await axios.post(API_URL, studentData);
    return response.data;
  } catch (error) {
    console.error("Failed to register student:", error);
    return null;
  }
};

// D3. Update Enrollment Status
export const updateStudentStatus = async (id, currentStatus) => {
  try {
    const newStatus = currentStatus === 'Pending' ? 'Active' : 'Pending';
    const response = await axios.put(`${API_URL}/${id}`, `"${newStatus}"`, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update status:", error);
    return null;
  }
};

// D4. Delete Student Record
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete student:", error);
    return false;
  }
};