import React from 'react';

interface ProjectsViewProps {
  onOpenFeedback: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onOpenFeedback }) => {
  const projects = [
    {
      id: 'p1',
      title: 'Smart College Canteen (v2.0 Pacing Engine)',
      team: 'Team Nova',
      track: 'AI / Smart Campus',
      tagline: 'Refined architectural edition: tap-out sensors with dynamic timetable queue clustering.',
      status: 'In Workspace Refinement',
      badgeClass: 'bg-[#fcdcce] text-[#775f54]',
      hasReview: true,
    },
    {
      id: 'p2',
      title: 'AI Waste Audit & Segregation Sentinel',
      team: 'Team Vision',
      track: 'Civic Cloud & Edge AI',
      tagline: 'YOLOv8 edge classification of compost vs plastics with student carbon credit tokens.',
      status: 'Incubation Sprint',
      badgeClass: 'bg-[#e2f5ea] text-[#147a46]',
      hasReview: false,
    },
    {
      id: 'p3',
      title: 'Campus Autonomous Electric Cart Router',
      team: 'Team Kinesis',
      track: 'IoT / Mobility',
      tagline: 'On-demand routing for campus electric accessibility buggies.',
      status: 'Prototype Stage',
      badgeClass: 'bg-[#f3ede4] text-[#51443a]',
      hasReview: false,
    },
  ];

  return (
    <div className="flex flex-col w-full pb-24 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 pt-4 space-y-4">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#8b5a2b]">
          Campus Project Archive
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-[#1d1b16]">
          Projects & Prototypes
        </h2>
        <p className="text-xs sm:text-sm text-[#51443a]">
          Explore prototypes built during campus hackathons and evolved through the AI Review loop.
        </p>
      </div>

      <div className="space-y-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="p-4 sm:p-5 rounded-2xl bg-[#ffffff] border border-[#d5c3b6]/50 shadow-xs space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#837469] block">
                  {p.track} • {p.team}
                </span>
                <h3 className="text-base font-bold text-[#1d1b16] mt-0.5">{p.title}</h3>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${p.badgeClass}`}>
                {p.status}
              </span>
            </div>

            <p className="text-xs text-[#51443a] leading-relaxed">{p.tagline}</p>

            <div className="pt-2 flex items-center justify-between border-t border-[#d5c3b6]/30">
              <span className="text-[11px] text-[#71594f]">ASIET Innovation Cell</span>
              {p.hasReview ? (
                <button
                  onClick={onOpenFeedback}
                  className="text-xs font-bold text-[#8b5a2b] hover:text-[#6f4315] flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[15px]">psychology</span>
                  <span>View Review Roots →</span>
                </button>
              ) : (
                <span className="text-xs font-semibold text-[#71594f]">Active Hack Sprint</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
