"use client"

import type React from "react"
import { useState } from "react"
import { UserPlus } from "lucide-react"
import { useStudents } from "../../hooks/useStudents"
import { StudentForm } from "./StudentForm"
import { StudentList } from "./StudentList"
import type { Student, StudentFormData } from "../../types/index"

export const StudentManager: React.FC = () => {
  const { students, loading, error, addStudent, updateStudent, deleteStudent } = useStudents()
  const [isEditing, setIsEditing] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null)

  const handleSubmit = async (studentData: StudentFormData) => {
    try {
      if (isEditing && currentStudent) {
        await updateStudent(currentStudent.student_id, studentData)
        setIsEditing(false)
        setCurrentStudent(null)
      } else {
        await addStudent(studentData)
      }
    } catch (err) {
      console.error("Error submitting student:", err)
    }
  }

  const handleEdit = (student: Student) => {
    setCurrentStudent(student)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCurrentStudent(null)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center mb-4">
          <UserPlus className="mr-2 text-[#1B4965]" />
          <h2 className="text-xl font-semibold">Add Students</h2>
        </div>
        <StudentForm
          onSubmit={handleSubmit}
          student={currentStudent}
          isEditing={isEditing}
          onCancel={handleCancel}
          loading={loading}
          error={error}
        />
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Student Lists</h2>
        <StudentList students={students} loading={loading} onEdit={handleEdit} onDelete={deleteStudent} />
      </div>
    </div>
  )
}

