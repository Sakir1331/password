import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const isFormValid = oldPassword && newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-google-text mb-1">تغيير كلمة المرور</h2>
          <p className="text-sm text-gray-600 mb-8">اختر كلمة مرور قوية ولا تستخدمها مرة أخرى لحسابات أخرى</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="oldPassword" className="block text-sm font-medium text-google-text mb-1">
                كلمة المرور الحالية
              </label>
              <div className="relative">
                <input
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-google-border rounded-md focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-google-text mb-1">
                كلمة المرور الجديدة
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-google-border rounded-md focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">استخدم 8 أحرف على الأقل</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-google-text mb-1">
                تأكيد كلمة المرور الجديدة
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-google-border rounded-md focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {newPassword && confirmPassword && newPassword !== confirmPassword && (
                <p className="mt-1 text-sm text-google-red">كلمات المرور غير متطابقة</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-google-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "تغيير كلمة المرور"
            )}
          </button>
        </form>

        <div className="flex justify-center space-x-4 text-sm mt-8">
          <a href="#" className="text-google-blue hover:underline">نسيت كلمة المرور؟</a>
          <span className="text-gray-500">•</span>
          <a href="#" className="text-google-blue hover:underline">العودة إلى الصفحة الرئيسية</a>
        </div>
      </div>
    </div>
  );
};

export default Index;