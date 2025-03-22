"use client"

import { useState, useEffect } from "react"
import type { Student, StudentFormData } from "../types"
import { studentService } from "../services/studentService"

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const data = await studentService.getAll()
      setStudents(data)
      setError(null)
    } catch (err: any) {
      setError("Failed to fetch students: " + (err.response?.data?.detail || err.message))
    } finally {
      setLoading(false)
    }
  }

  const addStudent = async (student: StudentFormData) => {
    setLoading(true)
    try {
      // Create a new object with only the fields the API expects for creation
      const studentData = {
        student_name: student.student_name,
        email: student.email,
        contact_number: student.contact_number,
        department: student.department,
        user: "8f8253dd-e087-4e62-94ba-6099b92f15f2", // Use the exact user ID from your example
      }

      // Log the data being sent to the API for debugging
      console.log("Sending data to create student:", studentData)

      const newStudent = await studentService.create(studentData)
      console.log("Successfully created student:", newStudent)
      setStudents([...students, newStudent])
      setError(null)
      return newStudent
    } catch (err: any) {
      console.error("Error creating student:", err)
      console.error("Error response data:", err.response?.data)
      setError("Failed to add student: " + (err.response?.data?.detail || err.message))
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateStudent = async (id: number, student: StudentFormData) => {
    setLoading(true)
    try {
      // Ensure the user ID is included in updates as well
      const studentWithUser = {
        ...student,
        user: "8f8253dd-e087-4e62-94ba-6099b92f15f2", // Use the exact user ID from your example
      }

      // Log the data being sent to the API for debugging
      console.log("Sending data to update student:", id, studentWithUser)

      const updatedStudent = await studentService.update(id, studentWithUser)
      setStudents(students.map((s) => (s.student_id === id ? updatedStudent : s)))
      setError(null)
      return updatedStudent
    } catch (err: any) {
      console.error("Error response:", err.response?.data)
      setError("Failed to update student: " + (err.response?.data?.detail || err.message))
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteStudent = async (id: number) => {
    setLoading(true)
    try {
      await studentService.delete(id)
      setStudents(students.filter((s) => s.student_id !== id))
      setError(null)
    } catch (err: any) {
      setError("Failed to delete student: " + (err.response?.data?.detail || err.message))
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return {
    students,
    loading,
    error,
    fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent,
  }
}

