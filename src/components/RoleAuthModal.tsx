import React, { useState, useEffect, useRef } from 'react';
import { Role } from '../types';
import { HackBridgeLogo } from './HackBridgeLogo';

interface RoleAuthModalProps {
  isOpen: boolean;
  mode: 'initial_welcome' | 'verify_switch';
  targetRole?: Role;
  onConfirm: (role: Role, credentialId?: string) => void;
  onCancel?: () => void;
}

export const RoleAuthModal: React.FC<RoleAuthModalProps> = ({
  isOpen,
  mode,
  targetRole,
  onConfirm,
  onCancel,
}) => {
  const [selectedRole, setSelectedRole] = useState<Role>(targetRole || 'student');
  const [idInput, setIdInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Movable / Draggable state
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragOriginRef = useRef<{ startX: number; startY: number; initX: number; initY: number }>({
    startX: 0,
    startY: 0,
    initX: 0,
    initY: 0,
  });

  // Reset position when modal opens
  useEffect(() => {
    if (isOpen) {
      setPosition({ x: 0, y: 0 });
      setErrorMsg('');
      if (targetRole) {
        setSelectedRole(targetRole);
      }
    }
  }, [isOpen, targetRole]);

  // Mouse drag listeners
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragOriginRef.current.startX;
      const dy = e.clientY - dragOriginRef.current.startY;
      setPosition({
        x: dragOriginRef.current.initX + dx,
        y: dragOriginRef.current.initY + dy,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Touch drag listeners (mobile support)
  useEffect(() => {
    if (!isDragging) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      const dx = touch.clientX - dragOriginRef.current.startX;
      const dy = touch.clientY - dragOriginRef.current.startY;
      setPosition({
        x: dragOriginRef.current.initX + dx,
        y: dragOriginRef.current.initY + dy,
      });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't drag if clicking buttons, inputs, links, or selector cards
    if (target.closest('button, input, select, textarea, a, .no-drag')) return;

    setIsDragging(true);
    dragOriginRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: position.x,
      initY: position.y,
    };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, input, select, textarea, a, .no-drag')) return;
    if (e.touches.length !== 1) return;

    const touch = e.touches[0];
    setIsDragging(true);
    dragOriginRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      initX: position.x,
      initY: position.y,
    };
  };

  if (!isOpen) return null;

  // Determine which role we are verifying
  const effectiveRole = mode === 'verify_switch' && targetRole ? targetRole : selectedRole;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (effectiveRole === 'student') {
      onConfirm('student');
      return;
    }

    if (effectiveRole === 'faculty') {
      if (!idInput.trim()) {
        setErrorMsg('Please enter your Faculty ID to continue.');
        return;
      }
      onConfirm('faculty', idInput.trim());
      return;
    }

    if (effectiveRole === 'organizer') {
      if (!idInput.trim()) {
        setErrorMsg('Please enter your Organizer ID to continue.');
        return;
      }
      onConfirm('organizer', idInput.trim());
      return;
    }

    if (effectiveRole === 'judge') {
      if (!idInput.trim()) {
        setErrorMsg('Please enter your Judge ID to continue.');
        return;
      }
      onConfirm('judge', idInput.trim());
      return;
    }
  };

  const handleQuickFill = (code: string) => {
    setIdInput(code);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#231812]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 pointer-events-auto overflow-y-auto">
      {/* Movable & Scrollable Card Container */}
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
        className={`bg-[#ffffff] rounded-2xl max-w-md w-full max-h-[85vh] sm:max-h-[88vh] overflow-hidden border border-[#d5c3b6]/80 shadow-[0_20px_50px_rgba(35,24,18,0.25)] flex flex-col will-change-transform ${
          isDragging ? 'select-none ring-2 ring-[#8b5a2b]/40 shadow-2xl opacity-95' : 'transition-shadow'
        }`}
      >
        {/* Draggable Header Zone (Fixed / shrink-0) */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="p-4 sm:p-5 border-b border-[#d5c3b6]/40 bg-[#fff9ef] flex flex-col items-center text-center space-y-1.5 cursor-grab active:cursor-grabbing select-none relative shrink-0"
        >
          {/* Subtle Visual Drag Handle Pill */}
          <div className="w-12 h-1.5 rounded-full bg-[#d5c3b6]/80 hover:bg-[#8b5a2b]/60 transition-colors -mt-1 mb-1" />

          {/* Movable Hint Badge */}
          <div className="absolute top-3.5 right-4 flex items-center gap-1 text-[10px] text-[#71594f] font-semibold bg-[#f3ede4] px-2 py-0.5 rounded-full pointer-events-none">
            <span className="material-symbols-outlined text-[13px] text-[#8b5a2b]">drag_indicator</span>
            <span>Movable</span>
          </div>

          <HackBridgeLogo size="md" showText={true} showTagline={true} />

          <div className="pt-1">
            <h3 className="text-base sm:text-lg font-extrabold text-[#1d1b16] tracking-tight">
              {mode === 'initial_welcome'
                ? 'Welcome! Select Your Role'
                : effectiveRole === 'organizer'
                ? 'Organizer Verification'
                : 'Faculty Verification'}
            </h3>
            <p className="text-xs text-[#51443a] max-w-xs mx-auto">
              {mode === 'initial_welcome'
                ? 'Are you a student, faculty member, or hackathon organizer?'
                : `Enter your ${effectiveRole} credentials to unlock privileged access.`}
            </p>
          </div>
        </div>

        {/* Scrollable Content Body (overflow-y-auto) */}
        <div className="p-4 sm:p-5 space-y-4 bg-[#ffffff] flex-1 overflow-y-auto overscroll-contain">
          {/* If Initial Welcome: 3 Role Selection Cards */}
          {mode === 'initial_welcome' && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#71594f] block">
                Choose Persona
              </span>

              <div className="grid grid-cols-1 gap-2 no-drag">
                {/* Student Option */}
                <div
                  onClick={() => {
                    setSelectedRole('student');
                    setErrorMsg('');
                  }}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                    selectedRole === 'student'
                      ? 'bg-[#fff9ef] border-[#8b5a2b] ring-1 ring-[#8b5a2b]/30 shadow-2xs'
                      : 'bg-[#ffffff] border-[#d5c3b6]/50 hover:bg-[#fdfbf7]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#f3ede4] text-[#1d1b16] flex items-center justify-center font-bold shrink-0">
                      <span className="material-symbols-outlined text-[18px]">person</span>
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#1d1b16] block">Student</span>
                      <span className="text-[11px] text-[#71594f]">
                        Submit ideas, track hacks & view AI reviews (No ID needed)
                      </span>
                    </div>
                  </div>
                  {selectedRole === 'student' && (
                    <span className="material-symbols-outlined text-[#8b5a2b] text-[18px]">
                      check_circle
                    </span>
                  )}
                </div>

                {/* Faculty Option */}
                <div
                  onClick={() => {
                    setSelectedRole('faculty');
                    setErrorMsg('');
                  }}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                    selectedRole === 'faculty'
                      ? 'bg-[#fff9ef] border-[#8b5a2b] ring-1 ring-[#8b5a2b]/30 shadow-2xs'
                      : 'bg-[#ffffff] border-[#d5c3b6]/50 hover:bg-[#fdfbf7]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#fcdcce] text-[#775f54] flex items-center justify-center font-bold shrink-0">
                      <span className="material-symbols-outlined text-[18px]">school</span>
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#1d1b16] block">Faculty 🎓</span>
                      <span className="text-[11px] text-[#71594f]">
                        Distribute events & endorse student batches (Faculty ID required)
                      </span>
                    </div>
                  </div>
                  {selectedRole === 'faculty' && (
                    <span className="material-symbols-outlined text-[#8b5a2b] text-[18px]">
                      check_circle
                    </span>
                  )}
                </div>

                {/* Organizer Option */}
                <div
                  onClick={() => {
                    setSelectedRole('organizer');
                    setErrorMsg('');
                  }}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                    selectedRole === 'organizer'
                      ? 'bg-[#fff9ef] border-[#8b5a2b] ring-1 ring-[#8b5a2b]/30 shadow-2xs'
                      : 'bg-[#ffffff] border-[#d5c3b6]/50 hover:bg-[#fdfbf7]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#6f4315] text-white flex items-center justify-center font-bold shrink-0">
                      <span className="material-symbols-outlined text-[18px]">settings</span>
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#1d1b16] block">Organizer ⚙️</span>
                      <span className="text-[11px] text-[#71594f]">
                        Host hackathons & screen student applications (Organizer ID required)
                      </span>
                    </div>
                  </div>
                  {selectedRole === 'organizer' && (
                    <span className="material-symbols-outlined text-[#8b5a2b] text-[18px]">
                      check_circle
                    </span>
                  )}
                </div>

                {/* Judge Option */}
                <div
                  onClick={() => {
                    setSelectedRole('judge');
                    setErrorMsg('');
                  }}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                    selectedRole === 'judge'
                      ? 'bg-[#fff9ef] border-[#8b5a2b] ring-1 ring-[#8b5a2b]/30 shadow-2xs'
                      : 'bg-[#ffffff] border-[#d5c3b6]/50 hover:bg-[#fdfbf7]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#8b5a2b] text-white flex items-center justify-center font-bold shrink-0">
                      <span className="material-symbols-outlined text-[18px]">gavel</span>
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#1d1b16] block">Judge ⚖️</span>
                      <span className="text-[11px] text-[#71594f]">
                        Score rubrics, run Edge AI analysis & evaluate projects (Judge ID required)
                      </span>
                    </div>
                  </div>
                  {selectedRole === 'judge' && (
                    <span className="material-symbols-outlined text-[#8b5a2b] text-[18px]">
                      check_circle
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ID Input Form for Faculty, Organizer, or Judge */}
          {(effectiveRole === 'faculty' || effectiveRole === 'organizer' || effectiveRole === 'judge') && (
            <form onSubmit={handleSubmit} className="space-y-2.5 pt-1 no-drag">
              <div>
                <label className="text-xs font-bold text-[#1d1b16] block mb-1">
                  {effectiveRole === 'organizer'
                    ? 'Enter Organizer ID'
                    : effectiveRole === 'judge'
                    ? 'Enter Judge ID'
                    : 'Enter Faculty ID'}
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#837469]">
                    badge
                  </span>
                  <input
                    type="text"
                    value={idInput}
                    onChange={(e) => {
                      setIdInput(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder={
                      effectiveRole === 'organizer'
                        ? 'e.g. ORG-2026 or ORG-ASIET'
                        : effectiveRole === 'judge'
                        ? 'e.g. JDG-2026 or JUDGE-CAMPUS'
                        : 'e.g. FAC-4012 or FAC-ASIET'
                    }
                    autoFocus
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-xl text-[#1d1b16] placeholder-[#837469] focus:outline-none focus:border-[#8b5a2b] focus:ring-2 focus:ring-[#8b5a2b]/20"
                  />
                </div>
                {errorMsg && (
                  <p className="text-[11px] text-[#ba1a1a] font-medium mt-1">{errorMsg}</p>
                )}
              </div>

              {/* Quick Sample ID Chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-[#71594f] font-semibold">Demo IDs:</span>
                <button
                  type="button"
                  onClick={() =>
                    handleQuickFill(
                      effectiveRole === 'organizer'
                        ? 'ORG-2026'
                        : effectiveRole === 'judge'
                        ? 'JDG-2026'
                        : 'FAC-ASIET'
                    )
                  }
                  className="px-2 py-0.5 rounded-md bg-[#f3ede4] hover:bg-[#ede7de] text-[#1d1b16] text-[10px] font-mono cursor-pointer transition-colors"
                >
                  {effectiveRole === 'organizer'
                    ? 'ORG-2026'
                    : effectiveRole === 'judge'
                    ? 'JDG-2026'
                    : 'FAC-ASIET'}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleQuickFill(
                      effectiveRole === 'organizer'
                        ? 'ORG-HACK'
                        : effectiveRole === 'judge'
                        ? 'JDG-AI'
                        : 'FAC-2024'
                    )
                  }
                  className="px-2 py-0.5 rounded-md bg-[#f3ede4] hover:bg-[#ede7de] text-[#1d1b16] text-[10px] font-mono cursor-pointer transition-colors"
                >
                  {effectiveRole === 'organizer'
                    ? 'ORG-HACK'
                    : effectiveRole === 'judge'
                    ? 'JDG-AI'
                    : 'FAC-2024'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ALWAYS-VISIBLE Sticky Footer with Submit Button */}
        <div className="p-3.5 sm:p-4 bg-[#fff9ef] border-t border-[#d5c3b6]/50 shrink-0 flex items-center justify-between gap-2.5 no-drag shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="py-2.5 px-4 rounded-xl bg-[#ffffff] hover:bg-[#f3ede4] border border-[#d5c3b6]/60 text-[#1d1b16] text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSubmit()}
            className={`py-2.5 px-5 rounded-xl text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex-1 flex items-center justify-center gap-1.5 ${
              effectiveRole === 'organizer'
                ? 'bg-[#6f4315] hover:bg-[#5a3610]'
                : effectiveRole === 'judge'
                ? 'bg-[#8b5a2b] hover:bg-[#70451f]'
                : effectiveRole === 'faculty'
                ? 'bg-[#8b5a2b] hover:bg-[#70451f]'
                : 'bg-[#1d1b16] hover:bg-[#30251F]'
            }`}
          >
            <span>
              {mode === 'initial_welcome'
                ? effectiveRole === 'student'
                  ? 'Enter as Student →'
                  : `Authenticate as ${
                      effectiveRole === 'organizer'
                        ? 'Organizer'
                        : effectiveRole === 'judge'
                        ? 'Judge'
                        : 'Faculty'
                    } →`
                : `Verify & Switch to ${
                    effectiveRole === 'organizer'
                      ? 'Organizer'
                      : effectiveRole === 'judge'
                      ? 'Judge'
                      : 'Faculty'
                  } →`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
