import React from 'react';
import { HelpCircle, Loader2 } from "lucide-react";
import { PasswordInput } from './PasswordInput';

interface PasswordFormProps {
  oldPassword: string;
  setOldPassword: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  showOldPassword: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  toggleOldPassword: () => void;
  toggleNewPassword: () => void;
  toggleConfirmPassword: () => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  errors: {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  };
}

export const PasswordForm = ({
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showOldPassword,
  showNewPassword,
  showConfirmPassword,
  toggleOldPassword,
  toggleNewPassword,
  toggleConfirmPassword,
  isLoading,
  handleSubmit,
  errors
}: PasswordFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <PasswordInput
          id="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          label="كلمة المرور الحالية"
          showPassword={showOldPassword}
          onTogglePassword={toggleOldPassword}
          error={errors.oldPassword}
        />

        <div className="space-y-2">
          <PasswordInput
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            label="كلمة المرور الجديدة"
            showPassword={showNewPassword}
            onTogglePassword={toggleNewPassword}
            error={errors.newPassword}
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            استخدم 8 أحرف على الأقل مع حرف كبير ورقم واحد على الأقل.{" "}
            <span className="text-google-blue inline-flex items-center gap-1 cursor-pointer hover:underline">
              لماذا؟
              <HelpCircle className="w-4 h-4 text-google-blue" />
            </span>
          </div>
        </div>

        <PasswordInput
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="تأكيد كلمة المرور الجديدة"
          showPassword={showConfirmPassword}
          onTogglePassword={toggleConfirmPassword}
          error={errors.confirmPassword}
        />
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="w-auto h-10 px-4 rounded-full flex items-center justify-center text-white bg-google-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue disabled:opacity-50 disabled:cursor-not-allowed dark:ring-offset-gray-900 text-sm"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "تغيير كلمة المرور"
          )}
        </button>
      </div>
    </form>
  );
};