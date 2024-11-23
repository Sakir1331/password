import React from 'react';
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export const PasswordInput = ({
  id,
  value,
  onChange,
  label,
  showPassword,
  onTogglePassword
}: PasswordInputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-google-text dark:text-white mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 pr-10 border border-google-border rounded-md focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          required
        />
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};