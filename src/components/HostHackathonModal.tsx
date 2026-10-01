import React, { useState } from 'react';
import { Hackathon } from '../types';

interface HostHackathonModalProps {
  onClose: () => void;
  onSaveHackathon: (hackathon: Hackathon) => void;
}

export const HostHackathonModal: React.FC<HostHackathonModalProps> = ({
  onClose,
  onSaveHackathon,
}) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [organizer, setOrganizer] = useState('Campus Innovation Hub');
  const [categoryTrack, setCategoryTrack] = useState<Hackathon['categoryTrack']>('AI / INNOVATION');
  const [eventDates, setEventDates] = useState('18–19 November 2026');
  const [registrationDeadline, setRegistrationDeadline] = useState('Closes 12 Nov');
  const [teamSize, setTeamSize] = useState('2–4 Members');
  const [prizePool, setPrizePool] = useState('₹75,000');
  const [location, setLocation] = useState('ASIET Campus & Hybrid');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newHackathon: Hackathon = {
      id: `hack-${Date.now()}`,
      title: title || 'Campus Innovation Hackathon',
      tagline: tagline || 'Building scalable student engineering solutions.',
      organizer,
      organizerVerified: true,
      category: categoryTrack,
      categoryTrack,
      status: 'Registration Open',
      isCampusChapter: true,
      registrationDeadline,
      eventDates,
      teamSize,
      eligibility: 'All College Batches',
      venueFormat: location,
      location,
      grandPrize: '₹40,000',
      prizePool,
      perks: [prizePool, 'Faculty Endorsement', 'Guaranteed AI Review'],
      bannerUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ67MYqKvTf8W9XPzUCqkhTZkTwg8aa0uu9auLXUS3JvUcjNak4FuNVen0kp0mLsFaLy2PXNzYvhUHLfs58AcQknhndOE6gWe34t0qOwU9WC2RUsKc_izVZfqh14DW_jU4TF_0tn-bgXsWZgF9cOnHNSOKPn4-xCXhJ8t0CA0oj9RDcOu5oLiw18wXrZJtscKUcgWNDsC4lOg1-hMVIxw1ePxgnNYBZkO_rkD-FLT5kxdZkkfoPwmzHw',
      registeredTeamsCount: 1,
      about: `${title} is organized to encourage rapid multidisciplinary prototypes. Teams collaborate over intense sprint sessions with guaranteed feedback.`,
      themes: [
        { id: 'theme-1', title: 'Open Campus Challenge', desc: 'Solve campus workflows.', icon: 'apartment' },
        { id: 'theme-2', title: 'Intelligent Systems', desc: 'Deploy automated tools.', icon: 'psychology' },
      ],
      timeline: [
        { title: 'Registration Opens', date: 'Now', desc: 'Accepting submissions', status: 'completed' },
        { title: 'Idea Deadline', date: registrationDeadline, desc: 'Shortlisting phase', status: 'active' },
        { title: 'Hack Sprint', date: eventDates, desc: '36-hour sprint', status: 'upcoming' },
      ],
      prizes: [
        { place: 1, rankLabel: 'CHAMPION', tag: 'Grand Winner', amount: '₹40,000', benefits: 'Incubation & Trophy' },
        { place: 2, rankLabel: 'RUNNER UP', amount: '₹25,000', benefits: 'Grant & Certificate' },
      ],
    };

    onSaveHackathon(newHackathon);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#30251F]/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#ffffff] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#d5c3b6]/50 shadow-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#d5c3b6]/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#6f4315] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
            </span>
            <div>
              <h3 className="text-base font-bold text-[#1d1b16]">Host an Innovation Challenge</h3>
              <p className="text-xs text-[#71594f]">Publish campus hackathon to HackBridge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f3ede4] flex items-center justify-center text-[#71594f]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-[#1d1b16] block mb-1">Hackathon Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., CleanTech Kerala Campus Sprint"
              className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#1d1b16] block mb-1">Short Tagline</label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Briefly describe what students will build..."
              className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#1d1b16] block mb-1">Category Track</label>
              <select
                value={categoryTrack}
                onChange={(e) => setCategoryTrack(e.target.value as Hackathon['categoryTrack'])}
                className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
              >
                <option value="AI / INNOVATION">AI / INNOVATION</option>
                <option value="WEB & CLOUD">WEB & CLOUD</option>
                <option value="IOT / HARDWARE">IOT / HARDWARE</option>
                <option value="OPEN INNOVATION">OPEN INNOVATION</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#1d1b16] block mb-1">Organizer Unit</label>
              <input
                type="text"
                required
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#1d1b16] block mb-1">Event Dates</label>
              <input
                type="text"
                required
                value={eventDates}
                onChange={(e) => setEventDates(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#1d1b16] block mb-1">Deadline</label>
              <input
                type="text"
                required
                value={registrationDeadline}
                onChange={(e) => setRegistrationDeadline(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#1d1b16] block mb-1">Prize Pool</label>
              <input
                type="text"
                required
                value={prizePool}
                onChange={(e) => setPrizePool(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#1d1b16] block mb-1">Team Size</label>
              <input
                type="text"
                required
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#ffffff] border border-[#d5c3b6] rounded-lg focus:outline-none focus:border-[#8b5a2b]"
              />
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
              className="py-2.5 px-5 rounded-xl bg-[#6f4315] hover:bg-[#5a3610] text-white font-bold text-xs shadow-xs"
            >
              Publish Hackathon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
