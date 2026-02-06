
import React, { useState } from 'react';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background-dark relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -right-1/4 size-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-1/4 -left-1/4 size-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[440px] z-10 flex flex-col items-center">
        <div className="mb-8 flex items-center gap-3">
          <div className="size-12 bg-primary rounded-xl flex items-center justify-center shadow-2xl shadow-primary/40">
            <span className="material-symbols-outlined text-white font-bold text-2xl">bolt</span>
          </div>
          <h2 className="text-white text-3xl font-black tracking-tight">SalesAI</h2>
        </div>

        <div className="w-full bg-surface-dark/80 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/5 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
              {isLogin ? 'Welcome back' : 'Start your free trial'}
            </h1>
            <p className="text-slate-400 text-sm">
              {isLogin ? 'Enter your credentials to access your dashboard' : 'No credit card required. Onboard in seconds.'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Alex Rivera"
                  className="w-full bg-background-dark/50 border-border-dark rounded-xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 text-white placeholder:text-slate-600 transition-all outline-none" 
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Work Email</label>
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full bg-background-dark/50 border-border-dark rounded-xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 text-white placeholder:text-slate-600 transition-all outline-none" 
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5 ml-1">
                <label className="text-sm font-medium text-slate-300">Password</label>
                {isLogin && <a className="text-xs font-bold text-primary hover:text-blue-400" href="#">Forgot?</a>}
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-background-dark/50 border-border-dark rounded-xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 text-white placeholder:text-slate-600 transition-all outline-none" 
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-2"
            >
              {isLogin ? 'Sign in to Dashboard' : 'Create My Account'}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-dark"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-surface-dark px-3 text-slate-500">Or continue with</span></div>
          </div>

          <button className="w-full h-12 bg-white/5 border border-border-dark hover:bg-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 text-sm">
            <div className="size-5 bg-slate-400 rounded-full"></div>
            Google Account
          </button>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"} 
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="ml-1 font-bold text-primary hover:underline transition-all"
              >
                {isLogin ? 'Sign up for free' : 'Log in here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
