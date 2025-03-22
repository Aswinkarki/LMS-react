// src/components/students/StudentListItem.tsx

import React from 'react';
import { Student } from '../../types/index';
import { Pencil, Trash2 } from 'lucide-react';

interface StudentListItemProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

export const StudentListItem: React.FC<StudentListItemProps> = ({ 
  student, 
  onEdit, 
  onDelete 
}) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="p-2">{student.student_id}</td>
      <td className="p-2">{student.student_name}</td>
      <td className="p-2">{student.department}</td>
      <td className="p-2">{student.email}</td>
      <td className="p-2">{student.contact_number}</td>
      <td className="p-2 flex">
        <button
          className="text-blue-600 hover:text-blue-800 mr-2"
          onClick={() => onEdit(student)}
          aria-label="Edit student"
        >
          <Pencil size={18} />
        </button>
        <button
          className="text-red-600 hover:text-red-800"
          onClick={() => onDelete(student.student_id)}
          aria-label="Delete student"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};
