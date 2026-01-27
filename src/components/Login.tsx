import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Fingerprint, Lock } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, leftHandMode, setLeftHandMode, biometricEnabled } = useApp();
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcode, setPasscode] = useState('');
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
              {biometricEnabled && (
                <button
                  onClick={handleBiometric}
                  className="w-full bg-blue-600 text-white rounded-xl p-6 font-medium shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 min-h-[56px]"
                >
                  <Fingerprint className="w-6 h-6" />
                  Sign in with Biometrics
                </button>
              )}
              <button
                onClick={() => setShowPasscode(true)}
                className="w-full bg-white border-2 border-gray-200 text-gray-900 rounded-xl p-6 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 min-h-[56px]"
              >
                <Lock className="w-6 h-6" />
                Use Passcode
              </button>
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