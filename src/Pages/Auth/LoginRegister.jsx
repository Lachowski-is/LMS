import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertTriangle } from 'lucide-react';

export default function LoginRegister() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    // Form Inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    // States
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    // Live validation states
    const [emailTouched, setEmailTouched] = useState(false);
    const [nameTouched, setNameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

    // Reset states on toggle
    useEffect(() => {
        setErrors({});
        setEmailTouched(false);
        setNameTouched(false);
        setPasswordTouched(false);
        setConfirmPasswordTouched(false);
        setEmail('');
        setName('');
        setPassword('');
        setConfirmPassword('');
        setShowPassword(false);
        setShowConfirmPassword(false);
    }, [isLogin]);

    // Password Strength evaluation
    const getPasswordStrength = (pw) => {
        let score = 0;
        if (!pw) return { score, label: 'None', color: 'bg-zinc-200' };
        if (pw.length >= 6) score += 1;
        if (/[0-9]/.test(pw) && /[a-zA-Z]/.test(pw)) score += 1;
        if (/[^A-Za-z0-9]/.test(pw)) score += 1;

        if (score === 1) return { score, label: 'Weak', color: 'bg-red-500', text: 'text-red-500' };
        if (score === 2) return { score, label: 'Medium', color: 'bg-amber-500', text: 'text-amber-500' };
        if (score === 3) return { score, label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-500' };
        return { score, label: 'Weak', color: 'bg-red-500', text: 'text-red-500' };
    };

    const strength = getPasswordStrength(password);

    // Live validations
    useEffect(() => {
        const newErrors = {};

        if (emailTouched && email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                newErrors.email = 'Please enter a valid email address';
            }
        }

        if (!isLogin) {
            if (nameTouched && name.trim().length < 3) {
                newErrors.name = 'Name must be at least 3 characters';
            }
            if (passwordTouched && password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters';
            }
            if (confirmPasswordTouched && password !== confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
    }, [email, password, name, confirmPassword, isLogin, emailTouched, nameTouched, passwordTouched, confirmPasswordTouched]);

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Touch all inputs
        setEmailTouched(true);
        setNameTouched(true);
        setPasswordTouched(true);
        setConfirmPasswordTouched(true);

        const currentErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) currentErrors.email = 'Email is required';
        else if (!emailRegex.test(email)) currentErrors.email = 'Email is invalid';

        if (!password) currentErrors.password = 'Password is required';

        if (!isLogin) {
            if (!name) currentErrors.name = 'Full name is required';
            if (password.length < 6) currentErrors.password = 'Password must be at least 6 characters';
            if (password !== confirmPassword) currentErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 1800);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] font-sans antialiased text-slate-800 flex flex-col justify-center items-center p-6 selection:bg-indigo-500/10 selection:text-indigo-600">

            {/* Visual card container */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[400px] bg-white border border-slate-200/60 rounded-2xl p-8 sm:p-10 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
            >
                {/* Branding Brand logo centered */}
                <div className="text-center select-none">
                    <img src="/Lumora.png" alt="Lumora" className="w-9 h-9 mx-auto mb-3.5 object-cover" />
                    <h2 className="font-heading text-xl font-bold tracking-tight text-slate-900">
                        {isLogin ? 'Sign in to Lumora' : 'Create an Account'}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 font-sans">
                        {isLogin ? 'Enter your credentials to access your academy' : 'Fill in the details below to register your profile'}
                    </p>
                </div>

                {/* Segmented control tab switcher */}
                <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100/80 rounded-lg text-xs font-semibold select-none">
                    <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className={`py-1.5 rounded-md transition-all cursor-pointer ${isLogin ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Sign In
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className={`py-1.5 rounded-md transition-all cursor-pointer ${!isLogin ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Register
                    </button>
                </div>

                {/* Form fields */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isLogin ? "login" : "register"}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Name Input (Registration only) */}
                            {!isLogin && (
                                <div className="space-y-1.5 text-left">
                                    <label className="block text-xs font-medium text-slate-500">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onBlur={() => setNameTouched(true)}
                                        className={`w-full h-10 px-3 bg-slate-50/50 border rounded-lg text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200'}`}
                                        placeholder="John Doe"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-[10px] font-semibold text-red-500 flex items-center gap-1 mt-1">
                                            <AlertTriangle size={10} /> {errors.name}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Email Input */}
                            <div className="space-y-1.5 text-left">
                                <label className="block text-xs font-medium text-slate-500">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={() => setEmailTouched(true)}
                                    className={`w-full h-10 px-3 bg-slate-50/50 border rounded-lg text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200'}`}
                                    placeholder="name@example.com"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-[10px] font-semibold text-red-500 flex items-center gap-1 mt-1">
                                        <AlertTriangle size={10} /> {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div className="space-y-1.5 text-left relative">
                                <div className="flex justify-between items-center text-left">
                                    <label className="block text-xs font-medium text-slate-500">Password</label>
                                    {isLogin && (
                                        <button
                                            type="button"
                                            className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                                        >
                                            Forgot?
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onBlur={() => setPasswordTouched(true)}
                                        className={`w-full h-10 pl-3 pr-10 bg-slate-50/50 border rounded-lg text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 ${errors.password ? 'border-red-400' : 'border-slate-200'}`}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-500 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                </div>
                            </div>

                            {/* Password Strength validation indicators (Register display) */}
                            {!isLogin && password && (
                                <div className="p-2.5 border border-slate-100 bg-slate-50/50 rounded-lg space-y-1">
                                    <div className="flex justify-between items-center text-[9px] font-bold">
                                        <span className="text-slate-400">STRENGTH:</span>
                                        <span className={strength.text}>{strength.label.toUpperCase()}</span>
                                    </div>
                                    <div className="h-0.5 bg-slate-200 rounded-full overflow-hidden flex">
                                        <div
                                            className={`h-full ${strength.color} transition-all duration-300`}
                                            style={{ width: `${(strength.score / 3) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Confirm Password Input (Register only) */}
                            {!isLogin && (
                                <div className="space-y-1.5 text-left">
                                    <label className="block text-xs font-medium text-slate-500">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            onBlur={() => setConfirmPasswordTouched(true)}
                                            className={`w-full h-10 pl-3 pr-10 bg-slate-50/50 border rounded-lg text-xs text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 ${errors.confirmPassword ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200'}`}
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-3 text-slate-400 hover:text-slate-500 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-[10px] font-semibold text-red-500 flex items-center gap-1 mt-1">
                                            <AlertTriangle size={10} /> {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Underline Remember Me (Login display) */}
                            {isLogin && (
                                <div className="flex items-center select-none pt-1">
                                    <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer text-[11px] font-medium">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="rounded cursor-pointer accent-indigo-600 w-3.5 h-3.5 border-slate-300"
                                        />
                                        Remember this device
                                    </label>
                                </div>
                            )}

                            {/* Submit Button (Accent Highlight Color solid) */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full h-10 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${isLoading ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-[0.99] cursor-pointer shadow-sm'}`}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 rounded-full border-2 border-white/60 border-t-transparent animate-spin"></div>
                                ) : (
                                    <>
                                        {isLogin ? "Sign In" : "Register Profile"}
                                        <ArrowRight size={13} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </AnimatePresence>

            </motion.div>

            {/* Demo Links */}
            <div className="mt-5 text-center">
                <p className="text-[10px] font-medium text-slate-400 mb-2.5 uppercase tracking-widest">Demo Access</p>
                <div className="flex flex-wrap gap-2 justify-center">
                    <button onClick={() => navigate('/admin')} className="px-5 py-2.5 bg-white border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/50 text-slate-600 hover:text-indigo-700 rounded-lg text-xs font-semibold transition-all">Admin</button>
                    <button onClick={() => navigate('/teacher')} className="px-5 py-2.5 bg-white border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/50 text-slate-600 hover:text-emerald-700 rounded-lg text-xs font-semibold transition-all">Teacher</button>
                    <button onClick={() => navigate('/student/courses')} className="px-5 py-2.5 bg-white border border-slate-200 hover:border-amber-200 hover:bg-amber-50/50 text-slate-600 hover:text-amber-700 rounded-lg text-xs font-semibold transition-all">Student</button>
                </div>
            </div>

            {/* Access Granted Success Overlay */}
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/10 backdrop-blur-[1px] z-50 flex items-center justify-center p-4 selection:bg-none"
                    >
                        <motion.div
                            initial={{ scale: 0.96, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.96, opacity: 0 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            className="bg-white border border-slate-200 rounded-2xl p-7 max-w-sm w-full text-center shadow-2xl flex flex-col items-center"
                        >
                            {/* Checkmark circle svg */}
                            <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 shrink-0 border border-emerald-100 shadow-sm">
                                <motion.svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <motion.polyline
                                        points="20 6 9 17 4 12"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
                                    />
                                </motion.svg>
                            </div>

                            <h3 className="font-heading text-sm font-semibold text-slate-800 tracking-tight">Access Granted</h3>
                            <p className="text-[11px] text-slate-400 mt-1 max-w-[200px]">Credentials verified. Launching credentials dashboard.</p>

                            {/* Line status transition */}
                            <div className="flex gap-1 mt-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0s' }}></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
