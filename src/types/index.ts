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