import React, { useState, useEffect } from "react";
import { Author } from "../../types";

interface AuthorFormProps {
  onSubmit: (author: Author) => void;
  author?: Author;
  isEditing: boolean;
  onCancel?: () => void;
  loading: boolean;
  error: string | null;
}

export const AuthorForm: React.FC<AuthorFormProps> = ({
  onSubmit,
  author,
  isEditing,
  onCancel,
  loading,
  error
}) => {
  const [author_id, setAuthorId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  useEffect(() => {
    if (author) {
      setAuthorId(author.author_id.toString());
      setName(author.name);
      setBio(author.bio);
    } else {
      setAuthorId("");
      setName("");
      setBio("");
    }
  }, [author]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ 
      author_id: parseInt(author_id), 
      name, 
      bio 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded"
          rows={3}
        />
      </div>
      
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-[#1B4965] text-white px-4 py-2 rounded hover:bg-[#1B4965]/90 transition-colors disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Processing..." : isEditing ? "Update Author" : "Add Author"}
        </button>
        
        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
