export type Role = 'student' | 'faculty' | 'organizer';

export interface Hackathon {
  id: string;
  title: string;
  tagline: string;
  organizer: string;
  organizerVerified: boolean;
  category: string;
  categoryTrack: 'AI / INNOVATION' | 'WEB & CLOUD' | 'IOT / HARDWARE' | 'OPEN INNOVATION' | 'CLEANTECH';
  status: 'Registration Open' | 'Upcoming' | 'Closed' | 'Hacking Live';
  isCampusChapter: boolean;
  registrationDeadline: string;
  eventDates: string;
  teamSize: string;
  eligibility: string;
  venueFormat: string;
  location: string;
  grandPrize: string;
  prizePool: string;
  perks: string[];
  bannerUrl: string;
  registeredTeamsCount: number;
  about: string;
  themes: {
    id: string;
    title: string;
    desc: string;
    icon: string;
  }[];
  timeline: {
    title: string;
    date: string;
    desc: string;
    status: 'completed' | 'active' | 'upcoming';
  }[];
  prizes: {
    place: number;
    rankLabel: string;
    tag?: string;
    amount: string;
    benefits: string;
  }[];
}

export interface IdeaSubmission {
  id: string;
  hackathonId: string;
  hackathonTitle: string;
  teamName: string;
  leadName: string;
  leadEmail: string;
  ideaTitle: string;
  summary: string;
  problemStatement: string;
  solution: string;
  targetUsers: string;
  techStack: string;
  expectedImpact: string;
  status: 'submitted' | 'selected' | 'not_selected';
  submittedAt: string;
  feedback?: IdeaFeedback;
}

export interface IdeaFeedback {
  id: string;
  submissionId: string;
  ideaTitle: string;
  leadName: string;
  teamName: string;
  hackathonTitle: string;
  summary: string;
  strengths: {
    title: string;
    desc: string;
  }[];
  gaps: {
    title: string;
    desc: string;
  }[];
  innovationAnalysis: {
    tier: string;
    verdict: string;
  };
  improvements: {
    step: string;
    title: string;
    desc: string;
  }[];
  extensions: {
    level: number;
    tag: string;
    title: string;
    desc: string;
    icon: string;
    bgClass: string;
    badgeClass: string;
  }[];
  nextSteps: {
    icon: string;
    text: string;
  }[];
  improvedDraft?: {
    revisedTitle: string;
    revisedArchitecture: string;
    keyAdjustments: string[];
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'opportunity' | 'selection' | 'feedback' | 'reminder';
  timeAgo: string;
  isRead: boolean;
  linkAction?: string;
}
