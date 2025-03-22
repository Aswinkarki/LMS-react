"use client"

import type React from "react"
import type { Student } from "../../types"
import { Pencil, Trash2 } from "lucide-react"

interface StudentListProps {
  students: Student[]
  loading: boolean
  onEdit: (student: Student) => void
  onDelete: (id: number) => void
}

export const StudentList: React.FC<StudentListProps> = ({ students, loading, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">StudentID</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Faculty</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Contact No.</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-4 px-4 text-center">
                {loading ? "Loading students..." : "No students found."}
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.student_id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{student.student_id}</td>
                <td className="py-2 px-4">{student.student_name}</td>
                <td className="py-2 px-4">{student.department}</td>
                <td className="py-2 px-4">{student.email}</td>
                <td className="py-2 px-4">{student.contact_number}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => onEdit(student)}
                    className="text-blue-600 hover:text-blue-900"
                    aria-label="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this student?")) {
                        onDelete(student.student_id)
                      }
                    }}
                    className="text-red-600 hover:text-red-900"
                    aria-label="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

