import { useState, ChangeEvent, FormEvent } from 'react';
import { createTransaction } from '../services/transactionService';
import Toast, { ToastType } from '../components/toast'; // Import Toast

interface FormData {
  bookId: string;
  userId: string;
  studentId: string;
  bookTitle: string;
  date: string;
  transactionType: 'borrow' | 'return';
}

const IssueBook = () => {
  const [formData, setFormData] = useState<FormData>({
    bookId: '',
    userId: '',
    studentId: '',
    bookTitle: '',
    date: new Date().toISOString().split('T')[0],
    transactionType: 'borrow',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType }>({
    message: '',
    type: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formatDate = (dateString: string): string => {
    return dateString.replace(/-/g, '/');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const transactionData = {
        student: parseInt(formData.studentId),
        user: formData.userId,
        book: parseInt(formData.bookId),
        transaction_type: formData.transactionType,
        date: formatDate(formData.date),
      };

      const response = await createTransaction(transactionData);
      const actionText = formData.transactionType === 'borrow' ? 'borrowed' : 'returned';

      setToast({
        message: `Book successfully ${actionText}. Transaction ID: ${response.transaction_id}`,
        type: 'success',
      });

      // Reset form data after successful transaction
      setFormData({
        bookId: '',
        userId: '',
        studentId: '',
        bookTitle: '',
        date: new Date().toISOString().split('T')[0],
        transactionType: 'borrow',
      });
    } catch (error) {
      setToast({
        message: `Failed to ${formData.transactionType} book: ${error instanceof Error ? error.message : 'Unknown error'}`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md">
        <div className="bg-gray-100 p-4 rounded-t-lg flex items-center">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H6z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-xl font-bold">Issue Book</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Form fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Book ID</label>
              <input
                type="text"
                name="bookId"
                value={formData.bookId}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">User ID</label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Book Title</label>
              <input
                type="text"
                name="bookTitle"
                value={formData.bookTitle}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Transaction Type</label>
              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded"
              >
                <option value="borrow">Borrow</option>
                <option value="return">Return</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-4 p-2 bg-blue-500 text-white rounded"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      {/* Toast notification */}
      {toast.type && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: null })}
        />
      )}
    </div>
  );
};

export default IssueBook;
