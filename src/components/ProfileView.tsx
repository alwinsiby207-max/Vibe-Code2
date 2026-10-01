import React from 'react';
import { Role } from '../types';
import { HackBridgeLogo } from './HackBridgeLogo';

interface ProfileViewProps {
  activeRole: Role;
  onToggleRole: (role: Role) => void;
  onOpenMyHacks: () => void;
  onOpenFeedback: () => void;
  onOpenHostModal: () => void;
  onOpenFacultyPortal: () => void;
  onOpenStudentDashboard?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  activeRole,
  onToggleRole,
  onOpenMyHacks,
  onOpenFeedback,
  onOpenHostModal,
  onOpenFacultyPortal,
  onOpenStudentDashboard,
}) => {
  return (
    <div className="flex flex-col w-full pb-24 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 pt-4 space-y-5">
      {/* Profile Header Card */}
      <div className="bg-[#ffffff] rounded-2xl border border-[#d5c3b6]/50 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#d5c3b6]/30 pb-3">
          <HackBridgeLogo size="sm" subtitle="CAMPUS IDENTITY" />
          <span className="text-[10px] font-bold text-[#775f54] bg-[#fcdcce] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            ASIET Verified
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#6f4315] text-[#fff9ef] flex items-center justify-center font-bold text-xl shadow-xs">
            AS
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#1d1b16]">Alwin Siby</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#fcdcce] text-[#775f54] text-[10px] font-bold">
                Student Builder
              </span>
            </div>
            <p className="text-xs text-[#51443a]">alwinsiby207@gmail.com</p>
            <p className="text-xs text-[#71594f]">
              Adi Shankara Institute of Engineering & Technology (ASIET)
            </p>
          </div>
        </div>

        {/* Role Mode Switcher Card */}
        <div className="p-3 rounded-xl bg-[#f9f3ea] border border-[#d5c3b6]/40 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#71594f] block">
            Switch Active Persona / Role
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onToggleRole('student')}
              className={`py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                activeRole === 'student'
                  ? 'bg-[#1d1b16] text-white shadow-xs'
                  : 'bg-[#ffffff] text-[#51443a] hover:bg-[#f3ede4]'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => onToggleRole('faculty')}
              className={`py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                activeRole === 'faculty'
                  ? 'bg-[#8b5a2b] text-white shadow-xs'
                  : 'bg-[#ffffff] text-[#51443a] hover:bg-[#f3ede4]'
              }`}
            >
              Faculty 🎓
            </button>
            <button
              onClick={() => onToggleRole('organizer')}
              className={`py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                activeRole === 'organizer'
                  ? 'bg-[#6f4315] text-white shadow-xs'
                  : 'bg-[#ffffff] text-[#51443a] hover:bg-[#f3ede4]'
              }`}
            >
              Organizer ⚙️
            </button>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          {onOpenStudentDashboard && (
            <button
              onClick={onOpenStudentDashboard}
              className="p-3 rounded-xl bg-[#8b5a2b] hover:bg-[#70451f] text-white text-left transition-colors cursor-pointer space-y-0.5 shadow-2xs"
            >
              <span className="material-symbols-outlined text-[20px] text-white">
                analytics
              </span>
              <span className="text-xs font-bold text-white block">Submissions & Graph</span>
              <span className="text-[11px] text-white/80">Radar & growth curves</span>
            </button>
          )}

          <button
            onClick={onOpenMyHacks}
            className="p-3 rounded-xl bg-[#f3ede4] hover:bg-[#ede7de] text-left transition-colors cursor-pointer space-y-0.5"
          >
            <span className="material-symbols-outlined text-[20px] text-[#6f4315]">
              calendar_month
            </span>
            <span className="text-xs font-bold text-[#1d1b16] block">My Applications</span>
            <span className="text-[11px] text-[#71594f]">1 active hackathon</span>
          </button>

          <button
            onClick={onOpenFeedback}
            className="p-3 rounded-xl bg-[#fff9ef] hover:bg-[#fcdcce]/40 border border-[#8b5a2b]/30 text-left transition-colors cursor-pointer space-y-0.5"
          >
            <span className="material-symbols-outlined text-[20px] text-[#8b5a2b]">psychology</span>
            <span className="text-xs font-bold text-[#1d1b16] block">Latest Idea Review</span>
            <span className="text-[11px] text-[#8b5a2b] font-semibold">Smart College Canteen</span>
          </button>
        </div>
      </div>

      {/* Skills & Badges */}
      <div className="bg-[#ffffff] rounded-2xl border border-[#d5c3b6]/50 p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#71594f]">
          Engineering Competencies
        </h3>
        <div className="flex flex-wrap gap-2">
          {['React & TypeScript', 'Node.js Microservices', 'Edge Computer Vision', 'WebSockets', 'REST & GraphQL', 'Campus Civic Tech'].map(
            (skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-[#f3ede4] text-[#1d1b16] text-xs font-medium"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      {/* Quick Portal Access */}
      <div className="space-y-2">
        <button
          onClick={onOpenFacultyPortal}
          className="w-full p-4 rounded-xl bg-[#ffffff] border border-[#d5c3b6]/50 shadow-xs flex items-center justify-between hover:bg-[#f9f3ea] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#fcdcce] flex items-center justify-center text-[#775f54]">
              <span className="material-symbols-outlined text-[18px]">school</span>
            </span>
            <div className="text-left">
              <span className="text-xs font-bold text-[#1d1b16] block">Faculty Distribution Portal</span>
              <span className="text-[11px] text-[#71594f]">Broadcast approved events to batches</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[18px] text-[#71594f]">chevron_right</span>
        </button>

        <button
          onClick={onOpenHostModal}
          className="w-full p-4 rounded-xl bg-[#ffffff] border border-[#d5c3b6]/50 shadow-xs flex items-center justify-between hover:bg-[#f9f3ea] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#f3ede4] flex items-center justify-center text-[#6f4315]">
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
            </span>
            <div className="text-left">
              <span className="text-xs font-bold text-[#1d1b16] block">Host an Innovation Challenge</span>
              <span className="text-[11px] text-[#71594f]">Create and publish campus competitions</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[18px] text-[#71594f]">chevron_right</span>
        </button>
      </div>
    </div>
  );
};
