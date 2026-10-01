import React, { useState } from 'react';
import { Hackathon, IdeaSubmission } from '../types';

interface RegisterModalProps {
  hackathon: Hackathon;
  onClose: () => void;
  onSubmit: (submission: Omit<IdeaSubmission, 'id' | 'submittedAt'>) => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  hackathon,
  onClose,
  onSubmit,
}) => {
  const [teamName, setTeamName] = useState('Team Nova');
  const [leadName, setLeadName] = useState('Alex Jordan');
  const [leadEmail, setLeadEmail] = useState('alex.jordan@campus.edu');
  const [ideaTitle, setIdeaTitle] = useState('Smart College Canteen');
  const [problemStatement, setProblemStatement] = useState(
    'Students spend 20–30 minutes waiting in cafeteria queues during the lunch break, causing missed meals and rush-hour delays.'
  );
  const [solution, setSolution] = useState(
    'A pre-ordering mobile web application using QR authentication and pickup token prediction to reduce physical crowding.'
  );
  const [targetUsers, setTargetUsers] = useState('3,000+ campus students, faculty, and canteen kitchen staff.');
  const [techStack, setTechStack] = useState('React, Node.js, WebSockets, QR verification');
  const [expectedImpact, setExpectedImpact] = useState('Reduce peak lunch waiting times by 60% and improve canteen staff efficiency.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onSubmit({
        hackathonId: hackathon.id,
        hackathonTitle: hackathon.title,
        teamName,
        leadName,
        leadEmail,
        ideaTitle,
        summary: solution,
        problemStatement,
        solution,
        targetUsers,
        techStack,
        expectedImpact,
        status: 'submitted',
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  const prefillSample = (type: 'canteen' | 'eco' | 'custom') => {
    if (type === 'canteen') {
      setIdeaTitle('Smart College Canteen');
      setProblemStatement('Students spend 20–30 minutes waiting in cafeteria queues during the lunch break, causing missed meals.');
      setSolution('A pre-ordering mobile web application using QR authentication and pickup token prediction to reduce physical crowding.');
      setTechStack('React, Node.js, WebSockets, QR verification');
    } else if (type === 'eco') {
      setIdeaTitle('AI Campus Waste Sorter');
      setProblemStatement('Recyclables get contaminated with food waste in college dining areas.');
      setSolution('Edge vision camera mounted over bins classifying items and unlocking green cafeteria points.');
      setTechStack('Raspberry Pi 5, YOLOv8 nano, FastAPI, Supabase');
    } else {
      setIdeaTitle('');
      setProblemStatement('');
      setSolution('');
      setTechStack('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#30251F]/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#ffffff] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#d5c3b6]/50 shadow-xl p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d5c3b6]/30 pb-3">
          <div>
            <h3 className="text-base font-bold text-[#1d1b16]">Team Registration & Idea Submission</h3>
            <p className="text-xs text-[#71594f]">{hackathon.title}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f3ede4] flex items-center justify-center text-[#71594f]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Quick Sample Prefills */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[11px] font-bold text-[#71594f] uppercase tracking-wider">Quick Fill:</span>
          <button
            type="button"
            onClick={() => prefillSample('canteen')}
            className="px-2.5 py-1 rounded-md bg-[#fcdcce] text-[#775f54] text-xs font-bold hover:opacity-90"
          >
            Smart Canteen
          </button>
          <button
            type="button"
            onClick={() => prefillSample('eco')}
            className="px-2.5 py-1 rounded-md bg-[#f3ede4] text-[#1d1b16] text-xs font-semibold hover:bg-[#ede7de]"
          >
            AI Waste Sorter
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#1d1b16] block mb-1">Team Name</label>
              <input
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#1d1b16] block mb-1">Lead Name</label>
              <input
                type="text"
                required
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1d1b16] block mb-1">College Email</label>
            <input
              type="email"
              required
              value={leadEmail}
              onChange={(e) => setLeadEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
            />
          </div>

          <div className="border-t border-[#d5c3b6]/30 pt-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8b5a2b]">
              Idea Screening Proposal
            </h4>

            <div>
              <label className="text-xs font-bold text-[#1d1b16] block mb-1">Idea Title</label>
              <input
                type="text"
                required
                value={ideaTitle}
                onChange={(e) => setIdeaTitle(e.target.value)}
                placeholder="e.g., Smart College Canteen"
                className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1d1b16] block mb-1">Problem Statement</label>
              <textarea
                required
                rows={2}
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                placeholder="What recurring campus problem are you solving?"
                className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1d1b16] block mb-1">Proposed Solution</label>
              <textarea
                required
                rows={2}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="How does your solution address this?"
                className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#1d1b16] block mb-1">Tech Stack</label>
                <input
                  type="text"
                  required
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  placeholder="e.g., React, Node, WebSockets"
                  className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#1d1b16] block mb-1">Target Users</label>
                <input
                  type="text"
                  required
                  value={targetUsers}
                  onChange={(e) => setTargetUsers(e.target.value)}
                  placeholder="e.g., 3,000+ students"
                  className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-[#f3ede4] hover:bg-[#ede7de] text-[#1d1b16] font-semibold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-5 rounded-xl bg-[#6f4315] hover:bg-[#5a3610] text-white font-bold text-xs shadow-xs flex items-center gap-1.5"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
