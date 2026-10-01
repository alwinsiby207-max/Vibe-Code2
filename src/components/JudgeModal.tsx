import React, { useState } from 'react';
import { IdeaSubmission, IdeaFeedback } from '../types';

interface JudgeModalProps {
  submissions: IdeaSubmission[];
  onClose: () => void;
  onSubmitEvaluation: (
    projectId: string,
    score: number,
    comments: string,
    decision: 'selected' | 'not_selected',
    feedback?: IdeaFeedback
  ) => Promise<void>;
  onTriggerAiAnalysis: (sub: IdeaSubmission) => Promise<IdeaFeedback>;
}

export const JudgeModal: React.FC<JudgeModalProps> = ({
  submissions,
  onClose,
  onSubmitEvaluation,
  onTriggerAiAnalysis,
}) => {
  const [selectedSubId, setSelectedSubId] = useState<string>(submissions[0]?.id || '');
  const [criteriaScores, setCriteriaScores] = useState<{ [key: string]: number }>({
    innovation: 8,
    technical: 7,
    feasibility: 9,
    impact: 8,
  });
  const [comments, setComments] = useState<string>('');
  const [analyzingAi, setAnalyzingAi] = useState<boolean>(false);
  const [liveFeedback, setLiveFeedback] = useState<IdeaFeedback | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successNotice, setSuccessNotice] = useState<string>('');

  const activeSubmission = submissions.find((s) => s.id === selectedSubId) || submissions[0];

  const totalScore = Math.round(
    ((criteriaScores.innovation + criteriaScores.technical + criteriaScores.feasibility + criteriaScores.impact) /
      40) *
      100
  );

  const handleRunAi = async () => {
    if (!activeSubmission) return;
    setAnalyzingAi(true);
    setSuccessNotice('');
    try {
      const fb = await onTriggerAiAnalysis(activeSubmission);
      setLiveFeedback(fb);
      setComments((prev) =>
        prev ? `${prev}\n\nAI Insight: ${fb.summary}` : `AI Innovation Insight: ${fb.summary}`
      );
      setSuccessNotice('✨ AI Analysis completed via Supabase Edge Function!');
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzingAi(false);
    }
  };

  const handleScoreChange = (key: string, val: number) => {
    setCriteriaScores((prev) => ({ ...prev, [key]: val }));
  };

  const handleEvaluate = async (decision: 'selected' | 'not_selected') => {
    if (!activeSubmission) return;
    setSubmitting(true);
    try {
      await onSubmitEvaluation(
        activeSubmission.id,
        totalScore,
        comments || `Project scored ${totalScore}/100 with decision ${decision}.`,
        decision,
        liveFeedback || activeSubmission.feedback
      );
      setSuccessNotice(`✅ Evaluation saved to Supabase! Project marked ${decision === 'selected' ? 'Selected' : 'Reviewed'}.`);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#231812]/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#ffffff] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden border border-[#d5c3b6]/60 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#d5c3b6]/40 bg-[#fff9ef] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8b5a2b] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">gavel</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-[#1d1b16] tracking-tight">
                  Judge Evaluation Portal
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#fcdcce] text-[#775f54] text-[10px] font-bold uppercase">
                  Judge Mode
                </span>
              </div>
              <p className="text-xs text-[#51443a]">
                Score team submissions, trigger live Supabase Edge Function AI analysis, and submit verdicts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-[#f3ede4] flex items-center justify-center text-[#71594f] transition-colors cursor-pointer"
              title="Close portal"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {successNotice && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-xs font-semibold text-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
              <span>{successNotice}</span>
            </div>
            <button onClick={() => setSuccessNotice('')} className="text-emerald-700 hover:text-emerald-900 cursor-pointer">
              ✕
            </button>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Left Column: Submissions List */}
          <div className="md:col-span-4 border-r border-[#d5c3b6]/40 bg-[#fdfbf7] p-3 overflow-y-auto space-y-2">
            <div className="text-[11px] font-bold text-[#8b5a2b] uppercase tracking-wider px-1">
              Active Submissions ({submissions.length})
            </div>
            {submissions.map((sub) => {
              const isSelected = sub.id === activeSubmission?.id;
              return (
                <div
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubId(sub.id);
                    setLiveFeedback(null);
                    setSuccessNotice('');
                  }}
                  className={`p-3 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-[#ffffff] border-[#8b5a2b] shadow-xs'
                      : 'border-[#d5c3b6]/40 hover:bg-[#ffffff]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1d1b16] truncate">{sub.teamName}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        sub.status === 'selected'
                          ? 'bg-[#e2f5ea] text-[#147a46]'
                          : sub.status === 'not_selected'
                          ? 'bg-[#fcdcce] text-[#775f54]'
                          : 'bg-[#fff9ef] text-[#8b5a2b] border border-[#d5c3b6]'
                      }`}
                    >
                      {sub.status === 'selected' ? 'Selected' : sub.status === 'not_selected' ? 'Evaluated' : 'Pending'}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#51443a] font-medium truncate">{sub.ideaTitle}</div>
                  <div className="text-[10px] text-[#71594f] truncate mt-1">Lead: {sub.leadName}</div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Project Evaluation Form */}
          {activeSubmission ? (
            <div className="md:col-span-8 p-4 sm:p-6 overflow-y-auto space-y-5 bg-white">
              {/* Project Details */}
              <div className="border border-[#d5c3b6]/40 rounded-xl p-4 bg-[#fdfbf7]">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-bold text-[#8b5a2b] uppercase">
                      {activeSubmission.hackathonTitle}
                    </span>
                    <h4 className="text-base font-extrabold text-[#1d1b16]">{activeSubmission.ideaTitle}</h4>
                    <span className="text-xs text-[#51443a] font-semibold">
                      Team: {activeSubmission.teamName} • Lead: {activeSubmission.leadName}
                    </span>
                  </div>
                  <button
                    onClick={handleRunAi}
                    disabled={analyzingAi}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#8b5a2b] text-white text-xs font-bold hover:bg-[#6f4315] transition-all shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {analyzingAi ? 'sync' : 'psychology'}
                    </span>
                    <span>{analyzingAi ? 'Analyzing Edge AI...' : 'Run Edge AI Analysis'}</span>
                  </button>
                </div>

                <div className="space-y-2 text-xs text-[#51443a] pt-2 border-t border-[#d5c3b6]/40">
                  <div>
                    <span className="font-bold text-[#1d1b16]">Problem: </span>
                    {activeSubmission.problemStatement}
                  </div>
                  <div>
                    <span className="font-bold text-[#1d1b16]">Solution: </span>
                    {activeSubmission.solution}
                  </div>
                  <div>
                    <span className="font-bold text-[#1d1b16]">Tech Stack: </span>
                    <span className="bg-[#fff9ef] px-2 py-0.5 rounded border border-[#d5c3b6]/40 text-[#8b5a2b] font-mono text-[11px]">
                      {activeSubmission.techStack}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rubric Scoring */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-extrabold text-[#1d1b16] uppercase tracking-wider">
                    Judging Rubric & Criteria
                  </h5>
                  <div className="text-sm font-black text-[#8b5a2b]">
                    Overall Score: {totalScore}/100
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'innovation', label: 'Innovation & Uniqueness', desc: 'Originality of approach' },
                    { key: 'technical', label: 'Technical Execution', desc: 'Architecture & tech stack depth' },
                    { key: 'feasibility', label: 'Campus Problem-Fit', desc: 'Practicality for university adoption' },
                    { key: 'impact', label: 'Scalability & Impact', desc: 'Potential reach across faculties' },
                  ].map((crit) => (
                    <div key={crit.key} className="p-3 rounded-xl border border-[#d5c3b6]/50 bg-[#fff9ef]/40 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1d1b16]">{crit.label}</span>
                        <span className="text-xs font-bold text-[#8b5a2b]">{criteriaScores[crit.key]}/10</span>
                      </div>
                      <p className="text-[10px] text-[#71594f]">{crit.desc}</p>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={criteriaScores[crit.key]}
                        onChange={(e) => handleScoreChange(crit.key, parseInt(e.target.value, 10))}
                        className="w-full accent-[#8b5a2b] cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Judge Comments */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1d1b16]">Judge Feedback & Notes</label>
                <textarea
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Enter detailed feedback or suggestions for this project..."
                  className="w-full text-xs p-3 rounded-xl border border-[#d5c3b6] focus:border-[#8b5a2b] focus:ring-1 focus:ring-[#8b5a2b] bg-white outline-none resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-[#d5c3b6]/40 flex items-center justify-between gap-3 flex-wrap">
                <span className="text-[11px] text-[#71594f] italic">
                  Submissions are synchronized directly with Supabase.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEvaluate('not_selected')}
                    disabled={submitting}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#fcdcce] hover:bg-[#fcdcce]/80 text-[#775f54] text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[16px]">feedback</span>
                    <span>Submit Constructive Review</span>
                  </button>

                  <button
                    onClick={() => handleEvaluate('selected')}
                    disabled={submitting}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#147a46] hover:bg-[#11663b] text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>Approve as Finalist</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="md:col-span-8 p-12 text-center text-xs text-[#71594f] flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[36px] text-[#d5c3b6] mb-2">folder_open</span>
              <p>No project selected for evaluation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
