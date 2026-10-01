import React, { useState } from 'react';
import { Hackathon, IdeaSubmission } from '../types';

interface HackathonDetailsViewProps {
  hackathon: Hackathon;
  onBack: () => void;
  onRegister: () => void;
  userSubmission?: IdeaSubmission;
  onViewFeedback: () => void;
}

export const HackathonDetailsView: React.FC<HackathonDetailsViewProps> = ({
  hackathon,
  onBack,
  onRegister,
  userSubmission,
  onViewFeedback,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'About' | 'Theme' | 'Timeline' | 'Rules' | 'Prizes'>('All');
  const tabs = ['All', 'About', 'Theme', 'Timeline', 'Rules', 'Prizes'] as const;

  return (
    <div className="flex flex-col w-full pb-28 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 pt-3 space-y-5">
      {/* Top Banner Image Card */}
      <div className="relative rounded-2xl overflow-hidden h-48 sm:h-64 w-full bg-[#f3ede4] shadow-xs">
        <img
          src={hackathon.bannerUrl}
          alt={hackathon.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover mix-blend-multiply opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-3 py-1 rounded-md bg-[#ffffff]/90 backdrop-blur-xs text-[#71594f] text-[11px] font-bold uppercase tracking-wider shadow-xs">
            {hackathon.categoryTrack}
          </span>
          <span className="px-3 py-1 rounded-md bg-[#ffffff]/90 backdrop-blur-xs text-[#1d1b16] text-[11px] font-bold flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]" />
            {hackathon.status}
          </span>
        </div>

        {/* Top Close/Back Action Button */}
        <button
          onClick={onBack}
          aria-label="Back to explore"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#ffffff]/90 backdrop-blur-xs flex items-center justify-center text-[#1d1b16] hover:bg-[#ffffff] shadow-xs cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>
      </div>

      {/* Title & Metadata */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d1b16] tracking-tight">
          {hackathon.title}
        </h1>

        <div className="flex items-center gap-2 text-xs text-[#71594f] font-medium flex-wrap">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#8b5a2b]">verified</span>
            <span className="font-semibold text-[#1d1b16]">{hackathon.organizer}</span>
          </div>
          {hackathon.isCampusChapter && (
            <>
              <span>•</span>
              <span className="text-[#8b5a2b] font-medium">Campus Chapter</span>
            </>
          )}
        </div>

        {/* Registered Teams Avatars */}
        <div className="flex items-center gap-2.5 pt-1">
          <div className="flex -space-x-1.5 overflow-hidden">
            <span className="inline-block h-6 w-6 rounded-full ring-2 ring-[#fff9ef] bg-[#8b5a2b] text-[10px] font-bold text-white flex items-center justify-center">
              AK
            </span>
            <span className="inline-block h-6 w-6 rounded-full ring-2 ring-[#fff9ef] bg-[#71594f] text-[10px] font-bold text-white flex items-center justify-center">
              MR
            </span>
            <span className="inline-block h-6 w-6 rounded-full ring-2 ring-[#fff9ef] bg-[#281810] text-[10px] font-bold text-white flex items-center justify-center">
              PS
            </span>
          </div>
          <span className="text-xs font-semibold text-[#51443a]">
            {hackathon.registeredTeamsCount} teams registered
          </span>
        </div>
      </div>

      {/* Urgent Notice Box */}
      <div className="rounded-xl bg-[#fcdcce]/40 border border-[#fcdcce] p-3.5 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#775f54]">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span>Registration Closing Soon</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#fcdcce] text-[#775f54] text-[10px] font-bold uppercase">
            Free Entry
          </span>
        </div>
        <p className="text-xs text-[#51443a] leading-relaxed">
          Final submissions close on Oct 10, 11:59 PM. Complete your team profile now.
        </p>
      </div>

      {/* Segmented Tab Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-[#d5c3b6]/40 pb-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#1d1b16] text-[#fff9ef] shadow-xs'
                  : 'bg-[#f3ede4] text-[#51443a] hover:bg-[#ede7de]'
              }`}
            >
              {tab === 'All' ? 'Overview' : tab}
            </button>
          );
        })}
      </div>

      {/* KEY SPECIFICATIONS Grid (Always visible or in About) */}
      {(activeTab === 'All' || activeTab === 'About') && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#71594f]">
            Key Specifications
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#ffffff] rounded-xl p-3 border border-[#d5c3b6]/40 shadow-xs space-y-1">
              <span className="material-symbols-outlined text-[18px] text-[#8b5a2b]">calendar_today</span>
              <span className="text-[10px] uppercase font-bold text-[#837469] block">Event Date</span>
              <p className="text-xs font-bold text-[#1d1b16]">{hackathon.eventDates}</p>
            </div>

            <div className="bg-[#ffffff] rounded-xl p-3 border border-[#d5c3b6]/40 shadow-xs space-y-1">
              <span className="material-symbols-outlined text-[18px] text-[#8b5a2b]">schedule</span>
              <span className="text-[10px] uppercase font-bold text-[#837469] block">Deadline</span>
              <p className="text-xs font-bold text-[#1d1b16]">{hackathon.registrationDeadline}</p>
            </div>

            <div className="bg-[#ffffff] rounded-xl p-3 border border-[#d5c3b6]/40 shadow-xs space-y-1">
              <span className="material-symbols-outlined text-[18px] text-[#8b5a2b]">group</span>
              <span className="text-[10px] uppercase font-bold text-[#837469] block">Team Size</span>
              <p className="text-xs font-bold text-[#1d1b16]">{hackathon.teamSize}</p>
            </div>

            <div className="bg-[#ffffff] rounded-xl p-3 border border-[#d5c3b6]/40 shadow-xs space-y-1">
              <span className="material-symbols-outlined text-[18px] text-[#8b5a2b]">school</span>
              <span className="text-[10px] uppercase font-bold text-[#837469] block">Eligibility</span>
              <p className="text-xs font-bold text-[#1d1b16]">{hackathon.eligibility}</p>
            </div>
          </div>

          {/* Venue Format Full Width */}
          <div className="bg-[#ffffff] rounded-xl p-3 border border-[#d5c3b6]/40 shadow-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f3ede4] flex items-center justify-center text-[#8b5a2b] shrink-0">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#837469] block">Venue Format</span>
              <p className="text-xs font-bold text-[#1d1b16]">{hackathon.venueFormat}</p>
            </div>
          </div>
        </div>
      )}

      {/* Callout Card: Guaranteed AI Idea Review */}
      {(activeTab === 'All' || activeTab === 'About') && (
        <div className="rounded-xl bg-[#fff9ef] border-2 border-[#8b5a2b]/30 p-4 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#8b5a2b] text-[#ffffff] flex items-center justify-center">
                <span className="material-symbols-outlined text-[15px]">psychology</span>
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1d1b16]">
                Guaranteed AI Idea Review
              </h4>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#fcdcce] text-[#775f54] text-[10px] font-bold uppercase">
              Exclusive
            </span>
          </div>
          <p className="text-xs text-[#51443a] leading-relaxed">
            Every non-selected submission receives an actionable AI Idea Review breaking down strengths,
            feasibility gaps, and 4 levels of project extension.
          </p>

          {userSubmission && userSubmission.status === 'not_selected' && (
            <div className="pt-2">
              <button
                onClick={onViewFeedback}
                className="w-full py-2.5 px-3 rounded-lg bg-[#8b5a2b] text-[#ffffff] font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#70451f] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>View Your Generated Idea Review</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Detailed Narrative (when in About tab) */}
      {(activeTab === 'All' || activeTab === 'About') && (
        <div className="bg-[#ffffff] rounded-xl p-4 border border-[#d5c3b6]/40 shadow-xs space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#71594f]">
            About the Challenge
          </h3>
          <p className="text-xs sm:text-sm text-[#51443a] leading-relaxed">
            {hackathon.about}
          </p>
        </div>
      )}

      {/* INNOVATION THEMES */}
      {(activeTab === 'All' || activeTab === 'Theme') && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#71594f]">
              Innovation Themes
            </h3>
            <span className="text-xs font-semibold text-[#837469]">
              {hackathon.themes.length} Tracks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hackathon.themes.map((theme) => (
              <div
                key={theme.id}
                className="bg-[#ffffff] rounded-xl p-3.5 border border-[#d5c3b6]/40 shadow-xs space-y-2"
              >
                <div className="w-8 h-8 rounded-lg bg-[#fcdcce]/50 text-[#8b5a2b] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">{theme.icon}</span>
                </div>
                <h4 className="text-sm font-bold text-[#1d1b16]">{theme.title}</h4>
                <p className="text-xs text-[#51443a] leading-relaxed">{theme.desc}</p>
                <button
                  onClick={onRegister}
                  className="text-[11px] font-bold text-[#8b5a2b] hover:text-[#6f4315] flex items-center gap-1 pt-1 cursor-pointer"
                >
                  <span>Submit in this track →</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SPRINT TIMELINE */}
      {(activeTab === 'All' || activeTab === 'Timeline') && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#71594f]">
              Sprint Timeline
            </h3>
            <span className="text-[11px] font-mono font-medium text-[#837469]">IST (UTC+5:30)</span>
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#d5c3b6]">
            {hackathon.timeline.map((item, idx) => {
              const isDone = item.status === 'completed';
              const isActive = item.status === 'active';

              return (
                <div key={idx} className="relative flex flex-col space-y-0.5">
                  {/* Bullet circle */}
                  <div
                    className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#fff9ef] ${
                      isDone
                        ? 'bg-[#30251F] text-[#ffffff]'
                        : isActive
                        ? 'bg-[#8b5a2b] text-[#ffffff]'
                        : 'bg-[#d5c3b6] text-[#71594f]'
                    }`}
                  >
                    {isDone ? (
                      <span className="material-symbols-outlined text-[13px]">check</span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-xs font-bold text-[#1d1b16] flex items-center gap-1.5">
                      <span>{item.title}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#8b5a2b]" />}
                    </h4>
                    <span className="text-[11px] font-semibold text-[#8b5a2b] shrink-0">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-xs text-[#51443a] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* RULES TAB CONTENT */}
      {(activeTab === 'All' || activeTab === 'Rules') && (
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#71594f]">
            Rules & Submission Requirements
          </h3>

          <div className="bg-[#ffffff] rounded-xl p-4 border border-[#d5c3b6]/40 shadow-xs space-y-3 text-xs text-[#51443a]">
            <div className="space-y-1">
              <span className="font-bold text-[#1d1b16] block">1. Team Composition & Eligibility</span>
              <p>Squads must comprise 2 to 4 eligible undergraduate or postgraduate students. Cross-departmental multidisciplinary teams are encouraged.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[#1d1b16] block">2. Intellectual Property (IP) Ownership</span>
              <p>Student teams retain 100% intellectual property ownership of their code, blueprints, and prototypes. The college claims no commercial equity.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[#1d1b16] block">3. Submission Deliverables</span>
              <p>Initial screening requires a concise abstract + system architecture diagram. Selected teams build live during the 36-hour sprint with GitHub repos made public.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[#1d1b16] block">4. Guaranteed Educational Feedback</span>
              <p>HackBridge ensures that every non-selected application automatically receives an AI Idea Review with actionable enhancements.</p>
            </div>
          </div>
        </div>
      )}

      {/* PRIZES & GRANTS */}
      {(activeTab === 'All' || activeTab === 'Prizes') && (
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#71594f]">
              Prizes & Grants
            </h3>
            <span className="text-xs text-[#71594f]">Total pool worth {hackathon.prizePool}</span>
          </div>

          <div className="space-y-2.5">
            {hackathon.prizes.map((p) => {
              const isWinner = p.place === 1;
              return (
                <div
                  key={p.place}
                  className={`rounded-xl p-4 border transition-all ${
                    isWinner
                      ? 'bg-[#ffffff] border-[#8b5a2b]/40 shadow-xs'
                      : 'bg-[#ffffff] border-[#d5c3b6]/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                          isWinner ? 'bg-[#8b5a2b] text-white' : 'bg-[#f3ede4] text-[#51443a]'
                        }`}
                      >
                        {p.place}
                      </span>
                      <span className="text-[11px] uppercase font-bold text-[#71594f]">
                        {p.rankLabel}
                      </span>
                    </div>

                    {p.tag && (
                      <span className="px-2 py-0.5 rounded-md bg-[#fcdcce] text-[#775f54] text-[10px] font-bold">
                        {p.tag}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#1d1b16]">{p.amount}</span>
                  </div>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-[#71594f]">
                    <span className="material-symbols-outlined text-[15px] text-[#8b5a2b]">
                      rocket_launch
                    </span>
                    <span>{p.benefits}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VENUE & LOGISTICS with Map card */}
      {(activeTab === 'All' || activeTab === 'About') && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#71594f]">
              Venue & Logistics
            </h3>
            <span className="text-xs text-[#71594f]">{hackathon.location}</span>
          </div>

          <div className="relative rounded-xl overflow-hidden h-36 w-full bg-[#f3ede4] border border-[#d5c3b6]/50">
            {/* Map Graphic Simulation */}
            <div className="absolute inset-0 bg-[#e7e2d9] flex items-center justify-center overflow-hidden">
              <svg className="w-full h-full opacity-40" viewBox="0 0 400 150">
                <path d="M 0,20 Q 100,60 200,30 T 400,80" stroke="#837469" strokeWidth="6" fill="none" />
                <path d="M 50,0 Q 80,80 180,150" stroke="#d5c3b6" strokeWidth="4" fill="none" />
                <path d="M 220,0 L 260,150" stroke="#d5c3b6" strokeWidth="4" fill="none" />
                <rect x="140" y="45" width="120" height="50" rx="6" fill="#8b5a2b" opacity="0.3" />
              </svg>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            <div className="absolute bottom-3 left-3 text-white space-y-0.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#ffdcc1] block">
                Main Innovation Hub
              </span>
              <p className="text-sm font-bold text-white">ASIET Engineering Campus</p>
              <p className="text-[11px] text-[#f6f0e7]/90">Room 304, Tech Tower A • Kalady</p>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#fff9ef]/95 backdrop-blur-md border-t border-[#d5c3b6]/60 p-3 sm:p-4">
        <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8b5a2b] flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">schedule</span>
              Ends Oct 10
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-[#1d1b16]">Free</span>
              <span className="text-xs text-[#71594f]">/ team</span>
            </div>
          </div>

          {userSubmission && userSubmission.status === 'not_selected' ? (
            <button
              onClick={onViewFeedback}
              className="py-3 px-5 rounded-xl bg-[#8b5a2b] text-[#ffffff] font-bold text-sm flex items-center gap-1.5 shadow-md hover:bg-[#70451f] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">psychology</span>
              <span>View Idea Review →</span>
            </button>
          ) : userSubmission ? (
            <button
              onClick={onViewFeedback}
              className="py-3 px-5 rounded-xl bg-[#30251F] text-[#ffffff] font-bold text-sm flex items-center gap-1.5 shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Application Submitted</span>
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
            </button>
          ) : (
            <button
              onClick={onRegister}
              className="py-3 px-6 rounded-xl bg-[#6f4315] hover:bg-[#5a3610] text-[#ffffff] font-bold text-sm flex items-center gap-1.5 shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Register Team</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
