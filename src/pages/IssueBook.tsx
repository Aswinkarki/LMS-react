import { useState, useEffect, type ChangeEvent, type FormEvent } from "react"
import { createTransaction } from "../services/transactionService"
import Toast, { type ToastType } from "../components/toast"

interface FormData {
  bookId: string
  userId: string
  username: string
  studentId: string
  bookTitle: string
  date: string
  transactionType: "borrow" | "return"
}

const IssueBook = () => {
  const [formData, setFormData] = useState<FormData>({
    bookId: "",
    userId: "",
    username: "",
    studentId: "",
    bookTitle: "",
    date: new Date().toISOString().split("T")[0],
    transactionType: "borrow",
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [toast, setToast] = useState<{ message: string; type: ToastType }>({
    message: "",
    type: null,
  })

  // Load user data from localStorage when component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId")
      const storedUsername = localStorage.getItem("username")

      if (storedUserId || storedUsername) {
        setFormData((prevData) => ({
          ...prevData,
          userId: storedUserId || "",
          username: storedUsername || "",
        }))
      }
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const formatDate = (dateString: string): string => {
    return dateString.replace(/-/g, "/")
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Use the userId from localStorage for the transaction
      const transactionData = {
        student: Number.parseInt(formData.studentId),
        user: formData.userId, // This will be the UUID from localStorage
        book: Number.parseInt(formData.bookId),
        transaction_type: formData.transactionType,
        date: formatDate(formData.date),
      }

      const response = await createTransaction(transactionData)
      const actionText = formData.transactionType === "borrow" ? "borrowed" : "returned"

      setToast({
        message: `Book successfully ${actionText}. Transaction ID: ${response.transaction_id}`,
        type: "success",
      })

      // Reset form data after successful transaction but keep the user info
      setFormData({
        bookId: "",
        userId: formData.userId, // Keep the user ID
        username: formData.username, // Keep the username
        studentId: "",
        bookTitle: "",
        date: new Date().toISOString().split("T")[0],
        transactionType: "borrow",
      })
    } catch (error) {
      setToast({
        message: `Failed to ${formData.transactionType} book: ${error instanceof Error ? error.message : "Unknown error"}`,
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-800" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H6z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-xl font-semibold">Issue Book</h2>
          </div>
          {formData.username && (
            <div className="text-sm text-gray-600">
              Librarian: <span className="font-medium">{formData.username}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Book ID</label>
              <input
                type="text"
                name="bookId"
                value={formData.bookId}
                onChange={handleChange}
                className="w-full p-2 bg-gray-200 border-0 rounded-md"
                required
              />
            </div>

           

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
              <input
                type="text"
                name="bookTitle"
                value={formData.bookTitle}
                onChange={handleChange}
                className="w-full p-2 bg-gray-200 border-0 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className="w-full p-2 bg-gray-200 border-0 rounded-md"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 bg-gray-200 border-0 rounded-md"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                className="w-full p-2 bg-gray-200 border-0 rounded-md"
              >
                <option value="borrow">Borrow</option>
                <option value="return">Return</option>
              </select>
            </div>

            <button type="submit" className="w-full mt-4 p-2 bg-[#1B4965] text-white rounded" disabled={isLoading}>
              {isLoading ? "Processing..." : "Issue"}
            </button>
          </div>
        </form>
      </div>

      {/* Toast notification */}
      {toast.type && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: null })} />
      )}
    </div>
  )
}

export default IssueBook

