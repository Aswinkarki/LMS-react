import type React from "react"
import { BookManager } from "../components/book/BookManager"

const Book: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <BookManager />
    </div>
  )
}

export default Book;