import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { createTransaction } from "../services/transactionService";
import Toast, { type ToastType } from "../components/toast";
import { TransactionData, TransactionResponse } from "../types/index";
import hsm from "../assets/hsm.svg"

// Popup Component
interface IssueDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  transactionDetails: {
    transaction_id: number;
    bookId: string;
    bookTitle: string;
    studentId: string;
    student_name: string;
    date: string;
    transactionType: "borrow" | "return";
    librarian: string;
  };
}

const IssueDetailsPopup: React.FC<IssueDetailsPopupProps> = ({ isOpen, onClose, transactionDetails }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 print:bg-white print:bg-opacity-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full border-t-4 border-[#1B4965] print:shadow-none print:border-0 print:max-w-full">
        {/* Header with Logo and Branding */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {/* Placeholder for Logo */}
            <div className="w-20 h-20 rounded-full flex items-center justify-center mr-3">
            <img src={hsm} alt="HSMSS Logo" className="w-12 h-12 rounded-full mr-3" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#1B4965]">
                Hetauda School Of Management and Social Sciences
              </h1>
              <h2 className="text-md font-semibold text-gray-800">Library Receipt</h2>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="space-y-3 border-t border-gray-200 pt-4">
          <p className="text-sm">
            <strong className="text-gray-700">Transaction ID:</strong> {transactionDetails.transaction_id}
          </p>
          <p className="text-sm">
            <strong className="text-gray-700">Book Title:</strong> {transactionDetails.bookTitle || "N/A"}
          </p>
          <p className="text-sm">
            <strong className="text-gray-700">Student ID:</strong> {transactionDetails.studentId}
          </p>
          <p className="text-sm">
            <strong className="text-gray-700">Student Name:</strong> {transactionDetails.student_name || "N/A"}
          </p>
          <p className="text-sm">
            <strong className="text-gray-700">Date:</strong> {transactionDetails.date}
          </p>
          <p className="text-sm">
            <strong className="text-gray-700">Transaction Type:</strong> {transactionDetails.transactionType}
          </p>
          <p className="text-sm">
            <strong className="text-gray-700">Librarian:</strong> {transactionDetails.librarian}
          </p>
        </div>

        {/* Signature Section */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="mt-2 h-12 border-b border-gray-300 w-48"></div>
          <p className="text-xs text-gray-500 mt-1">Signature of the Librarian</p>
        </div>

        {/* Buttons - Hidden when printing */}
        <div className="mt-6 flex justify-end space-x-4 print:hidden">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#1B4965] text-white rounded hover:bg-[#1B4965]/90 transition-colors"
          >
            Print
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


interface FormData {
  bookId: string;
  studentId: string;
  bookTitle: string;
  date: string;
  transactionType: "borrow" | "return";
}

const IssueBook = () => {
  const { user, api } = useAuth(); // Use api for additional requests if needed
  const [formData, setFormData] = useState<FormData>({
    bookId: "",
    studentId: "",
    bookTitle: "",
    date: new Date().toISOString().split("T")[0],
    transactionType: "borrow",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [transactionDetails, setTransactionDetails] = useState<IssueDetailsPopupProps["transactionDetails"] | null>(null);

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
      }));
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formatDate = (dateString: string): string => {
    return dateString.replace(/-/g, "/");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const transactionData: TransactionData = {
        student: Number.parseInt(formData.studentId),
        user: user?.userId || "",
        book: Number.parseInt(formData.bookId),
        transaction_type: formData.transactionType,
        date: formatDate(formData.date),
      };

      // Assuming createTransaction returns TransactionResponse
      const response = await createTransaction(transactionData) as TransactionResponse;
      const actionText = formData.transactionType === "borrow" ? "borrowed" : "returned";

      // If createTransaction doesn’t return student_name, fetch it separately
      let studentName = response.student_name;
      if (!studentName) {
        const studentResponse = await api.get(`/students/${formData.studentId}/`); // Adjust endpoint
        studentName = studentResponse.data.name || "Unknown";
      }

      // Set transaction details for the popup
      setTransactionDetails({
        transaction_id: response.transaction_id,
        bookId: formData.bookId,
        bookTitle: formData.bookTitle || response.book_name || "N/A",
        studentId: formData.studentId,
        student_name: studentName,
        date: formData.date,
        transactionType: formData.transactionType,
        librarian: user?.username || response.librarian_name || "Unknown",
      });
      setIsPopupOpen(true); // Open the popup

      setToast({
        message: `Book successfully ${actionText}. Transaction ID: ${response.transaction_id}`,
        type: "success",
      });

      // Reset form
      setFormData({
        bookId: "",
        studentId: "",
        bookTitle: "",
        date: new Date().toISOString().split("T")[0],
        transactionType: "borrow",
      });
    } catch (error) {
      setToast({
        message: `Failed to ${formData.transactionType} book: ${error instanceof Error ? error.message : "Unknown error"}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          {user?.username && (
            <div className="text-sm text-gray-600">
              Librarian: <span className="font-medium">{user.username}</span>
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

            <button
              type="submit"
              className="w-full mt-4 p-2 bg-[#1B4965] text-white rounded disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Issue"}
            </button>
          </div>
        </form>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Popup for Issuing Details */}
      {transactionDetails && (
        <IssueDetailsPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          transactionDetails={transactionDetails}
        />
      )}
    </div>
  );
};

export default IssueBook;