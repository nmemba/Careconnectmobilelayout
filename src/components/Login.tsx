import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Fingerprint, Lock, User, Eye, EyeOff } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, leftHandMode, setLeftHandMode, biometricEnabled } = useApp();
  const [showPasscode, setShowPasscode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isOnboarding, setIsOnboarding] = useState(() => {
    return !localStorage.getItem('onboardingComplete');
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleBiometric = () => {
    // Simulate biometric authentication
    setTimeout(() => {
      login();
      if (isOnboarding) {
        localStorage.setItem('onboardingComplete', 'true');
      }
      navigate('/');
    }, 500);
  };

  const handlePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.length >= 4) {
      login();
      if (isOnboarding) {
        localStorage.setItem('onboardingComplete', 'true');
      }
      navigate('/');
    }
  };

  const handleUsernamePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    // Validate inputs
    if (!username || !password) {
      setLoginError('Please enter both username and password');
      return;
    }

    // Demo credentials - in production, this would authenticate against a real backend
    if (username === 'demo' && password === 'demo123') {
      login();
      if (isOnboarding) {
        localStorage.setItem('onboardingComplete', 'true');
      }
      navigate('/');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleOnboardingComplete = () => {
    setIsOnboarding(false);
    localStorage.setItem('onboardingComplete', 'true');
  };

  if (isOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">CC</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome to CareConnect</h1>
              <p className="mt-2 text-gray-600">Let's personalize your experience</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Hand Preference</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Choose your preferred hand for easier one-handed use. This moves buttons and controls to your thumb zone.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLeftHandMode(false)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      !leftHandMode
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">🤚</div>
                      <div className="font-medium text-sm">Right Hand</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setLeftHandMode(true)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      leftHandMode
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">🖐️</div>
                      <div className="font-medium text-sm">Left Hand</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`p-6 bg-white border-t border-gray-200 ${leftHandMode ? 'text-left' : 'text-right'}`}>
          <button
            onClick={handleOnboardingComplete}
            className={`px-8 py-4 bg-blue-600 text-white rounded-xl font-medium shadow-sm hover:bg-blue-700 transition-colors min-w-[56px] min-h-[56px] ${
              leftHandMode ? 'float-left' : 'float-right'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col max-w-screen overflow-x-hidden">
      <div className="flex-1 flex flex-col landscape:flex-row items-center justify-center px-6 landscape:px-8 py-12 landscape:py-6 landscape:gap-12">
        <div className="w-full max-w-sm landscape:max-w-md space-y-8 landscape:space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">CC</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">CareConnect</h1>
            <p className="mt-2 text-gray-600">Your health, simplified</p>
          </div>

          {!showPasscode ? (
            <div className="space-y-4">
              {/* Username & Password Form */}
              <form onSubmit={handleUsernamePasswordLogin} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Sign In</h2>
                
                {loginError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {loginError}
                  </div>
                )}

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 min-h-[56px]"
                      placeholder="Enter your username"
                      autoComplete="username"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 min-h-[56px]"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-xl py-4 font-medium shadow-sm hover:bg-blue-700 transition-colors min-h-[56px]"
                >
                  Sign In
                </button>

                <p className="text-xs text-center text-gray-500">
                  Demo credentials: username: <span className="font-medium">demo</span>, password: <span className="font-medium">demo123</span>
                </p>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-b from-blue-50 to-white text-gray-500">Or sign in with</span>
                </div>
              </div>

              {/* Alternative Login Methods */}
              <div className="space-y-3">
                {biometricEnabled && (
                  <button
                    onClick={handleBiometric}
                    className="w-full bg-white border-2 border-gray-200 text-gray-900 rounded-xl p-4 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 min-h-[56px]"
                  >
                    <Fingerprint className="w-6 h-6" />
                    Sign in with Biometrics
                  </button>
                )}
                <button
                  onClick={() => setShowPasscode(true)}
                  className="w-full bg-white border-2 border-gray-200 text-gray-900 rounded-xl p-4 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 min-h-[56px]"
                >
                  <Lock className="w-6 h-6" />
                  Use Passcode
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePasscode} className="space-y-4">
              <div>
                <label htmlFor="passcode" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Passcode
                </label>
                <input
                  type="password"
                  id="passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 text-lg text-center tracking-widest min-h-[56px]"
                  placeholder="••••"
                  maxLength={6}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-xl p-4 font-medium shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50 min-h-[56px]"
                disabled={passcode.length < 4}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setShowPasscode(false)}
                className="w-full text-blue-600 p-4 font-medium min-h-[56px]"
              >
                Back
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};