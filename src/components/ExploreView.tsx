import React, { useState } from 'react';
import { Hackathon } from '../types';

interface ExploreViewProps {
  hackathons: Hackathon[];
  onSelectHackathon: (hackathon: Hackathon) => void;
  onOpenHostModal: () => void;
  onOpenFacultyShare: () => void;
  onOpenHowItWorks: () => void;
  onOpenStudentDashboard?: () => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  hackathons,
  onSelectHackathon,
  onOpenHostModal,
  onOpenFacultyShare,
  onOpenHowItWorks,
  onOpenStudentDashboard,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('All');
  const [selectedTag, setSelectedTag] = useState<string>('OPEN TO ALL');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['ai-innovation-challenge', 'codestorm-2026']);
  const [sortBy, setSortBy] = useState<'date' | 'prize'>('date');

  const tracks = ['All', 'AI/ML', 'Web Development', 'Mobile', 'IoT / Hardware', 'Open Innovation'];
  const filterTags = ['REG. OPEN', 'UPCOMING', 'ASIET CAMPUS', 'OPEN TO ALL'];

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag && tag !== 'OPEN TO ALL') {
      setSelectedTag('OPEN TO ALL');
    } else {
      setSelectedTag(tag);
    }
  };

  const filteredHackathons = hackathons
    .filter((h) => {
      const matchesSearch =
        h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.tagline.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTrack =
        selectedTrack === 'All' ||
        (selectedTrack === 'AI/ML' &&
          (h.categoryTrack === 'AI / INNOVATION' ||
            h.title.toLowerCase().includes('ai') ||
            h.category.toLowerCase().includes('ai'))) ||
        (selectedTrack === 'Web Development' &&
          (h.categoryTrack === 'WEB & CLOUD' || h.category.toLowerCase().includes('web'))) ||
        (selectedTrack === 'IoT / Hardware' &&
          (h.categoryTrack === 'IOT / HARDWARE' || h.category.toLowerCase().includes('iot'))) ||
        (selectedTrack === 'Mobile' &&
          (h.category.toLowerCase().includes('mobile') || h.tagline.toLowerCase().includes('mobile'))) ||
        (selectedTrack === 'Open Innovation' &&
          (h.categoryTrack === 'OPEN INNOVATION' || h.category.toLowerCase().includes('open')));

      const matchesTag =
        selectedTag === 'OPEN TO ALL'
          ? true
          : selectedTag === 'REG. OPEN'
          ? h.status === 'Registration Open'
          : selectedTag === 'UPCOMING'
          ? h.status === 'Upcoming'
          : selectedTag === 'ASIET CAMPUS'
          ? h.isCampusChapter
          : true;

      return matchesSearch && matchesTrack && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === 'prize') {
        const getVal = (str: string) => parseInt(str.replace(/[^0-9]/g, '') || '0', 10);
        return getVal(b.grandPrize || b.prizePool) - getVal(a.grandPrize || a.prizePool);
      }
      return 0;
    });

  const scrollToHackathons = () => {
    const el = document.getElementById('upcoming-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full pb-24 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 pt-4 sm:pt-6 space-y-6">
      {/* Hero Section */}
      <div className="flex flex-col space-y-3 pt-2">
        <div className="inline-flex items-center self-start">
          <span className="px-3.5 py-1 rounded-full bg-[#f3ede4] text-[#51443a] text-[11px] font-bold tracking-wider uppercase">
            Campus Innovation Network
          </span>
        </div>

        <h1 className="text-[34px] sm:text-[44px] font-extrabold tracking-tight text-[#1d1b16] leading-[1.08]">
          DISCOVER YOUR NEXT{' '}
          <span className="font-serif italic font-normal text-[#8b5a2b] tracking-normal">
            HACKATHON
          </span>
        </h1>

        <p className="text-[15px] sm:text-[16px] text-[#51443a] leading-relaxed max-w-xl">
          Find hackathons, innovation challenges, and campus opportunities before you miss them.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 pt-1 flex-wrap">
          <button
            onClick={scrollToHackathons}
            className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#6f4315] hover:bg-[#5a3610] active:scale-[0.98] text-[#ffffff] font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span>Explore Hackathons</span>
            <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
          </button>

          {onOpenStudentDashboard && (
            <button
              onClick={onOpenStudentDashboard}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#8b5a2b] hover:bg-[#70451f] active:scale-[0.98] text-[#ffffff] font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">analytics</span>
              <span>My Submissions & Graph</span>
            </button>
          )}

          <button
            onClick={onOpenHostModal}
            className="px-4 py-2.5 rounded-xl bg-[#f3ede4] hover:bg-[#ede7de] active:scale-[0.98] text-[#1d1b16] font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#8b5a2b]">add_circle</span>
            <span>Host</span>
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative w-full">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-[#837469]">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search hackathons, themes, or college..."
          className="w-full pl-10 pr-12 py-3 bg-[#ffffff] border border-[#d5c3b6]/60 rounded-xl text-sm text-[#1d1b16] placeholder-[#837469] focus:outline-none focus:border-[#8b5a2b] focus:ring-2 focus:ring-[#8b5a2b]/15 shadow-xs transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-medium text-[#71594f] bg-[#f3ede4] border border-[#d5c3b6] rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Tracks & Categories Horizontal Scroller */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#71594f] tracking-wider uppercase">
          <span>Tracks & Categories</span>
          <span className="text-[11px] font-medium text-[#837469] flex items-center gap-1">
            Scroll →
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {tracks.map((track) => {
            const isSelected = selectedTrack === track;
            return (
              <button
                key={track}
                onClick={() => setSelectedTrack(track)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#30251F] text-[#fff9ef] shadow-xs'
                    : 'bg-[#f3ede4] text-[#51443a] hover:bg-[#ede7de]'
                }`}
              >
                {track === 'AI/ML' && (
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                )}
                <span>{track}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Status Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
        {filterTags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold tracking-wider uppercase whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#fcdcce] text-[#775f54]'
                  : 'bg-[#f3ede4] text-[#71594f] hover:bg-[#ede7de]'
              }`}
            >
              {tag === 'REG. OPEN' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-pulse" />
              )}
              <span>{tag}</span>
            </button>
          );
        })}
      </div>

      {/* Upcoming Hackathons List Header */}
      <div id="upcoming-section" className="pt-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#1d1b16] tracking-tight">
            Upcoming Hackathons
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-[#fcdcce] text-[#775f54] text-xs font-bold">
            {filteredHackathons.length} Events
          </span>
        </div>

        <button
          onClick={() => setSortBy(sortBy === 'date' ? 'prize' : 'date')}
          className="text-xs font-semibold text-[#71594f] flex items-center gap-1 hover:text-[#1d1b16] transition-colors"
        >
          <span>Sort by: {sortBy === 'date' ? 'Date' : 'Prize'}</span>
          <span className="material-symbols-outlined text-[16px]">expand_more</span>
        </button>
      </div>

      {/* Hackathon Cards List */}
      <div className="space-y-4">
        {filteredHackathons.map((h) => {
          const isBookmarked = bookmarkedIds.includes(h.id);
          const isPrimary = h.id === 'ai-innovation-challenge';

          return (
            <div
              key={h.id}
              onClick={() => onSelectHackathon(h)}
              className="group bg-[#ffffff] rounded-2xl border border-[#d5c3b6]/50 p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-[#8b5a2b]/40 transition-all duration-200 cursor-pointer space-y-3.5"
            >
              {/* Card Header: Category badge + Registration badge + Bookmark button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#fcdcce] text-[#775f54] text-[11px] font-bold uppercase tracking-wider">
                    {h.categoryTrack}
                  </span>
                  <span className="flex items-center gap-1 text-[12px] font-semibold text-[#71594f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]" />
                    {h.status}
                  </span>
                </div>

                <button
                  onClick={(e) => toggleBookmark(e, h.id)}
                  aria-label="Bookmark"
                  className="w-8 h-8 flex items-center justify-center rounded-full text-[#837469] hover:bg-[#f3ede4] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isBookmarked ? 'bookmark' : 'bookmark_border'}
                  </span>
                </button>
              </div>

              {/* Organizer Row */}
              <div className="flex items-center gap-1.5 text-xs text-[#71594f] font-medium">
                <span className="material-symbols-outlined text-[15px] text-[#8b5a2b]">
                  verified
                </span>
                <span>{h.organizer}</span>
                {h.isCampusChapter && (
                  <>
                    <span>•</span>
                    <span className="text-[#8b5a2b] font-semibold">Campus Chapter</span>
                  </>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-xl font-bold text-[#1d1b16] tracking-tight group-hover:text-[#6f4315] transition-colors">
                  {h.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#51443a] mt-1 leading-relaxed line-clamp-2">
                  {h.tagline}
                </p>
              </div>

              {/* Visual Thumbnail Banner (if primary card like in image 3) */}
              {isPrimary && (
                <div className="relative rounded-xl overflow-hidden h-36 sm:h-44 w-full bg-[#f3ede4]">
                  {/* Subtle photo representation of students hacking */}
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ67MYqKvTf8W9XPzUCqkhTZkTwg8aa0uu9auLXUS3JvUcjNak4FuNVen0kp0mLsFaLy2PXNzYvhUHLfs58AcQknhndOE6gWe34t0qOwU9WC2RUsKc_izVZfqh14DW_jU4TF_0tn-bgXsWZgF9cOnHNSOKPn4-xCXhJ8t0CA0oj9RDcOu5oLiw18wXrZJtscKUcgWNDsC4lOg1-hMVIxw1ePxgnNYBZkO_rkD-FLT5kxdZkkfoPwmzHw"
                    alt="AI Innovation Sprint"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover mix-blend-multiply opacity-85 group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Overlay Badges */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-[#ffffff] font-bold text-xs">
                      Grand Prize ₹50,000
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#8b5a2b]/90 backdrop-blur-xs text-[#ffffff] font-bold text-xs">
                      Incubation Grants
                    </span>
                  </div>
                </div>
              )}

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 pt-1 text-xs text-[#51443a] border-t border-[#d5c3b6]/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[17px] text-[#71594f]">
                    calendar_today
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#837469] block leading-none">
                      Hack Days
                    </span>
                    <span className="font-semibold text-[#1d1b16]">{h.eventDates}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[17px] text-[#71594f]">
                    schedule
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#837469] block leading-none">
                      Deadline
                    </span>
                    <span className="font-semibold text-[#1d1b16]">{h.registrationDeadline}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[17px] text-[#71594f]">group</span>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#837469] block leading-none">
                      Team Size
                    </span>
                    <span className="font-semibold text-[#1d1b16]">{h.teamSize}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[17px] text-[#71594f]">
                    location_on
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#837469] block leading-none">
                      Venue
                    </span>
                    <span className="font-semibold text-[#1d1b16] truncate max-w-[140px]">
                      {h.venueFormat}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-1">
                {isPrimary ? (
                  <button className="w-full py-3 rounded-xl bg-[#6f4315] hover:bg-[#5a3610] text-[#ffffff] font-semibold text-sm flex items-center justify-center gap-1.5 shadow-xs transition-colors">
                    <span>View Hackathon</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                ) : (
                  <button className="w-full py-2.5 rounded-xl bg-[#f3ede4] hover:bg-[#ede7de] text-[#1d1b16] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors">
                    <span>View Details</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Faculty Endorsement Network Card (PRD Differentiator #1) */}
      <div className="rounded-2xl bg-[#6f4315] text-[#ffffff] p-5 sm:p-6 shadow-md relative overflow-hidden space-y-3.5">
        <div className="flex items-center gap-2 text-[#ffdcc1]">
          <span className="material-symbols-outlined text-[20px]">school</span>
          <span className="text-[11px] font-bold uppercase tracking-widest">
            Faculty Endorsement Network
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#ffffff]">
          Campus Opportunity Distribution
        </h3>

        <p className="text-sm text-[#ffdcc1]/90 leading-relaxed">
          Verified faculty can directly forward endorsed hackathons and departmental grants to
          eligible student batches. Get verified to unlock your team’s internal grant.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onOpenHowItWorks}
            className="px-4 py-2.5 rounded-xl bg-[#ffffff] text-[#6f4315] font-bold text-xs hover:bg-[#f9f3ea] active:scale-[0.98] transition-all shadow-xs"
          >
            Learn How It Works
          </button>

          <button
            onClick={onOpenFacultyShare}
            className="text-xs font-bold text-[#ffdcc1] hover:text-[#ffffff] flex items-center gap-1 transition-colors"
          >
            <span>Faculty Portal →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
