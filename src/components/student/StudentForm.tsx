"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Student, StudentFormData } from "../../types"

interface StudentFormProps {
  onSubmit: (student: StudentFormData) => void
  student?: Student | null
  isEditing: boolean
  onCancel?: () => void
  loading: boolean
  error: string | null
}

export const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, student, isEditing, onCancel, loading, error }) => {
  const [formData, setFormData] = useState<StudentFormData>({
    student_name: "",
    email: "",
    contact_number: "",
    department: "",
  })

  useEffect(() => {
    if (student) {
      setFormData({
        student_id: student.student_id,
        student_name: student.student_name,
        email: student.email,
        contact_number: student.contact_number,
        department: student.department,
      })
    } else {
      setFormData({
        student_name: "",
        email: "",
        contact_number: "",
        department: "",
      })
    }
  }, [student])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form data being submitted:", formData)
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          name="student_name"
          value={formData.student_name}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact No.</label>
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
            required
          />
        </div>
      </div>

      <div className="flex justify-start mt-4">
        <button
          type="submit"
          className="bg-[#1B4965] text-white px-4 py-2 rounded hover:bg-[#1B4965]/90 transition-colors disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Processing..." : isEditing ? "UPDATE STUDENT" : "ADD STUDENT"}
        </button>

        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

