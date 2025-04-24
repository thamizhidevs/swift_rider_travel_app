
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Register() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'rider' | 'driver' | null>(null);

  // Step 1: Choose role
  if (step === 1) {
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
          <div>
            <Link to="/" className="flex justify-center items-center mb-8">
              <div className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-light to-purple animate-pulse-light"></div>
              <span className="ml-4 text-4xl font-bold text-gray-800 font-display tracking-tight text-glitch">SwiftRide</span>
            </Link>
            <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900 font-display tracking-tight animate-typing">Create an Account</h2>
            <p className="mt-2 text-center text-md text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-purple hover:text-purple-dark underline underline-offset-2">
                Sign in
              </Link>
            </p>
          </div>
          
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-8 text-center">I want to register as a...</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => {
                  setRole('rider');
                  setStep(2);
                }}
                className="flex flex-col items-center p-8 border border-gray-200 rounded-2xl hover:border-purple hover:shadow-lg transition duration-300"
              >
                <div className="h-20 w-20 rounded-full bg-purple-soft/30 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-gray-900">Rider</h3>
                <p className="text-gray-500 text-sm text-center mt-2">Book rides and travel to your destinations</p>
              </button>
              
              <button
                onClick={() => {
                  setRole('driver');
                  setStep(2);
                }}
                className="flex flex-col items-center p-8 border border-gray-200 rounded-2xl hover:border-purple hover:shadow-lg transition duration-300"
              >
                <div className="h-20 w-20 rounded-full bg-purple-soft/30 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-4-4v8m4 8H8m4 4v-8" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-gray-900">Driver</h3>
                <p className="text-gray-500 text-sm text-center mt-2">Drive your car and earn money on your schedule</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Step 2: Registration form based on role
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
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] mix-blend-soft-light opacity-15 pointer-events-none" />
      </div>

      {/* Back Button */}
      <button
        type="button"
        aria-label="Back"
        onClick={() => setStep(1)}
        className="absolute top-7 left-7 z-30 flex items-center text-base font-semibold text-white bg-black/30 rounded-full px-4 py-2 shadow-lg hover:scale-105 transition-transform backdrop-blur-lg"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <ArrowLeft className="mr-2 w-5 h-5" />
        Back
      </button>

      <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl relative z-20 overflow-hidden p-12 animate-fade-in animate-scale-in backdrop-blur-xl border border-white/30">
        <div>
          <Link to="/" className="flex justify-center items-center mb-8">
            <div className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-light to-purple animate-pulse-light"></div>
            <span className="ml-4 text-4xl font-bold text-gray-800 font-display tracking-tight text-glitch">
              SwiftRide
            </span>
          </Link>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900 font-display tracking-tight animate-typing">
            {role === 'rider' ? 'Register as Rider' : 'Register as Driver'}
          </h2>
          <p className="mt-2 text-center text-md text-gray-600">
            <button
              onClick={() => setStep(1)}
              className="font-medium text-purple hover:text-purple-dark underline underline-offset-2"
            >
              &larr; Go back to choose role
            </button>
          </p>
        </div>
        
        <form className="mt-8 space-y-7">
          {/* Common form fields for both */}
          <div>
            <label htmlFor="fullName" className="block text-base font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              className="appearance-none relative block w-full px-4 py-4 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 text-lg focus:outline-none focus:ring-purple focus:border-purple focus:z-10"
              placeholder="John Smith"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none relative block w-full px-4 py-4 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 text-lg focus:outline-none focus:ring-purple focus:border-purple focus:z-10"
              placeholder="you@example.com"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-4 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 text-lg focus:outline-none focus:ring-purple focus:border-purple focus:z-10"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-4 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 text-lg focus:outline-none focus:ring-purple focus:border-purple focus:z-10"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="appearance-none relative block w-full px-4 py-4 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 text-lg focus:outline-none focus:ring-purple focus:border-purple focus:z-10"
              placeholder="(123) 456-7890"
            />
          </div>
          
          {/* Additional fields for driver */}
          {role === 'driver' && (
            <>
              <div>
                <label htmlFor="vehicleType" className="block text-base font-medium text-gray-700 mb-1">
                  Vehicle Type
                </label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  required
                  className="appearance-none relative block w-full px-4 py-4 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 text-lg focus:outline-none focus:ring-purple focus:border-purple focus:z-10"
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="van">Van</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="vehicleModel" className="block text-base font-medium text-gray-700 mb-1">
                  Vehicle Model
                </label>
                <input
                  id="vehicleModel"
                  name="vehicleModel"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-4 py-4 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 text-lg focus:outline-none focus:ring-purple focus:border-purple focus:z-10"
                  placeholder="Toyota Camry, Honda Accord, etc."
                />
              </div>
              
              <div>
                <label htmlFor="licensePlate" className="block text-base font-medium text-gray-700 mb-1">
                  License Plate Number
                </label>
                <input
                  id="licensePlate"
                  name="licensePlate"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-4 py-4 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 text-lg focus:outline-none focus:ring-purple focus:border-purple focus:z-10"
                  placeholder="ABC1234"
                />
              </div>
            </>
          )}
          
          <div className="flex items-center">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              required
              className="h-5 w-5 text-purple focus:ring-purple border-gray-300 rounded"
            />
            <label htmlFor="agreeTerms" className="ml-2 block text-base text-gray-900">
              I agree to the{" "}
              <a href="#" className="text-purple hover:text-purple-dark">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-purple hover:text-purple-dark">
                Privacy Policy
              </a>
            </label>
          </div>
          
          <button
            type="submit"
            className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-semibold rounded-xl text-white bg-purple hover:bg-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple shadow-md mt-4"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
