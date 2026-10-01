import React, { useState } from 'react';
import { Hackathon } from '../types';

interface FacultyShareModalProps {
  hackathon: Hackathon;
  onClose: () => void;
  onBroadcastSuccess?: () => void;
}

export const FacultyShareModal: React.FC<FacultyShareModalProps> = ({
  hackathon,
  onClose,
  onBroadcastSuccess,
}) => {
  const [selectedBatches, setSelectedBatches] = useState<string[]>([
    'B.Tech CSE - Semester 5',
    'B.Tech CSE - Semester 7',
    'ASIET Innovation Club',
  ]);
  const [copied, setCopied] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastDone, setBroadcastDone] = useState(false);

  const batches = [
    'B.Tech CSE - Semester 5',
    'B.Tech CSE - Semester 7',
    'B.Tech AI & Data Science',
    'B.Tech ECE & IoT',
    'ASIET Innovation Club',
    'Campus FabLab Fellows',
  ];

  const toggleBatch = (batch: string) => {
    setSelectedBatches((prev) =>
      prev.includes(batch) ? prev.filter((b) => b !== batch) : [...prev, batch]
    );
  };

  const shareText = `🚀 NEW HACKATHON OPPORTUNITY FOR STUDENTS

Event: ${hackathon.title}
Organized by: ${hackathon.organizer}
Dates: ${hackathon.eventDates}
Team Size: ${hackathon.teamSize}
Eligibility: ${hackathon.eligibility}
Prize Pool: ${hackathon.prizePool}
Registration Deadline: ${hackathon.registrationDeadline}

🌟 Faculty Endorsement: Eligible student teams from endorsed batches unlock college lab access and mentor credits.
Every non-selected submission receives an actionable AI Idea Review.

Register your team here:
https://hackbridge.campus/events/${hackathon.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBroadcast = () => {
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastDone(true);
      if (onBroadcastSuccess) onBroadcastSuccess();
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#30251F]/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#ffffff] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#d5c3b6]/50 shadow-xl p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d5c3b6]/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#6f4315] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">school</span>
            </span>
            <div>
              <h3 className="text-base font-bold text-[#1d1b16]">
                Campus Opportunity Distribution
              </h3>
              <p className="text-[11px] text-[#71594f]">Verified Faculty Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f3ede4] flex items-center justify-center text-[#71594f]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Opportunity Card */}
        <div className="p-3.5 rounded-xl bg-[#f9f3ea] border border-[#d5c3b6]/40 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-[#8b5a2b] tracking-wider">
              Approved Opportunity
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#fcdcce] text-[#775f54] text-[10px] font-bold">
              Verified
            </span>
          </div>
          <h4 className="text-sm font-bold text-[#1d1b16]">{hackathon.title}</h4>
          <p className="text-xs text-[#51443a]">
            {hackathon.eventDates} • {hackathon.prizePool} pool • Closes {hackathon.registrationDeadline}
          </p>
        </div>

        {/* Select Student Batches */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#1d1b16] block uppercase tracking-wider">
            Select Student Batches to Endorse & Broadcast
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {batches.map((batch) => {
              const isChecked = selectedBatches.includes(batch);
              return (
                <div
                  key={batch}
                  onClick={() => toggleBatch(batch)}
                  className={`p-2.5 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-[#fff9ef] border-[#8b5a2b] text-[#1d1b16] font-semibold'
                      : 'bg-[#ffffff] border-[#d5c3b6]/40 text-[#71594f]'
                  }`}
                >
                  <span className="truncate pr-2">{batch}</span>
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      isChecked ? 'text-[#8b5a2b]' : 'text-[#d5c3b6]'
                    }`}
                  >
                    {isChecked ? 'check_box' : 'check_box_outline_blank'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ready to Share Announcement Message Preview */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#1d1b16] uppercase tracking-wider">
              Ready-to-Share Message
            </label>
            <button
              onClick={handleCopy}
              className="text-xs font-bold text-[#8b5a2b] hover:text-[#6f4315] flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">
                {copied ? 'done' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>
          </div>
          <div className="p-3 rounded-xl bg-[#f3ede4] border border-[#d5c3b6]/40 text-xs font-mono text-[#1d1b16] max-h-36 overflow-y-auto whitespace-pre-wrap select-all">
            {shareText}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-3 px-4 rounded-xl bg-[#f3ede4] hover:bg-[#ede7de] text-[#1d1b16] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
            <span>{copied ? 'Copied to Clipboard' : 'Copy Announcement'}</span>
          </button>

          <button
            onClick={handleBroadcast}
            disabled={isBroadcasting || selectedBatches.length === 0}
            className="flex-1 py-3 px-4 rounded-xl bg-[#6f4315] hover:bg-[#5a3610] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {isBroadcasting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                <span>Broadcasting to Batches...</span>
              </>
            ) : broadcastDone ? (
              <>
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Broadcast Delivered!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">campaign</span>
                <span>Broadcast to ({selectedBatches.length}) Batches</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
