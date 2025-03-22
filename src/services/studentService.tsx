import api from "./api"
import type { Student, StudentFormData } from "../types"

export const studentService = {
  getAll: async (): Promise<Student[]> => {
    const response = await api.get("/students/students/")
    return response.data
  },

  getById: async (id: number): Promise<Student> => {
    const response = await api.get(`/students/students/${id}/`)
    return response.data
  },

  create: async (student: StudentFormData): Promise<Student> => {
    try {
      // Log the request details
      console.log("Making POST request to:", "/students/students/")
      console.log("With headers:", api.defaults.headers)
      console.log("With data:", student)

      const response = await api.post("/students/students/", student)
      console.log("Create response:", response)
      return response.data
    } catch (error: any) {
      console.error("Create API Error:", error)
      console.error("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
      })
      throw error
    }
  },

  update: async (id: number, student: StudentFormData): Promise<Student> => {
    try {
      const response = await api.put(`/students/students/${id}/`, student)
      return response.data
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message)
      throw error
    }
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/students/students/${id}/`)
  },
}

