import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, X, Lock, Mail, User, Loader2 } from "lucide-react";
import { useUserAuth } from "@/app/utils/context/UserProvider";
import { ToastContainer, toast } from "react-toastify";
import zxcvbn from 'zxcvbn'
type TUserInfo = {
  email: string;
  password: string;
  username: string;
};


type Props = {
  setShowAuth: (show: boolean) => void;
};


export default function AuthModal({ setShowAuth = () => {} }: Partial<Props>) {
  const { setUser, setIsAuth } = useUserAuth();
//   const result = zxcvbn("Tr0ub4dor&3");
// console.log(result.score); // 0–4
// console.log(result.feedback.suggestions); 

  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState<TUserInfo>({
    email: "",
    password: "",
    username: ""
  });
  const [authType, setAuthType] = useState<'Login' | 'Signup'>('Login');
  const [isLoading, setIsLoading] = useState(false);
   const [errors, setErrors] = useState<Partial<TUserInfo>>({});
   const strengthRef  = useRef<HTMLSpanElement>(null)
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  
  function validatePassword(password: string): string[] {
    const errs: string[] = [];
    if (password.length < 8) errs.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errs.push("At least one uppercase letter");
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) errs.push("At least one special character");
    return errs;
  }

  useEffect(() => {
    setPasswordErrors(validatePassword(userData.password));
  }, [userData.password]);

  const validateForm = () => {
    const newErrors: Partial<TUserInfo> = {};
    if (!userData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(userData.email)) newErrors.email = "Invalid email format";
    if (!userData.password) newErrors.password = "Password is required";
    else if (passwordErrors.length > 0) newErrors.password = "Password does not meet requirements";
    if (authType === 'Signup' && !userData.username) newErrors.username = "Username is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function passwordStrength(){
    const strength = zxcvbn(userData.password)    
    console.log(strength.score)
    if(!strengthRef.current){return }
    const bars = strengthRef.current.children
    for(let i =0;i<strengthRef.current.children.length;i++){
      const bar  = bars[i] as HTMLElement
      if(i<strength.score){
          bar.style.backgroundColor='red'
      }else{
        bar.style.backgroundColor="white"
      }
    }
  }

  async function handleSubmit() {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const res = await fetch(`http://localhost:3003/auth/${authType}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" }
      });

      const fetched = await res.json();
      if (fetched?.user?.username && fetched?.user?.email && fetched?.user?.id) {
        setUser({
          token: fetched.accessToken,
          user: {
            username: String(fetched.user.username),
            email: String(fetched.user.email),
            userId: String(fetched.user.id)
          }
        });
        localStorage.setItem('cryptex-token', fetched.accessToken);
        setIsAuth(true);

        setShowAuth(false);
        toast.success(fetched.message);
      } else {
        toast.error(fetched.message || 'Authentication failed');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const inputClasses = (field: keyof TUserInfo) => `
    w-full bg-slate-800 border rounded-xl px-4 py-4 pl-12 text-white placeholder-slate-400
    focus:outline-none transition-all duration-300
    ${errors[field] ? 'border-red-500 bg-red-500/10' : 'border-slate-600 hover:border-slate-500'}
  `;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-md">
        <div className="relative bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-md">
          <div className="relative p-8">
            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-2"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-xl mb-4">
                <Lock className="text-white" size={26} />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Cryptex</h1>
              <p className="text-slate-400 text-sm">
                {authType === 'Login' ? 'Welcome back' : 'Create your account'}
              </p>
            </div>

            <div className="flex bg-slate-800 rounded-xl p-1.5 mb-6 border border-slate-700">
              {(['Login', 'Signup'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setAuthType(type)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    authType === type
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
              {authType === 'Signup' && (
                <div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      value={userData.username}
                      onChange={(e) => setUserData(prev => ({ ...prev, username: e.target.value }))}
                      className={inputClasses('username')}
                      placeholder="Username"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.username && <p className="text-red-400 text-sm">{errors.username}</p>}
                </div>
              )}

              <div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                    className={inputClasses('email')}
                    placeholder="Email"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
              </div>


              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={userData.password}
                    onChange={(e) => {setUserData(prev => ({ ...prev, password: e.target.value })),passwordStrength()}}
                    className={inputClasses('password')}
                    placeholder="Password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <label htmlFor="" className="text-xs">Password Strength</label>
                  <section ref={strengthRef} className="flex w-[70%] justify-between mt-3 ml-4">
                    <div className="w-[20%] h-[5px] transition-colors"></div>
                    <span className="w-[20%] h-[5px]  transition-color"></span>
                    <span className="w-[20%] h-[5px]  transition-colors"></span>
                    <span className="w-[20%] h-[5px]  transition-colors"></span>

                    <span></span>
                  </section>
                {/* ✅ Show password validation messages */}
                {passwordErrors.length > 0 && (
                  <ul className="text-red-400 text-sm mt-1">
                    {passwordErrors.map((err, idx) => (
                      <li key={idx}>• {err}</li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || passwordErrors.length > 0}
                className={`w-full font-semibold py-3 px-4 rounded-xl transition ${
                  passwordErrors.length > 0 || isLoading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : authType}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              {authType === 'Login' ? "Don't have an account?" : 'Already have an account?'}{" "}
              <button
                className="text-blue-400 hover:text-blue-300 font-medium"
                onClick={() => setAuthType(authType === 'Login' ? 'Signup' : 'Login')}
              >
                {authType === 'Login' ? 'Sign up' : 'Log in'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}