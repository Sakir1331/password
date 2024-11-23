import { useState } from "react";
import { Eye, EyeOff, Loader2, MoreVertical, Moon, Sun } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import GoogleLogo from "@/components/GoogleLogo";

const Index = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isArabic, setIsArabic] = useState(true);
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const isFormValid = oldPassword && newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 transition-colors ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="flex items-center justify-between py-4">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <MoreVertical className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          
          <GoogleLogo />
          
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

            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-google-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue disabled:opacity-50 disabled:cursor-not-allowed dark:ring-offset-gray-900"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "تغيير كلمة المرور"
                )}
              </button>

              <button
                type="button"
                className="w-8 h-8 rounded-full bg-google-blue text-white flex items-center justify-center self-end hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue dark:ring-offset-gray-900"
              >
                <Eye size={16} />
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