export interface Author {
    author_id: number;
    name: string;
    bio: string;
  }

  export interface Book {
    book_id: number
    title: string
    author: number // Foreign key to Author
    genre: string
    isbn: string
    quantity: number
    is_deleted: boolean
  }
  
  export interface BookFormData {
    book_id?: number
    title: string
    author: number
    genre: string
    isbn: string
    quantity: number
  }

// src/types/student.ts

export interface Student {
  student_id: number
  student_name: string
  email: string
  contact_number: string
  department: string
  user: string
  created_date: string
  updated_date: string
  is_deleted: boolean
}

// Update the StudentFormData interface to match what the API expects
export interface StudentFormData {
  student_id?: number
  student_name: string
  email: string
  contact_number: string
  department: string
  user?: string
}