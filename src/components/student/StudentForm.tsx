import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StudentFormProps } from "../../types/index";

interface ExtendedStudentFormProps extends StudentFormProps {
  handleCancel?: () => void;
}

const StudentForm: React.FC<ExtendedStudentFormProps> = ({
  formData,
  editingId,
  handleSubmit: onSubmitProp,
  handleCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  // Reset form with existing data when editing
  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const onSubmit = (data: any) => {
    onSubmitProp({ ...data });
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
        {editingId ? "Update Student" : "Add Student"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Faculty
            </label>
            <input
              type="text"
              {...register("department", { required: "Faculty is required" })}
              className="w-full p-2 bg-gray-200 rounded"
            />
            {errors.department && (
              <p className="text-red-500 text-sm">{errors.department.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            {...register("student_name", { required: "Name is required" })}
            className="w-full p-2 bg-gray-200 rounded"
          />
          {errors.student_name && (
            <p className="text-red-500 text-sm">{errors.student_name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="w-full p-2 bg-gray-200 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact No.
            </label>
            <input
              type="text"
              {...register("contact_number", {
                required: "Contact number is required",
              })}
              className="w-full p-2 bg-gray-200 rounded"
            />
            {errors.contact_number && (
              <p className="text-red-500 text-sm">{errors.contact_number.message}</p>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-[#1B4965] text-white py-2 px-4 rounded hover:bg-blue-900 w-40"
          >
            {editingId ? "Update Student" : "Add Student"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 w-40"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
