import { useState, ChangeEvent, FormEvent } from 'react';
import { createTransaction } from '../services/transactionService';

interface FormData {
  bookId: string;
  userId: string;
  studentId: string;
  bookTitle: string;
  date: string;
  transactionType: 'borrow' | 'return';
}

interface Message {
  text: string;
  type: 'success' | 'error' | '';
}

const IssueBook = () => {
  const [formData, setFormData] = useState<FormData>({
    bookId: '',
    userId: '',
    studentId: '',
    bookTitle: '',
    date: new Date().toISOString().split('T')[0],
    transactionType: 'borrow'
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({ text: '', type: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formatDate = (dateString: string): string => {
    // Convert from "YYYY-MM-DD" to "YYYY/MM/DD"
    return dateString.replace(/-/g, '/');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Prepare transaction data for API - exactly as specified
      const transactionData = {
        student: parseInt(formData.studentId),
        user: formData.userId,
        book: parseInt(formData.bookId),
        transaction_type: formData.transactionType,
        date: formatDate(formData.date)
      };

      const response = await createTransaction(transactionData);
      
      const actionText = formData.transactionType === 'borrow' ? 'borrowed' : 'returned';
      setMessage({ 
        text: `Book successfully ${actionText}. Transaction ID: ${response.transaction_id}`, 
        type: 'success' 
      });
      
      // Reset form after successful submission
      setFormData({
        bookId: '',
        userId: '',
        studentId: '',
        bookTitle: '',
        date: new Date().toISOString().split('T')[0],
        transactionType: 'borrow'
      });
    } catch (error) {
      setMessage({ 
        text: `Failed to ${formData.transactionType} book: ${error instanceof Error ? error.message : 'Unknown error'}`, 
        type: 'error' 
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
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H6z" clipRule="evenodd" />
          </svg>
          <h2 className="text-xl font-bold">Issue Book</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="bookId" className="block text-sm font-medium text-gray-700 mb-1">
                Book ID
              </label>
              <input
                type="text"
                id="bookId"
                name="bookId"
                value={formData.bookId}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-200 rounded border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-200 rounded border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                Student ID
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-200 rounded border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="bookTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Book Title
              </label>
              <input
                type="text"
                id="bookTitle"
                name="bookTitle"
                value={formData.bookTitle}
                onChange={handleChange}
                className="w-full p-2 bg-gray-200 rounded border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-200 rounded border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {message.text && (
            <div className={`mt-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message.text}
            </div>
          )}

          <div className="mt-6">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, transactionType: 'borrow' }))}
                className={`py-2 px-4 text-sm font-medium rounded-l-md focus:z-10 focus:ring-2 focus:ring-blue-500 
                  ${formData.transactionType === 'borrow' 
                    ? 'bg-[#255D81] text-white hover:bg-[#255D90]' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Borrow
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, transactionType: 'return' }))}
                className={`py-2 px-4 text-sm font-medium rounded-r-md focus:z-10 focus:ring-2 focus:ring-blue-500
                  ${formData.transactionType === 'return' 
                    ? 'bg-amber-600 text-white hover:bg-amber-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Return
              </button>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`ml-4 ${formData.transactionType === 'borrow' 
                ? 'bg-[#255D81] hover:bg-[#255D90]' 
                : 'bg-amber-600 hover:bg-amber-700'} 
                text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueBook;