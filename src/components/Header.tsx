import React from 'react';
import { Role } from '../types';
import { HackBridgeLogo } from './HackBridgeLogo';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onBack?: () => void;
  showBack?: boolean;
  title?: string;
  activeRole: Role;
  onToggleRole: (role: Role) => void;
  unreadCount: number;
  onOpenStudentDashboard?: () => void;
  onOpenOrganizerDesk?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onBack,
  showBack,
  title,
  activeRole,
  onToggleRole,
  unreadCount,
  onOpenStudentDashboard,
  onOpenOrganizerDesk,
}) => {
  return (
    <header className="sticky top-0 w-full z-40 bg-[#fff9ef]/95 backdrop-blur-md border-b border-[#d5c3b6]/40 transition-all">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Left Zone: Back button (if applicable) + Brand logo & view title */}
        <div className="flex items-center gap-2.5 min-w-0">
          {showBack ? (
            <button
              onClick={onBack || (() => onNavigate('explore'))}
              aria-label="Back"
              className="w-9 h-9 -ml-1 flex items-center justify-center rounded-full text-[#1d1b16] hover:bg-[#f3ede4] active:bg-[#ede7de] transition-colors shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          ) : null}

          <div
            onClick={() => onNavigate('explore')}
            className="flex items-center gap-2 cursor-pointer group select-none min-w-0"
          >
            {showBack ? (
              <div className="flex items-center gap-2 min-w-0">
                <HackBridgeLogo size="sm" showText={false} />
                <span className="text-[#d5c3b6] text-sm hidden xs:inline select-none">/</span>
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-[#1d1b16] truncate">
                  {title || 'HackBridge'}
                </h1>
              </div>
            ) : (
              /* On Explore (Image 3), display the new 3D arched bridge emblem + wordmark + tagline */
              <HackBridgeLogo size="md" showText={true} showTagline={true} />
            )}
          </div>
        </div>

        {/* Center / Role Indicator Switcher */}
        <div className="hidden md:flex items-center bg-[#f3ede4] p-1 rounded-full text-xs font-semibold text-[#51443a]">
          <button
            onClick={() => onToggleRole('student')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeRole === 'student'
                ? 'bg-[#ffffff] text-[#1d1b16] shadow-xs font-bold'
                : 'hover:text-[#1d1b16]'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => onToggleRole('faculty')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeRole === 'faculty'
                ? 'bg-[#ffffff] text-[#8b5a2b] shadow-xs font-bold'
                : 'hover:text-[#1d1b16]'
            }`}
          >
            Faculty 🎓
          </button>
          <button
            onClick={() => onToggleRole('organizer')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeRole === 'organizer'
                ? 'bg-[#ffffff] text-[#6f4315] shadow-xs font-bold'
                : 'hover:text-[#1d1b16]'
            }`}
          >
            Organizer ⚙️
          </button>
        </div>

        {/* Right Zone: Dedicated Student Dashboard Button OR Organizer Desk Button, Alerts, Profile */}
        <div className="flex items-center gap-2 shrink-0">
          {/* SEPARATE BUTTON IN STUDENT MODE */}
          {activeRole === 'student' && onOpenStudentDashboard && (
            <button
              onClick={onOpenStudentDashboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8b5a2b] hover:bg-[#70451f] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
              title="View your submitted projects and performance graph"
            >
              <span className="material-symbols-outlined text-[16px]">analytics</span>
              <span className="hidden sm:inline">My Submissions & Graph</span>
              <span className="sm:hidden">Submissions</span>
            </button>
          )}

          {/* ORGANIZER MODE: Desk Button */}
          {activeRole === 'organizer' && onOpenOrganizerDesk && (
            <button
              onClick={onOpenOrganizerDesk}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#6f4315] hover:bg-[#5a3610] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Open Evaluation & Selected Team List"
            >
              <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
              <span>Selection Desk</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('alerts')}
            aria-label="Notifications"
            className="relative w-9 h-9 flex items-center justify-center rounded-full text-[#1d1b16] hover:bg-[#f3ede4] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a]" />
            )}
          </button>

          <button
            onClick={() => onNavigate('profile')}
            aria-label="User Profile"
            className="w-9 h-9 rounded-full bg-[#8b5a2b] text-[#ffffff] flex items-center justify-center font-semibold text-xs shadow-xs hover:bg-[#6f4315] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
