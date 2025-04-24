
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";

export default function Login() {
  const [activeRole, setActiveRole] = useState<'rider' | 'driver'>('rider');
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      if (activeRole === 'rider') {
        navigate('/rider/dashboard');
      } else {
        navigate('/driver/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Image with slow-zoom */}
      <img
        src="/photo-1488590528505-98d2b5aba04b"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center z-0 slow-zoom opacity-60"
        style={{ pointerEvents: 'none' }}
      />

      {/* Overlay gradients, floating blobs, and fade-in noise */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-gradient-to-br from-purple-300 via-purple-100 to-transparent rounded-full opacity-70 blur-3xl animate-fade-in"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tr from-purple-300/50 via-transparent to-transparent rounded-full blur-2xl opacity-70 animate-fade-in"></div>
        <div className="absolute top-1/4 left-1/2 w-44 h-44 bg-pink-100/70 rounded-full filter blur-3xl opacity-50 animate-float" style={{ animationDuration: '7s' }}></div>
        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] mix-blend-soft-light opacity-15 pointer-events-none" />
      </div>

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-7 left-7 z-30 flex items-center text-base font-semibold text-white bg-black/20 rounded-full px-4 py-2 shadow-lg hover:scale-105 transition-transform backdrop-blur-lg"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <ArrowLeft className="mr-2 w-5 h-5" />
        Back
      </Link>

      <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl relative z-20 overflow-hidden p-12 animate-fade-in animate-scale-in backdrop-blur-xl border border-white/30">
        <div className="flex justify-center items-center mb-8">
          <div className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-light to-purple animate-pulse-light"></div>
          <span className="ml-4 text-4xl font-bold text-gray-800 font-display tracking-tight text-glitch">
            SwiftRide
          </span>
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900 font-display tracking-tight animate-typing">
          Login to Continue
        </h2>
        <p className="mt-2 text-center text-md text-gray-600">
          Or{" "}
          <Link to="/register" className="font-medium text-purple hover:text-purple-dark underline underline-offset-2">
            create a new account
          </Link>
        </p>
        
        {/* Role Selector */}
        <div className="flex bg-gray-100 rounded-2xl p-1 mt-6 shadow-inner">
          <button
            type="button"
            className={`flex-1 py-3 px-6 rounded-xl text-md font-semibold transition-colors duration-200 ${
              activeRole === 'rider'
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-500 hover:text-gray-900'
            }`}
            onClick={() => setActiveRole('rider')}
          >
            Login as Rider
          </button>
          <button
            type="button"
            className={`flex-1 py-3 px-6 rounded-xl text-md font-semibold transition-colors duration-200 ${
              activeRole === 'driver'
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-500 hover:text-gray-900'
            }`}
            onClick={() => setActiveRole('driver')}
          >
            Login as Driver
          </button>
        </div>

        <form className="mt-8 space-y-7" onSubmit={handleSubmit}>
          <div className="rounded-xl shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-t-xl relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 text-lg focus:outline-none focus:ring-purple focus:border-purple focus:z-10"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-b-xl relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 text-lg focus:outline-none focus:ring-purple focus:border-purple focus:z-10"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-5 w-5 text-purple focus:ring-purple border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-base text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-purple hover:text-purple-dark">
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-semibold rounded-xl text-white bg-purple hover:bg-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple disabled:opacity-70 shadow-md mt-4"
          >
            {isSubmitting ? (
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Check className="h-6 w-6 text-purple-light group-hover:text-white" />
              </span>
            )}
            Sign in as {activeRole === 'rider' ? 'Rider' : 'Driver'}
          </button>
        </form>
        
        {/* Social Login Options */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-lg">
              <span className="px-3 bg-white/70 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-4 justify-center">
            <a href="#" className="inline-flex justify-center py-3 px-6 border border-gray-300 rounded-lg shadow bg-white/80 text-lg font-medium text-gray-500 hover:bg-gray-50 hover:scale-105 transition-transform">
              {/* Google */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="inline-flex justify-center py-3 px-6 border border-gray-300 rounded-lg shadow bg-white/80 text-lg font-medium text-gray-500 hover:bg-gray-50 hover:scale-105 transition-transform">
              {/* Github */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" className="inline-flex justify-center py-3 px-6 border border-gray-300 rounded-lg shadow bg-white/80 text-lg font-medium text-gray-500 hover:bg-gray-50 hover:scale-105 transition-transform">
              {/* Github again for demo */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
