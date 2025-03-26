export interface Author {
  author_id: number;
  name: string;
  bio: string;
}

export interface Book {
  book_id: number;
  title: string;
  author: number; // Foreign key to Author
  genre: string;
  isbn: string;
  quantity: number;
  is_deleted: boolean;
}

export interface BookFormData {
  book_id?: number;
  title: string;
  author: number;
  genre: string;
  isbn: string;
  quantity: number;
}

export interface Student {
  student_id: number;
  user: string;
  student_name: string;
  email: string;
  department: string;
  contact_number: string;
}

export interface StudentFormProps {
  formData: Student;
  editingId: number | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export interface StudentTableProps {
  students: Student[];
  handleEdit: (student: Student) => void;
  handleDelete: (id: number) => void;
}

// types/transaction.ts

// Data sent to the backend to create a transaction
export interface TransactionData {
  student: number; // Student ID
  user: string; // User ID (UUID from AuthContext)
  book: number; // Book ID
  transaction_type: "borrow" | "return"; // Type of transaction
  related_borrow?: number | null;
  date: string; // Date in "YYYY/MM/DD" or "YYYY-MM-DD" format
}

// Data received from the backend, including additional fields
export interface TransactionResponse extends TransactionData {
  transaction_id: number; // Unique transaction ID
  student_name: string; // Optional: resolved student name
  librarian_name?: string; // Optional: resolved librarian name (user)
  book_name?: string; // Optional: resolved book title
}