import React, { useState } from 'react';
import { IdeaSubmission } from '../types';

interface StudentDashboardModalProps {
  submissions: IdeaSubmission[];
  onClose: () => void;
  onViewFeedback: (sub: IdeaSubmission) => void;
  onSwitchToOrganizer?: () => void;
  onRegisterNew?: () => void;
}

export const StudentDashboardModal: React.FC<StudentDashboardModalProps> = ({
  submissions,
  onClose,
  onViewFeedback,
  onSwitchToOrganizer,
  onRegisterNew,
}) => {
  const [selectedSubId, setSelectedSubId] = useState<string>(submissions[0]?.id || '');
  const activeSub = submissions.find((s) => s.id === selectedSubId) || submissions[0];

  // Performance scoring calculation for the active submission
  const performanceMetrics = [
    { label: 'Campus Problem-Fit', score: 92, grade: 'Exceptional', color: 'bg-[#147a46]', text: 'text-[#147a46]' },
    { label: 'Technical Feasibility', score: 78, grade: 'Solid', color: 'bg-[#8b5a2b]', text: 'text-[#8b5a2b]' },
    { label: 'Innovation Tier', score: 84, grade: 'Tier B+', color: 'bg-[#9a602a]', text: 'text-[#9a602a]' },
    { label: 'Architecture Maturity', score: 76, grade: 'Needs Buffers', color: 'bg-[#ba1a1a]', text: 'text-[#ba1a1a]' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#231812]/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#ffffff] rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden border border-[#d5c3b6]/60 shadow-2xl flex flex-col">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#d5c3b6]/40 bg-[#fff9ef] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8b5a2b] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">analytics</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-[#1d1b16] tracking-tight">
                  Student Submissions & Growth Dashboard
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#fcdcce] text-[#775f54] text-[10px] font-bold uppercase">
                  Student Mode
                </span>
              </div>
              <p className="text-xs text-[#51443a]">
                Track all your project proposals, personal AI reviews, and innovation performance graphs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSwitchToOrganizer && (
              <button
                onClick={onSwitchToOrganizer}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f3ede4] hover:bg-[#ede7de] text-[#1d1b16] text-xs font-semibold transition-colors cursor-pointer"
                title="Switch to Organizer View"
              >
                <span className="material-symbols-outlined text-[16px] text-[#6f4315]">settings</span>
                <span>Organizer Desk</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-[#f3ede4] flex items-center justify-center text-[#71594f] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>

        {/* Two-Column Responsive Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* LEFT SIDE: All My Submitted Projects (5 cols on lg) */}
          <div className="lg:col-span-6 p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-[#d5c3b6]/40 space-y-4 bg-[#fdfbf7]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8b5a2b] block">
                  Project Portfolio
                </span>
                <h4 className="text-base font-bold text-[#1d1b16]">
                  Submitted Projects ({submissions.length})
                </h4>
              </div>

              {onRegisterNew && (
                <button
                  onClick={onRegisterNew}
                  className="px-3 py-1.5 rounded-xl bg-[#6f4315] hover:bg-[#5a3610] text-white text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">add</span>
                  <span>New Proposal</span>
                </button>
              )}
            </div>

            {/* List of Student's Submissions */}
            <div className="space-y-3">
              {submissions.map((sub) => {
                const isSelected = sub.id === activeSub?.id;
                const hasReview = Boolean(sub.feedback);

                return (
                  <div
                    key={sub.id}
                    onClick={() => setSelectedSubId(sub.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                      isSelected
                        ? 'bg-[#ffffff] border-[#8b5a2b] shadow-sm ring-1 ring-[#8b5a2b]/20'
                        : 'bg-[#ffffff] border-[#d5c3b6]/40 hover:border-[#8b5a2b]/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#71594f] block">
                          {sub.hackathonTitle}
                        </span>
                        <h5 className="text-sm font-bold text-[#1d1b16] mt-0.5">{sub.ideaTitle}</h5>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
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
                          ? 'Selected'
                          : 'Under Review'}
                      </span>
                    </div>

                    <p className="text-xs text-[#51443a] line-clamp-2 leading-relaxed bg-[#f9f3ea] p-2.5 rounded-lg border border-[#d5c3b6]/30">
                      {sub.summary || sub.problemStatement}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-[#71594f] pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-[#8b5a2b]">group</span>
                        <span className="font-semibold text-[#1d1b16]">{sub.teamName}</span>
                      </div>
                      <span>{sub.submittedAt}</span>
                    </div>

                    {/* ONLY Student Mode has this button to view personal AI Idea Review */}
                    {hasReview && sub.status === 'not_selected' && (
                      <div className="pt-1.5 border-t border-[#d5c3b6]/30">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                            onViewFeedback(sub);
                          }}
                          className="w-full py-2.5 px-3 rounded-lg bg-[#8b5a2b] hover:bg-[#70451f] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">psychology</span>
                          <span>View Your Personal AI Idea Review →</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: Performance Graph & Innovation Trajectory (6 cols on lg) */}
          <div className="lg:col-span-6 p-4 sm:p-5 space-y-4 bg-[#ffffff]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8b5a2b] block">
                  Analytics & Growth
                </span>
                <h4 className="text-base font-bold text-[#1d1b16]">
                  Performance Graph & Trajectory
                </h4>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#f3ede4] text-[#51443a] text-xs font-semibold">
                {activeSub?.ideaTitle || 'Overview'}
              </span>
            </div>

            {/* Performance Metric Score Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#fff9ef] border border-[#d5c3b6]/40 space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#71594f] block">
                  Overall Potential
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-[#1d1b16]">83</span>
                  <span className="text-xs text-[#71594f]">/ 100</span>
                </div>
                <span className="text-[10px] font-bold text-[#8b5a2b]">Tier B+ Innovation</span>
              </div>

              <div className="p-3 rounded-xl bg-[#fff9ef] border border-[#d5c3b6]/40 space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#71594f] block">
                  Campus Problem-Fit
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-[#147a46]">92%</span>
                </div>
                <span className="text-[10px] font-bold text-[#147a46]">Exceptional Match</span>
              </div>
            </div>

            {/* Visual Competency Performance Graph */}
            <div className="p-4 rounded-xl bg-[#f9f3ea] border border-[#d5c3b6]/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1d1b16]">
                  Evaluation Benchmark Graph
                </span>
                <span className="text-[11px] font-medium text-[#71594f]">Peer percentile</span>
              </div>

              <div className="space-y-2.5">
                {performanceMetrics.map((metric) => (
                  <div key={metric.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#1d1b16]">{metric.label}</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`font-bold ${metric.text}`}>{metric.grade}</span>
                        <span className="text-[11px] text-[#71594f]">({metric.score}%)</span>
                      </div>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="h-2 w-full rounded-full bg-[#d5c3b6]/40 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${metric.color} transition-all duration-500`}
                        style={{ width: `${metric.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Innovation Growth Trajectory Timeline */}
            <div className="p-4 rounded-xl bg-[#ffffff] border border-[#d5c3b6]/40 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1d1b16] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#8b5a2b]">trending_up</span>
                  Growth Progression Curve
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e2f5ea] text-[#147a46]">
                  +18% Lift v2.0
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#51443a]">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#f3ede4] text-[#8b5a2b] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <span className="font-bold text-[#1d1b16] block">Initial Submission (v1.0)</span>
                    <p className="text-[11px] text-[#71594f]">
                      Identified high student need but flagged for static queue timing and peak rush buffer gaps.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#8b5a2b] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <span className="font-bold text-[#1d1b16] block">AI Review Synthesis & Workspace Branch (v2.0)</span>
                    <p className="text-[11px] text-[#71594f]">
                      Integrated counter tap-out confirmations and timetable interval pre-orders, raising architecture score by 18 points.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Footer in Dashboard */}
            {activeSub?.feedback && (
              <button
                onClick={() => {
                  onClose();
                  onViewFeedback(activeSub);
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#1d1b16] hover:bg-[#30251F] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>Open Full Editorial Idea Review ({activeSub.ideaTitle})</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
