import React, { useState } from 'react';
import { IdeaFeedback } from '../types';
import { EDITORIAL_BANNER_URL } from '../data/mockData';

interface IdeaReviewViewProps {
  feedback: IdeaFeedback;
  onBack: () => void;
  onApplyImprovement?: () => void;
}

export const IdeaReviewView: React.FC<IdeaReviewViewProps> = ({
  feedback,
  onBack,
  onApplyImprovement,
}) => {
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [improvedApplied, setImprovedApplied] = useState(false);
  const [showWorkspaceBranch, setShowWorkspaceBranch] = useState(false);

  const handleImproveClick = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setImprovedApplied(true);
      setShowWorkspaceBranch(true);
      if (onApplyImprovement) onApplyImprovement();
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-28 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 pt-3 space-y-6">
      {/* Feedback Engine Eyebrow & Headline Header */}
      <div className="flex flex-col space-y-1.5 pt-1">
        <div className="flex items-center gap-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fcdcce] text-[#775f54] text-[11px] font-bold tracking-wider uppercase shadow-2xs">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            AI Innovation Feedback Engine
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1b16]">
          Your Idea Review
        </h2>
        <p className="text-sm text-[#51443a] leading-relaxed">
          Your idea wasn’t selected for the next stage — but your journey doesn’t have to stop here.
        </p>
      </div>

      {/* Philosophical Quote Callout Box */}
      <div className="relative overflow-hidden rounded-xl bg-[#f9f3ea] p-4 shadow-2xs border border-[#d5c3b6]/30">
        <div className="absolute -right-3 -bottom-5 opacity-10 select-none pointer-events-none text-[#6f4315]">
          <span className="material-symbols-outlined text-[90px]">format_quote</span>
        </div>
        <div className="relative flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#f3ede4] flex items-center justify-center shrink-0 shadow-2xs text-[#6f4315]">
            <span className="material-symbols-outlined text-[18px]">lightbulb</span>
          </div>
          <blockquote className="text-sm text-[#1d1b16] italic font-medium pt-0.5 leading-snug">
            “We don’t tell you what to build. We help you build what you already imagined — better.”
          </blockquote>
        </div>
      </div>

      {/* Submitted Idea Banner Card */}
      <div className="rounded-xl bg-[#ffffff] p-4 shadow-xs border border-[#d5c3b6]/40 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#71594f]">
              Original Idea
            </span>
            <h3 className="text-xl font-bold text-[#1d1b16] tracking-tight">{feedback.ideaTitle}</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#f3ede4] text-[#51443a] text-xs font-semibold shrink-0">
            Archived Draft
          </span>
        </div>

        {/* Metadata Pill Row */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1 text-xs text-[#51443a]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#6f4315]">account_circle</span>
            <span>{feedback.leadName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#6f4315]">group</span>
            <span>{feedback.teamName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#6f4315]">
              event_available
            </span>
            <span>{feedback.hackathonTitle}</span>
          </div>
        </div>
      </div>

      {/* 1. IDEA SUMMARY */}
      <div className="rounded-xl bg-[#f3ede4] p-4 shadow-2xs space-y-1.5 border border-[#d5c3b6]/40">
        <div className="flex items-center gap-2 text-[#6f4315]">
          <span className="material-symbols-outlined text-[18px]">description</span>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#51443a]">
            1. Idea Summary
          </h4>
        </div>
        <p className="text-sm text-[#1d1b16] leading-relaxed">{feedback.summary}</p>
      </div>

      {/* Visual Accent Divider / Editorial Illustration Banner */}
      <div className="relative overflow-hidden rounded-xl h-24 w-full shadow-2xs bg-[#ede7de]">
        <img
          src={EDITORIAL_BANNER_URL}
          alt="Editorial analysis desk"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover mix-blend-multiply opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#ede7de] via-transparent to-[#ede7de]/40" />
        <div className="absolute inset-y-0 left-4 flex items-center">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#51443a] block">
              Analytical Synthesis
            </span>
            <p className="text-base sm:text-lg font-bold text-[#1d1b16] tracking-tight">
              Comprehensive Appraisal
            </p>
          </div>
        </div>
      </div>

      {/* 2. WHAT YOU DID WELL */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold text-[#1d1b16] flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#fcdcce] flex items-center justify-center text-[#6f4315]">
              <span className="material-symbols-outlined text-[16px]">verified</span>
            </span>
            What You Did Well
          </h4>
          <span className="text-xs font-semibold text-[#71594f]">
            {feedback.strengths.length} Strengths Identified
          </span>
        </div>

        <div className="space-y-2">
          {feedback.strengths.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#ffffff] shadow-xs border border-[#d5c3b6]/40 flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-[#f3ede4] flex items-center justify-center shrink-0 mt-0.5 text-[#6f4315]">
                <span className="material-symbols-outlined text-[15px]">check</span>
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-[#1d1b16]">{item.title}</p>
                <p className="text-xs sm:text-sm text-[#51443a] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. GAPS TO CONSIDER */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold text-[#1d1b16] flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#fcdcce] flex items-center justify-center text-[#775f54]">
              <span className="material-symbols-outlined text-[16px]">priority_high</span>
            </span>
            Gaps to Consider
          </h4>
          <span className="text-xs font-semibold text-[#71594f]">
            {feedback.gaps.length} Architecture Gaps
          </span>
        </div>

        <div className="space-y-2">
          {feedback.gaps.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#f9f3ea] shadow-xs border border-[#d5c3b6]/40 flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-[#fcdcce] flex items-center justify-center shrink-0 mt-0.5 text-[#775f54]">
                <span className="material-symbols-outlined text-[15px]">sensors_off</span>
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-[#1d1b16]">{item.title}</p>
                <p className="text-xs sm:text-sm text-[#51443a] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. INNOVATION ANALYSIS */}
      <div className="rounded-xl bg-[#e7e2d9] p-4 shadow-xs space-y-2 border border-[#d5c3b6]/40">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#6f4315] text-[20px]">psychology</span>
          <h4 className="text-lg font-bold text-[#1d1b16]">Innovation Analysis</h4>
        </div>
        <div className="p-3.5 rounded-lg bg-[#ffffff] shadow-2xs space-y-1.5 border border-[#d5c3b6]/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#71594f]">
              Distinctiveness Evaluation
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#fcdcce] text-[#775f54] text-xs font-bold">
              {feedback.innovationAnalysis.tier}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#1d1b16] leading-relaxed">
            {feedback.innovationAnalysis.verdict}
          </p>
        </div>
      </div>

      {/* 5. HOW TO IMPROVE IT */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#6f4315] text-[20px]">construction</span>
          <h4 className="text-lg font-bold text-[#1d1b16]">How to Improve It</h4>
        </div>

        <div className="space-y-2">
          {feedback.improvements.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#ffffff] shadow-xs border border-[#d5c3b6]/40 flex items-start gap-4"
            >
              <span className="text-3xl font-extrabold text-[#d5c3b6] shrink-0 leading-none select-none">
                {item.step}
              </span>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-[#1d1b16]">{item.title}</p>
                <p className="text-xs sm:text-sm text-[#51443a] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. EXTEND YOUR IDEA (4-Level Progressive Maturity Framework) */}
      <div className="rounded-xl bg-[#f3ede4] p-4 shadow-xs space-y-3 border border-[#d5c3b6]/50">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-[#6f4315]">
            <span className="material-symbols-outlined text-[20px]">stairs</span>
            <h4 className="text-lg font-bold text-[#1d1b16]">Extend Your Idea</h4>
          </div>
          <p className="text-xs text-[#51443a]">The 4-level progressive maturity framework</p>
        </div>

        <div className="space-y-2 relative">
          {feedback.extensions.map((ext) => (
            <div
              key={ext.level}
              className="p-4 rounded-xl bg-[#ffffff] shadow-xs border border-[#d5c3b6]/40 space-y-1 transition-all hover:border-[#8b5a2b]/30"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                    ext.level === 4
                      ? 'bg-[#8b5a2b] text-white'
                      : ext.level === 3
                      ? 'bg-[#ffdcc1] text-[#2e1500]'
                      : ext.level === 2
                      ? 'bg-[#fcdcce] text-[#281810]'
                      : 'bg-[#f3ede4] text-[#51443a]'
                  }`}
                >
                  {ext.tag}
                </span>
                <span className="material-symbols-outlined text-[16px] text-[#71594f]">
                  {ext.icon}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#1d1b16] pt-1">{ext.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. RECOMMENDED NEXT STEPS */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#6f4315] text-[20px]">explore</span>
          <h4 className="text-lg font-bold text-[#1d1b16]">Recommended Next Steps</h4>
        </div>

        <div className="space-y-2">
          {feedback.nextSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#f9f3ea] shadow-xs border border-[#d5c3b6]/40 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#ede7de] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f3ede4] flex items-center justify-center text-[#6f4315] shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[18px]">{step.icon}</span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#1d1b16]">{step.text}</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#71594f]">
                chevron_right
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Improved Draft Workspace (Unlocked on Improve My Idea click) */}
      {showWorkspaceBranch && feedback.improvedDraft && (
        <div className="p-4 rounded-xl bg-[#ffffff] border-2 border-[#8b5a2b] shadow-md space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#8b5a2b]">
                code_blocks
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8b5a2b]">
                Workspace Branch Created
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#8b5a2b] text-white text-[10px] font-bold">
              v2.0 Draft
            </span>
          </div>

          <h5 className="text-base font-bold text-[#1d1b16]">
            {feedback.improvedDraft.revisedTitle}
          </h5>

          <p className="text-xs sm:text-sm text-[#51443a] leading-relaxed bg-[#f9f3ea] p-3 rounded-lg border border-[#d5c3b6]/30">
            {feedback.improvedDraft.revisedArchitecture}
          </p>

          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold uppercase text-[#71594f]">Key Adjustments:</span>
            {feedback.improvedDraft.keyAdjustments.map((adj, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#1d1b16]">
                <span className="material-symbols-outlined text-[14px] text-[#8b5a2b] mt-0.5">
                  task_alt
                </span>
                <span>{adj}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Action Box / CTAs matching HTML */}
      <div className="pt-2 pb-6 flex flex-col gap-2.5">
        <button
          onClick={handleImproveClick}
          disabled={isSynthesizing}
          type="button"
          className="w-full py-3.5 px-4 rounded-xl bg-[#8b5a2b] hover:bg-[#70451f] text-[#ffddc2] hover:text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md active:opacity-95 transition-all cursor-pointer"
        >
          {isSynthesizing ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
              <span>Synthesizing New Draft...</span>
            </>
          ) : improvedApplied ? (
            <>
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>Branch Created in Workspace (v2.0)</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">magic_button</span>
              <span>Improve My Idea</span>
            </>
          )}
        </button>

        <button
          onClick={onBack}
          type="button"
          className="w-full py-3.5 px-4 rounded-xl bg-[#f3ede4] hover:bg-[#ede7de] text-[#71594f] font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span>Back to My Applications</span>
        </button>
      </div>
    </div>
  );
};
