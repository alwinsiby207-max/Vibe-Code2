import React from 'react';

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  unreadCount?: number;
  hasFeedbackReady?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onNavigate,
  unreadCount = 0,
  hasFeedbackReady = true,
}) => {
  const navItems = [
    { id: 'explore', label: 'Explore', icon: 'explore' },
    { id: 'my-hacks', label: 'My Hacks', icon: 'calendar_month', badge: hasFeedbackReady },
    { id: 'projects', label: 'Projects', icon: 'auto_awesome' },
    { id: 'alerts', label: 'Alerts', icon: 'notifications', count: unreadCount },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#fff9ef]/95 backdrop-blur-lg border-t border-[#d5c3b6]/50 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="max-w-md mx-auto h-16 flex items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors relative group ${
                isActive ? 'text-[#6f4315]' : 'text-[#71594f] hover:text-[#1d1b16]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={`material-symbols-outlined text-[22px] transition-transform ${
                    isActive ? 'font-bold scale-105' : 'group-hover:scale-105'
                  }`}
                >
                  {item.icon}
                </span>

                {item.badge && item.id === 'my-hacks' && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-[#8b5a2b] text-[9px] font-bold text-white rounded-full leading-tight">
                    Review
                  </span>
                )}

                {item.count && item.count > 0 ? (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 bg-[#ba1a1a] text-[9px] font-bold text-white rounded-full leading-tight">
                    {item.count}
                  </span>
                ) : null}
              </div>
              <span
                className={`text-[11px] font-semibold mt-1 tracking-tight ${
                  isActive ? 'text-[#6f4315] font-bold' : 'text-[#71594f]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
