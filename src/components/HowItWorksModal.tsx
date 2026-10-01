import React from 'react';
import { HackBridgeLogo } from './HackBridgeLogo';

interface HowItWorksModalProps {
  onClose: () => void;
  onExplore: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ onClose, onExplore }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#30251F]/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#ffffff] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#d5c3b6]/50 shadow-xl p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d5c3b6]/30 pb-3">
          <HackBridgeLogo size="md" subtitle="DISCOVER • BUILD • LEARN • IMPROVE" />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f3ede4] flex items-center justify-center text-[#71594f]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Philosophy Quote */}
        <div className="p-3.5 rounded-xl bg-[#f9f3ea] border border-[#d5c3b6]/40 text-xs italic text-[#1d1b16] leading-relaxed">
          “We don’t tell you what to build. We help you build what you already imagined — better.”
        </div>

        {/* Core Differentiators */}
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-[#f3ede4] border border-[#d5c3b6]/40 space-y-1">
            <div className="flex items-center gap-2 text-[#6f4315]">
              <span className="material-symbols-outlined text-[18px]">campaign</span>
              <h4 className="text-xs font-bold uppercase tracking-wider">
                1. Campus Opportunity Distribution
              </h4>
            </div>
            <p className="text-xs text-[#51443a] leading-relaxed">
              HackBridge doesn’t rely solely on students refreshing job boards. Approved hackathons are
              automatically routed to verified faculty and class tutors who broadcast opportunities
              directly into departmental circles.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f3ede4] border border-[#d5c3b6]/40 space-y-1">
            <div className="flex items-center gap-2 text-[#6f4315]">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
              <h4 className="text-xs font-bold uppercase tracking-wider">
                2. Actionable AI Idea Review
              </h4>
            </div>
            <p className="text-xs text-[#51443a] leading-relaxed">
              Rejection in traditional hackathons is a dead end. On HackBridge, non-selected applicants
              receive a structured, personalized AI Review analyzing strengths, architectural gaps, and
              a 4-level progressive maturity roadmap.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => {
              onClose();
              onExplore();
            }}
            className="w-full py-3 rounded-xl bg-[#6f4315] hover:bg-[#5a3610] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Start Exploring Opportunities</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
