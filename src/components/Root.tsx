import { useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router';
import { useApp } from '../context/AppContext';
import { Home, Pill, Calendar, MessageSquare, Settings as SettingsIcon } from 'lucide-react';
import { useKeyboardManager } from '../hooks/useKeyboardManager';
import { MobileKeyboard } from './MobileKeyboard';

export const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, leftHandMode } = useApp();
  const mainRef = useRef<HTMLDivElement>(null);
  
  const { 
    isKeyboardVisible, 
    keyboardType, 
    handleKeyPress, 
    closeKeyboard 
  } = useKeyboardManager(mainRef);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { path: '/', icon: Home, label: 'Today' },
    { path: '/medications', icon: Pill, label: 'Meds' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/communications', icon: MessageSquare, label: 'Messages' },
    { path: '/settings', icon: SettingsIcon, label: 'Settings' },
  ];

  const orderedNavItems = leftHandMode ? navItems : navItems;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-screen overflow-x-hidden">
      <main 
        className={`flex-1 pb-20 landscape:pb-16 overflow-y-scroll ${leftHandMode ? 'scrollbar-left' : ''} ${isKeyboardVisible ? 'keyboard-visible' : ''}`}
        style={{ 
          WebkitOverflowScrolling: 'touch'
        }}
        ref={mainRef}
      >
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom landscape-compact-nav z-50">
        <div className="flex items-center justify-around px-2 py-2 landscape:py-1 max-w-[480px] landscape:max-w-full mx-auto">
          {orderedNavItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col landscape:flex-row items-center justify-center min-w-[56px] min-h-[56px] landscape:min-h-[48px] px-3 landscape:px-4 py-2 landscape:py-1 landscape:gap-2 rounded-xl transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-6 h-6 landscape:w-5 landscape:h-5 mb-1 landscape:mb-0" />
                <span className="text-xs landscape:text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Keyboard */}
      {isKeyboardVisible && (
        <MobileKeyboard
          type={keyboardType}
          onKeyPress={handleKeyPress}
          onClose={closeKeyboard}
          leftHandMode={leftHandMode}
        />
      )}
    </div>
  );
};