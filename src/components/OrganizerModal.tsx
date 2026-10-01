import React, { useState } from 'react';
import { IdeaSubmission } from '../types';

interface OrganizerModalProps {
  submissions: IdeaSubmission[];
  onClose: () => void;
  onUpdateStatus: (id: string, status: 'selected' | 'not_selected') => void;
}

export const OrganizerModal: React.FC<OrganizerModalProps> = ({
  submissions,
  onClose,
  onUpdateStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'all_submissions' | 'selected_teams'>('all_submissions');
  const [selectedSubId, setSelectedSubId] = useState<string>(submissions[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'submitted' | 'selected' | 'not_selected'>('all');

  const selectedTeams = submissions.filter((s) => s.status === 'selected');

  const filteredSubmissions = submissions.filter((s) => {
    const matchesSearch =
      s.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.ideaTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.leadName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const activeSubmission = submissions.find((s) => s.id === selectedSubId) || submissions[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#231812]/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#ffffff] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden border border-[#d5c3b6]/60 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#d5c3b6]/40 bg-[#fff9ef] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6f4315] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">admin_panel_settings</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-[#1d1b16] tracking-tight">
                  Organizer Evaluation & Team Selection Desk
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#fcdcce] text-[#775f54] text-[10px] font-bold uppercase">
                  Organizer Mode
                </span>
              </div>
              <p className="text-xs text-[#51443a]">
                Screen incoming student submissions and manage the finalized sprint team roster.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f3ede4] hover:bg-[#ede7de] text-[#1d1b16] text-xs font-semibold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back to Student Mode</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-[#f3ede4] flex items-center justify-center text-[#71594f] transition-colors cursor-pointer"
              title="Close and return to Student Mode"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation: Only (1) All Submitted Projects and (2) Selected Team List */}
        <div className="px-5 pt-3 pb-2 border-b border-[#d5c3b6]/40 bg-[#fdfbf7] flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all_submissions')}
              className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'all_submissions'
                  ? 'bg-[#1d1b16] text-white shadow-xs'
                  : 'bg-[#f3ede4] text-[#51443a] hover:bg-[#ede7de]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">list_alt</span>
              <span>All Submitted Projects</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
                {submissions.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('selected_teams')}
              className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'selected_teams'
                  ? 'bg-[#147a46] text-white shadow-xs'
                  : 'bg-[#e2f5ea] text-[#147a46] hover:bg-[#c9edd7]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
              <span>Selected Team List</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/10 text-[10px] font-bold">
                {selectedTeams.length}
              </span>
            </button>
          </div>

          {/* Capacity Counter */}
          <div className="text-xs text-[#71594f] flex items-center gap-2">
            <span>Hackathon Roster Capacity:</span>
            <span className="font-bold text-[#1d1b16]">
              {selectedTeams.length} / 15 Teams Selected
            </span>
          </div>
        </div>

        {/* TAB 1: ALL SUBMITTED PROJECTS */}
        {activeTab === 'all_submissions' && (
          <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
            {/* Left Column: Submissions Queue & Filters (5 cols) */}
            <div className="md:col-span-5 p-4 border-r border-[#d5c3b6]/40 space-y-3 overflow-y-auto bg-[#fdfbf7]">
              {/* Search Bar */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[17px] text-[#837469]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search project or team..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
                />
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {(['all', 'submitted', 'selected', 'not_selected'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-all cursor-pointer ${
                      filterStatus === status
                        ? 'bg-[#8b5a2b] text-white shadow-2xs'
                        : 'bg-[#f3ede4] text-[#51443a] hover:bg-[#ede7de]'
                    }`}
                  >
                    {status === 'all'
                      ? 'All'
                      : status === 'submitted'
                      ? 'Pending'
                      : status === 'selected'
                      ? 'Selected'
                      : 'Not Selected'}
                  </button>
                ))}
              </div>

              {/* Submissions List */}
              <div className="space-y-2">
                {filteredSubmissions.map((sub) => {
                  const isSelected = sub.id === activeSubmission?.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubId(sub.id)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all space-y-1 ${
                        isSelected
                          ? 'bg-[#ffffff] border-[#8b5a2b] shadow-xs ring-1 ring-[#8b5a2b]/20'
                          : 'bg-[#ffffff] border-[#d5c3b6]/40 hover:bg-[#f9f3ea]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1d1b16] truncate">{sub.teamName}</span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                            sub.status === 'selected'
                              ? 'bg-[#e2f5ea] text-[#147a46]'
                              : sub.status === 'not_selected'
                              ? 'bg-[#fcdcce] text-[#775f54]'
                              : 'bg-[#f3ede4] text-[#51443a]'
                          }`}
                        >
                          {sub.status === 'selected'
                            ? 'Selected'
                            : sub.status === 'not_selected'
                            ? 'Not Selected'
                            : 'Pending'}
                        </span>
                      </div>
                      <p className="text-xs text-[#51443a] truncate">{sub.ideaTitle}</p>
                      <span className="text-[10px] text-[#837469] block">{sub.leadName} • {sub.submittedAt}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Selected Submission Screening Details & Action Panel (7 cols) */}
            {activeSubmission ? (
              <div className="md:col-span-7 p-4 sm:p-5 space-y-4 overflow-y-auto bg-white">
                <div className="p-4 rounded-xl bg-[#f9f3ea] border border-[#d5c3b6]/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#8b5a2b] tracking-wider">
                      {activeSubmission.hackathonTitle}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        activeSubmission.status === 'selected'
                          ? 'bg-[#e2f5ea] text-[#147a46]'
                          : activeSubmission.status === 'not_selected'
                          ? 'bg-[#fcdcce] text-[#775f54]'
                          : 'bg-[#f3ede4] text-[#51443a]'
                      }`}
                    >
                      {activeSubmission.status === 'selected'
                        ? 'Selected for Sprint'
                        : activeSubmission.status === 'not_selected'
                        ? 'Not Selected'
                        : 'Under Review'}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-[#1d1b16]">{activeSubmission.ideaTitle}</h4>

                  <div className="flex items-center gap-3 text-xs text-[#71594f]">
                    <span>Team: <strong className="text-[#1d1b16]">{activeSubmission.teamName}</strong></span>
                    <span>•</span>
                    <span>Lead: <strong className="text-[#1d1b16]">{activeSubmission.leadName}</strong></span>
                    <span>•</span>
                    <span>{activeSubmission.leadEmail}</span>
                  </div>
                </div>

                {/* Proposal Fields */}
                <div className="space-y-3 text-xs text-[#51443a]">
                  <div>
                    <span className="font-bold text-[#1d1b16] block mb-1 uppercase tracking-wider text-[10px]">
                      Problem Statement
                    </span>
                    <p className="bg-[#ffffff] p-3 rounded-xl border border-[#d5c3b6]/40 leading-relaxed">
                      {activeSubmission.problemStatement}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-[#1d1b16] block mb-1 uppercase tracking-wider text-[10px]">
                      Proposed Solution
                    </span>
                    <p className="bg-[#ffffff] p-3 rounded-xl border border-[#d5c3b6]/40 leading-relaxed">
                      {activeSubmission.solution}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="font-bold text-[#1d1b16] block mb-1 uppercase tracking-wider text-[10px]">
                        Tech Stack
                      </span>
                      <p className="bg-[#ffffff] p-2.5 rounded-xl border border-[#d5c3b6]/40">
                        {activeSubmission.techStack}
                      </p>
                    </div>
                    <div>
                      <span className="font-bold text-[#1d1b16] block mb-1 uppercase tracking-wider text-[10px]">
                        Target Users
                      </span>
                      <p className="bg-[#ffffff] p-2.5 rounded-xl border border-[#d5c3b6]/40">
                        {activeSubmission.targetUsers}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ORGANIZER DECISION BUTTONS (NO student review button here!) */}
                <div className="pt-3 border-t border-[#d5c3b6]/40 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateStatus(activeSubmission.id, 'selected')}
                      className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeSubmission.status === 'selected'
                          ? 'bg-[#147a46] text-white shadow-xs'
                          : 'bg-[#e2f5ea] text-[#147a46] hover:bg-[#c9edd7]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[17px]">check_circle</span>
                      <span>
                        {activeSubmission.status === 'selected'
                          ? 'Team Selected'
                          : 'Select Team for Sprint'}
                      </span>
                    </button>

                    <button
                      onClick={() => onUpdateStatus(activeSubmission.id, 'not_selected')}
                      className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeSubmission.status === 'not_selected'
                          ? 'bg-[#ba1a1a] text-white shadow-xs'
                          : 'bg-[#fcdcce] text-[#775f54] hover:bg-[#fcdcce]/80'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[17px]">close</span>
                      <span>
                        {activeSubmission.status === 'not_selected'
                          ? 'Marked Not Selected'
                          : 'Mark Not Selected'}
                      </span>
                    </button>
                  </div>

                  <span className="text-[11px] text-[#71594f] italic">
                    Educational reviews are sent to the student portal.
                  </span>
                </div>
              </div>
            ) : (
              <div className="md:col-span-7 p-8 text-center text-xs text-[#71594f] flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-[36px] text-[#d5c3b6] mb-2">folder_open</span>
                <p>No project selected.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SELECTED TEAM LIST ONLY */}
        {activeTab === 'selected_teams' && (
          <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-white">
            <div className="flex items-center justify-between border-b border-[#d5c3b6]/40 pb-3">
              <div>
                <h4 className="text-base font-bold text-[#1d1b16]">
                  Finalist Teams Roster ({selectedTeams.length})
                </h4>
                <p className="text-xs text-[#51443a]">
                  These teams have passed initial screening and are confirmed for the live hacking sprint.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#e2f5ea] text-[#147a46] text-xs font-bold">
                {selectedTeams.length} Teams Confirmed
              </span>
            </div>

            {selectedTeams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedTeams.map((team, idx) => (
                  <div
                    key={team.id}
                    className="p-4 rounded-xl border border-[#d5c3b6]/50 bg-[#fdfbf7] shadow-2xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-[#147a46] text-white flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </span>
                        <h5 className="text-sm font-bold text-[#1d1b16]">{team.teamName}</h5>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#e2f5ea] text-[#147a46] text-[10px] font-bold">
                        Approved Finalist
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-[#8b5a2b] block">
                        Project: {team.ideaTitle}
                      </span>
                      <p className="text-xs text-[#51443a] line-clamp-2 mt-0.5">
                        {team.summary || team.solution}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#d5c3b6]/30 flex items-center justify-between text-xs text-[#71594f]">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-[#147a46]">person</span>
                        <span>{team.leadName} ({team.leadEmail})</span>
                      </div>
                      <span className="text-[10px]">{team.techStack.split(',')[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-xs text-[#71594f] space-y-2">
                <span className="material-symbols-outlined text-[40px] text-[#d5c3b6]">assignment_late</span>
                <p className="font-semibold text-sm text-[#1d1b16]">No Teams Selected Yet</p>
                <p>Switch to "All Submitted Projects" tab to review submissions and select finalist teams.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
