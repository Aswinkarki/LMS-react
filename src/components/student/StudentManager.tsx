import React, { useState, useEffect } from "react";
import { Student } from "../../types/index";
import { fetchAllStudents, createStudent, updateStudent, deleteStudent } from "../../services/studentService";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";

const emptyFormData: Student = {
  student_id: 0,
  user: "",
  student_name: "",
  email: "",
  department: "",
  contact_number: "",
};

const StudentManager: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState<Student>(emptyFormData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all students
  const loadStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllStudents();
      setStudents(data);
    } catch (err) {
      setError("Failed to load students. Please try again.");
      console.error("Load students error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to reset the form
  const resetForm = () => {
    setFormData(emptyFormData);
    setEditingId(null);
  };

  // Add or update student
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (editingId !== null) {
        console.log("Updating student with ID:", editingId);
        console.log("Update data being sent:", formData);
        
        // Make sure to include all necessary fields, especially the ID
        const studentToUpdate = {
          ...formData,
          student_id: editingId
        };
        
        const result = await updateStudent(editingId, studentToUpdate);
        console.log("Update response:", result);
        alert("Student updated successfully!");
      } else {
        const result = await createStudent(formData);
        console.log("Create response:", result);
        alert("Student added successfully!");
      }
      
      // Reset form state and reload students
      resetForm();
      await loadStudents();
    } catch (err) {
      console.error("Operation error:", err);
      setError("Operation failed. Please check your input and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Edit student
  const handleEdit = (student: Student) => {
    console.log("Editing student:", student);
    // Create a deep copy to avoid reference issues
    setFormData({...student});
    setEditingId(student.student_id);
  };

  // Delete student
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await deleteStudent(id);
      alert("Student deleted successfully!");
      await loadStudents();
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle cancel
  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <StudentForm 
        formData={formData}
        editingId={editingId}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <StudentTable 
          students={students}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default StudentManager;