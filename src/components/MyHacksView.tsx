import React from 'react';
import { IdeaSubmission, Hackathon } from '../types';

interface MyHacksViewProps {
  submissions: IdeaSubmission[];
  hackathons: Hackathon[];
  onViewFeedback: (sub: IdeaSubmission) => void;
  onSelectHackathon: (hackathon: Hackathon) => void;
  onOpenStudentDashboard?: () => void;
}

export const MyHacksView: React.FC<MyHacksViewProps> = ({
  submissions,
  hackathons,
  onViewFeedback,
  onSelectHackathon,
  onOpenStudentDashboard,
}) => {
  return (
    <div className="flex flex-col w-full pb-24 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 pt-4 space-y-5">
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#8b5a2b]">
          Application Tracker
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1b16]">
          My Hackathons & Submissions
        </h2>
        <p className="text-xs sm:text-sm text-[#51443a]">
          Track your team roster, submission milestones, and personal AI Idea Reviews.
        </p>
      </div>

      {/* Prominent Student Dashboard Callout */}
      {onOpenStudentDashboard && (
        <div
          onClick={onOpenStudentDashboard}
          className="p-4 rounded-2xl bg-[#f9f3ea] border border-[#8b5a2b]/40 shadow-xs flex items-center justify-between gap-3 cursor-pointer hover:bg-[#f3ede4] transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8b5a2b] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">analytics</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1d1b16]">
                Submissions & Performance Graph Dashboard
              </h4>
              <p className="text-xs text-[#71594f]">
                Compare all your submitted projects on one side and track your growth curve on the other.
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[20px] text-[#8b5a2b] group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </div>
      )}

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.map((sub) => {
          const relatedHackathon = hackathons.find((h) => h.id === sub.hackathonId);
          const hasFeedback = Boolean(sub.feedback);

          return (
            <div
              key={sub.id}
              className="bg-[#ffffff] rounded-2xl border border-[#d5c3b6]/50 p-4 sm:p-5 shadow-xs space-y-3.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#71594f]">
                    {sub.hackathonTitle}
                  </span>
                  <h3 className="text-lg font-bold text-[#1d1b16] mt-0.5">{sub.ideaTitle}</h3>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    sub.status === 'not_selected'
                      ? 'bg-[#fcdcce] text-[#775f54]'
                      : sub.status === 'selected'
                      ? 'bg-[#e2f5ea] text-[#147a46]'
                      : 'bg-[#f3ede4] text-[#51443a]'
                  }`}
                >
                  {sub.status === 'not_selected'
                    ? 'Review Ready'
                    : sub.status === 'selected'
                    ? 'Selected for Sprint'
                    : 'Submitted'}
                </span>
              </div>

              {/* Summary */}
              <p className="text-xs text-[#51443a] leading-relaxed bg-[#f9f3ea] p-3 rounded-xl border border-[#d5c3b6]/30">
                {sub.summary}
              </p>

              {/* Roster & Submitted Time */}
              <div className="flex items-center justify-between text-xs text-[#71594f] pt-1 border-t border-[#d5c3b6]/30">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#8b5a2b]">group</span>
                  <span className="font-semibold text-[#1d1b16]">{sub.teamName}</span>
                  <span>({sub.leadName})</span>
                </div>
                <span>{sub.submittedAt}</span>
              </div>

              {/* Call to Action Bar */}
              <div className="flex items-center gap-2 pt-1">
                {hasFeedback && sub.status === 'not_selected' && (
                  <button
                    onClick={() => onViewFeedback(sub)}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#8b5a2b] hover:bg-[#70451f] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">psychology</span>
                    <span>View AI Idea Review</span>
                  </button>
                )}

                {relatedHackathon && (
                  <button
                    onClick={() => onSelectHackathon(relatedHackathon)}
                    className="py-3 px-4 rounded-xl bg-[#f3ede4] hover:bg-[#ede7de] text-[#1d1b16] font-semibold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Event Details</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
