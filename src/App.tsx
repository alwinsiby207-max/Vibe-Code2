import React, { useState } from 'react';
import {
  INITIAL_HACKATHONS,
  INITIAL_SUBMISSIONS,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';
import { Hackathon, IdeaSubmission, IdeaFeedback, Role, NotificationItem } from './types';
import { generateStructuredIdeaReview } from './utils/aiReviewGenerator';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ExploreView } from './components/ExploreView';
import { HackathonDetailsView } from './components/HackathonDetailsView';
import { IdeaReviewView } from './components/IdeaReviewView';
import { MyHacksView } from './components/MyHacksView';
import { ProjectsView } from './components/ProjectsView';
import { AlertsView } from './components/AlertsView';
import { ProfileView } from './components/ProfileView';
import { RegisterModal } from './components/RegisterModal';
import { FacultyShareModal } from './components/FacultyShareModal';
import { OrganizerModal } from './components/OrganizerModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { HostHackathonModal } from './components/HostHackathonModal';
import { StudentDashboardModal } from './components/StudentDashboardModal';
import { RoleAuthModal } from './components/RoleAuthModal';
import { JudgeModal } from './components/JudgeModal';
import { SupabaseService } from './lib/supabaseService';
import { supabase } from './lib/supabase';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('explore');
  const [activeRole, setActiveRole] = useState<Role>('student');
  const [hackathons, setHackathons] = useState<Hackathon[]>(INITIAL_HACKATHONS);
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon>(INITIAL_HACKATHONS[0]);
  const [submissions, setSubmissions] = useState<IdeaSubmission[]>(INITIAL_SUBMISSIONS);
  const [activeSubmission, setActiveSubmission] = useState<IdeaSubmission>(INITIAL_SUBMISSIONS[0]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Initial role prompt on app entrance & role switch verification
  const [isWelcomePromptOpen, setIsWelcomePromptOpen] = useState(true);
  const [switchAuthTarget, setSwitchAuthTarget] = useState<Role | null>(null);

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isFacultyShareOpen, setIsFacultyShareOpen] = useState(false);
  const [isOrganizerOpen, setIsOrganizerOpen] = useState(false);
  const [isJudgeOpen, setIsJudgeOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isHostOpen, setIsHostOpen] = useState(false);
  const [isStudentDashboardOpen, setIsStudentDashboardOpen] = useState(false);
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(true);

  // Fetch initial data from Supabase
  React.useEffect(() => {
    let isMounted = true;
    async function initSupabase() {
      try {
        const [hacks, subs, notifs] = await Promise.all([
          SupabaseService.getHackathons(),
          SupabaseService.getSubmissions(),
          SupabaseService.getNotifications(),
        ]);
        if (!isMounted) return;
        if (hacks && hacks.length > 0) {
          setHackathons(hacks);
          setSelectedHackathon(hacks[0]);
        }
        if (subs && subs.length > 0) {
          setSubmissions(subs);
          setActiveSubmission(subs[0]);
        }
        if (notifs && notifs.length > 0) {
          setNotifications(notifs);
        }
        setSupabaseConnected(true);
      } catch (e) {
        console.warn('Supabase initialization notice:', e);
      }
    }
    initSupabase();
    return () => {
      isMounted = false;
    };
  }, []);

  // Unread alerts count
  const unreadAlertsCount = notifications.filter((n) => !n.isRead).length;

  // View navigation helper
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHackathon = (hackathon: Hackathon) => {
    setSelectedHackathon(hackathon);
    handleNavigate('hackathon-details');
  };

  const handleOpenIdeaReview = (submission?: IdeaSubmission) => {
    if (submission) {
      setActiveSubmission(submission);
    }
    handleNavigate('idea-review');
  };

  // Role transition handler with authentication logic
  const handleRoleChangeRequest = (requestedRole: Role) => {
    // 1. Moving to Student mode: direct transition with NO authentication
    if (requestedRole === 'student') {
      setActiveRole('student');
      setIsOrganizerOpen(false);
      setIsFacultyShareOpen(false);
      setIsJudgeOpen(false);
      return;
    }

    // 2. Moving to Organizer mode: requires Organizer ID
    if (requestedRole === 'organizer') {
      if (activeRole === 'organizer') {
        setIsOrganizerOpen(true);
        return;
      }
      setSwitchAuthTarget('organizer');
      return;
    }

    // 3. Moving to Judge mode: requires Judge ID
    if (requestedRole === 'judge') {
      if (activeRole === 'judge') {
        setIsJudgeOpen(true);
        return;
      }
      setSwitchAuthTarget('judge');
      return;
    }

    // 4. Moving to Faculty mode: requires Faculty ID
    if (requestedRole === 'faculty') {
      if (activeRole === 'faculty') {
        setIsFacultyShareOpen(true);
        return;
      }
      setSwitchAuthTarget('faculty');
      return;
    }
  };

  // Student registers a team and submits an idea (persisted to Supabase)
  const handleAddSubmission = async (newSub: Omit<IdeaSubmission, 'id' | 'submittedAt'>) => {
    const id = `sub-${Date.now()}`;
    const submissionRecord: IdeaSubmission = {
      ...newSub,
      id,
      submittedAt: 'Just now',
    };

    setSubmissions((prev) => [submissionRecord, ...prev]);
    setActiveSubmission(submissionRecord);

    // Save to Supabase
    try {
      const persisted = await SupabaseService.createSubmission(newSub);
      if (persisted.id && persisted.id !== id) {
        setSubmissions((prev) => prev.map((s) => (s.id === id ? persisted : s)));
        setActiveSubmission(persisted);
      }
    } catch (e) {
      console.warn('Supabase submission save caught:', e);
    }

    // Add confirmation notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Application Submitted',
        message: `Your idea "${newSub.ideaTitle}" has been queued for screening in ${newSub.hackathonTitle}.`,
        type: 'selection',
        timeAgo: 'Just now',
        isRead: false,
        linkAction: 'my-hacks',
      },
      ...prev,
    ]);

    handleNavigate('my-hacks');
  };

  // Organizer updates an idea status (Selected or Not Selected)
  const handleOrganizerUpdateStatus = async (id: string, status: 'selected' | 'not_selected') => {
    const targetSub = submissions.find((s) => s.id === id);
    let feedback = targetSub?.feedback;

    if (status === 'not_selected' && !feedback && targetSub) {
      feedback = await SupabaseService.runProjectAnalysis(targetSub);
    }

    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id !== id) return sub;

        const updated: IdeaSubmission = {
          ...sub,
          status,
          feedback: status === 'not_selected' ? feedback : undefined,
        };

        if (sub.id === activeSubmission.id) {
          setActiveSubmission(updated);
        }

        return updated;
      })
    );

    if (status === 'not_selected') {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: '✨ AI Idea Review Ready',
          message: `Organizer completed screening for your submission. Explore detailed feedback in your Student Dashboard.`,
          type: 'feedback',
          timeAgo: 'Just now',
          isRead: false,
          linkAction: 'idea-review',
        },
        ...prev,
      ]);
    }
  };

  // Judge submits project evaluation with score and feedback
  const handleJudgeEvaluation = async (
    projectId: string,
    score: number,
    comments: string,
    decision: 'selected' | 'not_selected',
    feedback?: IdeaFeedback
  ) => {
    await SupabaseService.submitEvaluation(projectId, 'judge-demo', score, comments, decision);

    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id !== projectId) return sub;
        const updated: IdeaSubmission = {
          ...sub,
          status: decision,
          feedback: decision === 'not_selected' ? (feedback || sub.feedback) : undefined,
        };
        if (sub.id === activeSubmission.id) {
          setActiveSubmission(updated);
        }
        return updated;
      })
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: decision === 'selected' ? '🏆 Finalist Selection Confirmed' : '📝 Project Evaluation Complete',
        message: `Evaluation recorded with score ${score}/100. Status updated to ${decision === 'selected' ? 'Selected' : 'Reviewed'}.`,
        type: 'feedback',
        timeAgo: 'Just now',
        isRead: false,
        linkAction: 'idea-review',
      },
      ...prev,
    ]);
  };

  // Faculty broadcasts an opportunity
  const handleBroadcastSuccess = () => {
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Opportunity Broadcast Active',
        message: `Endorsement and registration links distributed across enrolled campus batches.`,
        type: 'opportunity',
        timeAgo: 'Just now',
        isRead: false,
      },
      ...prev,
    ]);
  };

  // Host new hackathon (persisted to Supabase)
  const handleCreateHackathon = async (newHack: Hackathon) => {
    setHackathons((prev) => [newHack, ...prev]);
    setSelectedHackathon(newHack);
    try {
      await SupabaseService.createHackathon(newHack);
    } catch (e) {
      console.warn('Supabase hackathon save caught:', e);
    }
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: '🚨 New Campus Opportunity',
        message: `${newHack.title} is now published and open for campus batch distribution.`,
        type: 'opportunity',
        timeAgo: 'Just now',
        isRead: false,
        linkAction: 'hackathon-details',
      },
      ...prev,
    ]);
    handleNavigate('explore');
  };

  const markAllAlertsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleAlertAction = (action: string) => {
    if (action === 'faculty-share') {
      setIsFacultyShareOpen(true);
    } else if (action === 'idea-review') {
      handleNavigate('idea-review');
    } else if (action === 'hackathon-details') {
      handleNavigate('hackathon-details');
    } else if (action === 'my-hacks') {
      handleNavigate('my-hacks');
    }
  };

  // Find user submission for current selected hackathon
  const userSubmissionForSelected = submissions.find(
    (s) => s.hackathonId === selectedHackathon.id && s.leadEmail === 'abcd@gmail.com'
  );

  return (
    <div className="min-h-screen bg-[#fff9ef] text-[#1d1b16] flex flex-col font-sans selection:bg-[#fcdcce] selection:text-[#775f54]">
      {/* Top Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        showBack={currentView !== 'explore'}
        onBack={() => {
          if (currentView === 'idea-review') {
            handleNavigate('my-hacks');
          } else if (currentView === 'hackathon-details') {
            handleNavigate('explore');
          } else {
            handleNavigate('explore');
          }
        }}
        title={
          currentView === 'hackathon-details'
            ? 'Hackathon Details'
            : currentView === 'idea-review'
              ? 'My Feedback'
              : currentView === 'my-hacks'
                ? 'My Applications'
                : currentView === 'projects'
                  ? 'Projects'
                  : currentView === 'alerts'
                    ? 'Alerts'
                    : currentView === 'profile'
                      ? 'Profile'
                      : 'Explore'
        }
        activeRole={activeRole}
        onToggleRole={handleRoleChangeRequest}
        unreadCount={unreadAlertsCount}
        onOpenStudentDashboard={() => setIsStudentDashboardOpen(true)}
        onOpenOrganizerDesk={() => setIsOrganizerOpen(true)}
        onOpenJudgePortal={() => setIsJudgeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentView === 'explore' && (
          <ExploreView
            hackathons={hackathons}
            onSelectHackathon={handleSelectHackathon}
            onOpenHostModal={() => setIsHostOpen(true)}
            onOpenFacultyShare={() => setIsFacultyShareOpen(true)}
            onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
            onOpenStudentDashboard={() => setIsStudentDashboardOpen(true)}
          />
        )}

        {currentView === 'hackathon-details' && (
          <HackathonDetailsView
            hackathon={selectedHackathon}
            onBack={() => handleNavigate('explore')}
            onRegister={() => setIsRegisterOpen(true)}
            userSubmission={userSubmissionForSelected}
            onViewFeedback={() => {
              if (userSubmissionForSelected) {
                setActiveSubmission(userSubmissionForSelected);
              }
              handleNavigate('idea-review');
            }}
          />
        )}

        {currentView === 'idea-review' && (
          <IdeaReviewView
            feedback={activeSubmission.feedback || INITIAL_SUBMISSIONS[0].feedback!}
            onBack={() => handleNavigate('my-hacks')}
            onApplyImprovement={() => {
              // Mark improved
            }}
          />
        )}

        {currentView === 'my-hacks' && (
          <MyHacksView
            submissions={submissions}
            hackathons={hackathons}
            onViewFeedback={(sub) => handleOpenIdeaReview(sub)}
            onSelectHackathon={handleSelectHackathon}
            onOpenStudentDashboard={() => setIsStudentDashboardOpen(true)}
          />
        )}

        {currentView === 'projects' && (
          <ProjectsView onOpenFeedback={() => handleNavigate('idea-review')} />
        )}

        {currentView === 'alerts' && (
          <AlertsView
            notifications={notifications}
            onOpenAction={handleAlertAction}
            onMarkAllRead={markAllAlertsRead}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView
            activeRole={activeRole}
            onToggleRole={handleRoleChangeRequest}
            onOpenMyHacks={() => handleNavigate('my-hacks')}
            onOpenFeedback={() => handleNavigate('idea-review')}
            onOpenHostModal={() => setIsHostOpen(true)}
            onOpenFacultyPortal={() => setIsFacultyShareOpen(true)}
            onOpenStudentDashboard={() => setIsStudentDashboardOpen(true)}
            onOpenJudgePortal={() => setIsJudgeOpen(true)}
          />
        )}
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNav
        currentView={currentView}
        onNavigate={handleNavigate}
        unreadCount={unreadAlertsCount}
        hasFeedbackReady={submissions.some((s) => s.status === 'not_selected')}
      />

      {/* 1. INITIAL ENTRY WELCOME: Role Gate Modal (Student / Faculty ID / Organizer ID / Judge ID) */}
      <RoleAuthModal
        isOpen={isWelcomePromptOpen}
        mode="initial_welcome"
        onConfirm={(role, credentialId) => {
          setActiveRole(role);
          setIsWelcomePromptOpen(false);
          if (role === 'organizer') setIsOrganizerOpen(true);
          if (role === 'judge') setIsJudgeOpen(true);
          if (role === 'faculty') setIsFacultyShareOpen(true);
        }}
      />

      {/* 2. IN-APP ROLE SWITCH: Verification Modal (asks for Organizer, Judge, or Faculty ID) */}
      <RoleAuthModal
        isOpen={Boolean(switchAuthTarget)}
        mode="verify_switch"
        targetRole={switchAuthTarget || 'organizer'}
        onConfirm={(role, credentialId) => {
          setActiveRole(role);
          setSwitchAuthTarget(null);
          if (role === 'organizer') setIsOrganizerOpen(true);
          if (role === 'judge') setIsJudgeOpen(true);
          if (role === 'faculty') setIsFacultyShareOpen(true);
        }}
        onCancel={() => setSwitchAuthTarget(null)}
      />

      {/* Student Mode Submissions & Performance Graph Dashboard */}
      {isStudentDashboardOpen && (
        <StudentDashboardModal
          submissions={submissions}
          onClose={() => setIsStudentDashboardOpen(false)}
          onViewFeedback={(sub) => {
            setIsStudentDashboardOpen(false);
            handleOpenIdeaReview(sub);
          }}
          onSwitchToOrganizer={() => {
            setIsStudentDashboardOpen(false);
            handleRoleChangeRequest('organizer');
          }}
          onRegisterNew={() => {
            setIsStudentDashboardOpen(false);
            setIsRegisterOpen(true);
          }}
        />
      )}

      {/* Organizer Mode: Evaluation Desk (Only submitted projects & selected team list) */}
      {isOrganizerOpen && (
        <OrganizerModal
          submissions={submissions}
          onClose={() => {
            setIsOrganizerOpen(false);
            setActiveRole('student');
          }}
          onUpdateStatus={handleOrganizerUpdateStatus}
        />
      )}

      {/* Judge Mode: Evaluation & Edge AI Portal */}
      {isJudgeOpen && (
        <JudgeModal
          submissions={submissions}
          onClose={() => {
            setIsJudgeOpen(false);
            setActiveRole('student');
          }}
          onTriggerAiAnalysis={async (sub) => {
            return await SupabaseService.runProjectAnalysis(sub);
          }}
          onSubmitEvaluation={handleJudgeEvaluation}
        />
      )}

      {/* Team Registration Modal */}
      {isRegisterOpen && (
        <RegisterModal
          hackathon={selectedHackathon}
          onClose={() => setIsRegisterOpen(false)}
          onSubmit={handleAddSubmission}
        />
      )}

      {/* Faculty Distribution Modal */}
      {isFacultyShareOpen && (
        <FacultyShareModal
          hackathon={selectedHackathon}
          onClose={() => {
            setIsFacultyShareOpen(false);
            setActiveRole('student');
          }}
          onBroadcastSuccess={handleBroadcastSuccess}
        />
      )}

      {/* How It Works Modal */}
      {isHowItWorksOpen && (
        <HowItWorksModal
          onClose={() => setIsHowItWorksOpen(false)}
          onExplore={() => handleNavigate('explore')}
        />
      )}

      {/* Host Hackathon Modal */}
      {isHostOpen && (
        <HostHackathonModal
          onClose={() => setIsHostOpen(false)}
          onSaveHackathon={handleCreateHackathon}
        />
      )}
    </div>
  );
}
