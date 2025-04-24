// import type React from "react"
// import { useState, useEffect } from "react"
// import type { Book, Author, BookFormData } from "../../types"
// import { authorService } from "../../services/authorService"

// interface BookFormProps {
//   onSubmit: (book: BookFormData) => void
//   book?: Book
//   isEditing: boolean
//   onCancel?: () => void
//   loading: boolean
//   error: string | null
// }

// export const BookForm: React.FC<BookFormProps> = ({ onSubmit, book, isEditing, onCancel, loading, error }) => {
//   const [formData, setFormData] = useState<BookFormData>({
//     title: "",
//     author: 0,
//     genre: "Not Defined",
//     isbn: "0000000000000",
//     quantity: 1,
//   })
//   const [authors, setAuthors] = useState<Author[]>([])
//   const [fetchingAuthors, setFetchingAuthors] = useState<boolean>(false)

//   useEffect(() => {
//     const fetchAuthors = async () => {
//       setFetchingAuthors(true)
//       try {
//         const data = await authorService.getAll()
//         setAuthors(data)
//       } catch (err) {
//         console.error("Failed to fetch authors:", err)
//       } finally {
//         setFetchingAuthors(false)
//       }
//     }

//     fetchAuthors()
//   }, [])

//   useEffect(() => {
//     if (book) {
//       setFormData({
//         book_id: book.book_id,
//         title: book.title,
//         author: book.author,
//         genre: book.genre,
//         isbn: book.isbn,
//         quantity: book.quantity,
//       })
//     } else {
//       setFormData({
//         title: "",
//         author: 0,
//         genre: "Not Defined",
//         isbn: "0000000000000",
//         quantity: 1,
//       })
//     }
//   }, [book])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "quantity" ? Number.parseInt(value) : value,
//     }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onSubmit(formData)
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Book ID</label>
//           <input
//             type="text"
//             name="book_id"
//             value={formData.book_id || ""}
//             onChange={handleChange}
//             className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
//             disabled={true}
//             placeholder="Auto-generated"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
//           <input
//             type="text"
//             name="isbn"
//             value={formData.isbn}
//             onChange={handleChange}
//             className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
//             required
//             maxLength={13}
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
//           <input
//             type="text"
//             name="genre"
//             value={formData.genre}
//             onChange={handleChange}
//             className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
//             required
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
//           <select
//             name="author"
//             value={formData.author}
//             onChange={handleChange}
//             className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
//             required
//           >
//             <option value="">Select Author</option>
//             {fetchingAuthors ? (
//               <option value="" disabled>
//                 Loading authors...
//               </option>
//             ) : (
//               authors.map((author) => (
//                 <option key={author.author_id} value={author.author_id}>
//                   {author.name}
//                 </option>
//               ))
//             )}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
//           <input
//             type="number"
//             name="quantity"
//             value={formData.quantity}
//             onChange={handleChange}
//             className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
//             required
//             min={1}
//           />
//         </div>
//       </div>

//       <div className="flex justify-start mt-4">
//         <button
//           type="submit"
//           className="bg-[#1B4965] text-white px-4 py-2 rounded hover:bg-[#1B4965]/90 transition-colors disabled:opacity-70"
//           disabled={loading}
//         >
//           {loading ? "Processing..." : isEditing ? "UPDATE BOOK" : "ADD BOOK"}
//         </button>

//         {isEditing && onCancel && (
//           <button
//             type="button"
//             onClick={onCancel}
//             className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   )
// }

import type React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Book, Author, BookFormData } from "../../types";
import { authorService } from "../../services/authorService";

interface BookFormProps {
  onSubmit: (book: BookFormData) => void;
  book?: Book;
  isEditing: boolean;
  onCancel?: () => void;
  loading: boolean;
  error: string | null;
}

export const BookForm: React.FC<BookFormProps> = ({
  onSubmit,
  book,
  isEditing,
  onCancel,
  loading,
  error,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<BookFormData>({
    defaultValues: {
      title: "",
      author: 0,
      genre: "Not Defined",
      isbn: "0000000000000",
      quantity: 1,
    },
  });

  const [authors, setAuthors] = useState<Author[]>([]);
  const [fetchingAuthors, setFetchingAuthors] = useState<boolean>(false);

  useEffect(() => {
    const fetchAuthors = async () => {
      setFetchingAuthors(true);
      try {
        const data = await authorService.getAll();
        setAuthors(data);
      } catch (err) {
        console.error("Failed to fetch authors:", err);
      } finally {
        setFetchingAuthors(false);
      }
    };

    fetchAuthors();
  }, []);

  useEffect(() => {
    if (book) {
      reset({
        book_id: book.book_id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        quantity: book.quantity,
      });
    } else {
      reset({
        title: "",
        author: 0,
        genre: "Not Defined",
        isbn: "0000000000000",
        quantity: 1,
      });
    }
  }, [book, reset]);

  const onFormSubmit = (data: BookFormData) => {
    onSubmit({
      ...data,
      author: parseInt(data.author.toString(), 10),
      quantity: parseInt(data.quantity.toString(), 10),
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Book ID
          </label>
          <input
            type="text"
            {...register("book_id")}
            disabled
            placeholder="Auto-generated"
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ISBN
          </label>
          <input
            type="text"
            {...register("isbn", {
              required: "ISBN is required",
              maxLength: {
                value: 13,
                message: "ISBN should be at most 13 digits",
              },
            })}
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
          />
          {errors.isbn && (
            <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <input
            type="text"
            {...register("genre", { required: "Genre is required" })}
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
          />
          {errors.genre && (
            <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <select
            {...register("author", { required: "Author is required" })}
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
          >
            <option value="">Select Author</option>
            {fetchingAuthors ? (
              <option value="" disabled>
                Loading authors...
              </option>
            ) : (
              authors.map((author) => (
                <option key={author.author_id} value={author.author_id}>
                  {author.name}
                </option>
              ))
            )}
          </select>
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
            })}
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-start mt-4">
        <button
          type="submit"
          className="bg-[#1B4965] text-white px-4 py-2 rounded hover:bg-[#1B4965]/90 transition-colors disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Processing..." : isEditing ? "UPDATE BOOK" : "ADD BOOK"}
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
  );
};
