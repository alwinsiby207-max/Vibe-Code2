import { supabase, supabaseUrl, supabaseAnonKey } from './supabase';
import { Hackathon, IdeaSubmission, IdeaFeedback, NotificationItem, Role, UserProfile } from '../types';
import { INITIAL_HACKATHONS, INITIAL_SUBMISSIONS, INITIAL_NOTIFICATIONS } from '../data/mockData';
import { generateStructuredIdeaReview } from '../utils/aiReviewGenerator';

export class SupabaseService {
  /**
   * Fetch all published hackathons from Supabase.
   * Gracefully falls back to INITIAL_HACKATHONS if empty or offline.
   */
  static async getHackathons(): Promise<Hackathon[]> {
    try {
      const { data, error } = await supabase
        .from('hackathons')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch hackathons notice:', error.message);
        return INITIAL_HACKATHONS;
      }

      if (!data || data.length === 0) {
        return INITIAL_HACKATHONS;
      }

      // Map Supabase rows to client Hackathon interface
      const mapped: Hackathon[] = data.map((row) => {
        const fallback = INITIAL_HACKATHONS[0];
        let parsedPrizes = fallback.prizes;
        if (row.prizes) {
          try {
            parsedPrizes = typeof row.prizes === 'string' ? JSON.parse(row.prizes) : row.prizes;
          } catch {
            parsedPrizes = fallback.prizes;
          }
        }

        return {
          id: row.id,
          title: row.title,
          tagline: row.description ? row.description.slice(0, 80) : fallback.tagline,
          organizer: 'Campus Innovation Cell',
          organizerVerified: true,
          category: 'Hackathon',
          categoryTrack: 'AI / INNOVATION',
          status: (row.status as any) || 'Registration Open',
          isCampusChapter: true,
          registrationDeadline: row.registration_deadline
            ? new Date(row.registration_deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : fallback.registrationDeadline,
          eventDates: row.start_date
            ? `${new Date(row.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${row.end_date ? new Date(row.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}`
            : fallback.eventDates,
          teamSize: row.max_team_size ? `1-${row.max_team_size} Members` : '2-4 Members',
          eligibility: 'Open to all enrolled campus batches',
          venueFormat: 'Hybrid (Campus Lab & Remote)',
          location: 'Innovation Hub & Online Hub',
          grandPrize: '₹1,00,000',
          prizePool: '₹2,50,000',
          perks: fallback.perks,
          bannerUrl: row.banner_url || fallback.bannerUrl,
          registeredTeamsCount: 12,
          about: row.description || fallback.about,
          themes: fallback.themes,
          timeline: fallback.timeline,
          prizes: Array.isArray(parsedPrizes) ? parsedPrizes : fallback.prizes,
        };
      });

      return mapped;
    } catch (err) {
      console.warn('Error fetching hackathons from Supabase, using mock:', err);
      return INITIAL_HACKATHONS;
    }
  }

  /**
   * Save a newly created hackathon to Supabase.
   */
  static async createHackathon(hack: Partial<Hackathon>, organizerId?: string): Promise<boolean> {
    try {
      const payload: Record<string, any> = {
        title: hack.title,
        description: hack.about || hack.tagline || 'Campus Hackathon event',
        status: hack.status || 'Registration Open',
        registration_deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        start_date: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString(),
        end_date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
        max_team_size: 4,
        banner_url: hack.bannerUrl || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        prizes: JSON.stringify(hack.prizes || []),
      };

      if (organizerId) {
        payload.organizer_id = organizerId;
      }

      const { error } = await supabase.from('hackathons').insert([payload]);
      if (error) {
        console.warn('Supabase createHackathon error:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Error inserting hackathon into Supabase:', err);
      return false;
    }
  }

  /**
   * Fetch submissions & projects from Supabase.
   */
  static async getSubmissions(): Promise<IdeaSubmission[]> {
    try {
      // Fetch projects with related teams and ai_analysis
      const { data: projects, error } = await supabase
        .from('projects')
        .select(`
          *,
          teams ( id, name ),
          hackathons ( id, title ),
          ai_analysis ( * )
        `)
        .order('created_at', { ascending: false });

      if (error || !projects || projects.length === 0) {
        return INITIAL_SUBMISSIONS;
      }

      return projects.map((p) => {
        let feedback: IdeaFeedback | undefined = undefined;
        if (p.ai_analysis && p.ai_analysis.length > 0) {
          const ai = p.ai_analysis[0];
          feedback = {
            id: ai.id,
            submissionId: p.id,
            ideaTitle: p.title,
            leadName: 'Student Builder',
            teamName: p.teams?.name || 'Project Team',
            hackathonTitle: p.hackathons?.title || 'Campus Hackathon',
            summary: ai.summary || p.solution || '',
            strengths: Array.isArray(ai.strengths) ? ai.strengths : [],
            gaps: [
              { title: 'Data Freshness', desc: 'Ensure continuous live verification of events.' },
              { title: 'Edge Scalability', desc: 'Clarify fallback workflows when servers undergo load spikes.' },
            ],
            innovationAnalysis: typeof ai.innovation_analysis === 'object' && ai.innovation_analysis !== null
              ? ai.innovation_analysis
              : { tier: 'Tier B+ Potential', verdict: 'Strong campus problem-fit with clear user value.' },
            improvements: [
              { step: '01', title: 'Automated Processing', desc: 'Streamline the verification sequence.' },
              { step: '02', title: 'Telemetry & Monitoring', desc: 'Add latency metrics and user activity signals.' },
            ],
            extensions: Array.isArray(ai.extensions) ? ai.extensions : [
              { level: 1, tag: 'LEVEL 1 • IMPROVE', title: 'Telemetry Signals', desc: 'Track key performance indicators.', icon: 'tune', bgClass: 'bg-orange-50 border-orange-200', badgeClass: 'bg-orange-100 text-orange-800' },
              { level: 2, tag: 'LEVEL 2 • EXTEND', title: 'Campus Timetable Sync', desc: 'Sync with campus timetable routines.', icon: 'calendar_month', bgClass: 'bg-blue-50 border-blue-200', badgeClass: 'bg-blue-100 text-blue-800' },
              { level: 3, tag: 'LEVEL 3 • SCALE', title: 'Multi-Department Support', desc: 'Expand to support cross-campus departments.', icon: 'hub', bgClass: 'bg-purple-50 border-purple-200', badgeClass: 'bg-purple-100 text-purple-800' },
              { level: 4, tag: 'LEVEL 4 • FUTURE', title: 'Autonomous Orchestration', desc: 'Predictive analytics and proactive dispatch.', icon: 'rocket_launch', bgClass: 'bg-emerald-50 border-emerald-200', badgeClass: 'bg-emerald-100 text-emerald-800' },
            ],
            nextSteps: [
              { icon: 'draw', text: 'Refine architecture and workflow blueprint' },
              { icon: 'restart_alt', text: 'Prepare for secondary showcase screening' },
              { icon: 'school', text: 'Connect with designated faculty mentor' },
            ],
          };
        }

        return {
          id: p.id,
          hackathonId: p.hackathon_id,
          hackathonTitle: p.hackathons?.title || 'Campus Hackathon',
          teamName: p.teams?.name || 'Vibe Team',
          leadName: 'Student Builder',
          leadEmail: 'student@campus.edu',
          ideaTitle: p.title,
          summary: p.solution ? p.solution.slice(0, 160) : 'Campus innovation project submission',
          problemStatement: p.problem_statement || '',
          solution: p.solution || '',
          targetUsers: 'Campus students and academic faculty',
          techStack: p.tech_stack || 'React, Node, Supabase',
          expectedImpact: 'High academic and campus workflow efficiency',
          status: p.status === 'selected' ? 'selected' : p.status === 'not_selected' ? 'not_selected' : 'submitted',
          submittedAt: p.submitted_at ? new Date(p.submitted_at).toLocaleDateString() : 'Just now',
          feedback,
        };
      });
    } catch (err) {
      console.warn('Error querying Supabase projects, using fallback:', err);
      return INITIAL_SUBMISSIONS;
    }
  }

  /**
   * Create team, project, and registration in Supabase.
   */
  static async createSubmission(
    submission: Omit<IdeaSubmission, 'id' | 'submittedAt'>,
    studentUserId?: string
  ): Promise<IdeaSubmission> {
    const localId = `sub-${Date.now()}`;
    const mappedResult: IdeaSubmission = {
      ...submission,
      id: localId,
      submittedAt: 'Just now',
    };

    try {
      // 1. Create team if hackathon ID exists
      let teamId: string | null = null;
      if (submission.hackathonId) {
        const { data: teamData, error: teamErr } = await supabase
          .from('teams')
          .insert([
            {
              name: submission.teamName,
              hackathon_id: submission.hackathonId,
            },
          ])
          .select()
          .single();

        if (teamData) {
          teamId = teamData.id;

          // 2. Add team member
          if (studentUserId) {
            await supabase.from('team_members').insert([
              {
                team_id: teamId,
                student_id: studentUserId,
                role: 'lead',
              },
            ]);

            // 3. Add registration
            await supabase.from('registrations').insert([
              {
                hackathon_id: submission.hackathonId,
                student_id: studentUserId,
                status: 'registered',
              },
            ]);
          }
        }
      }

      // 4. Create Project
      const { data: projData, error: projErr } = await supabase
        .from('projects')
        .insert([
          {
            hackathon_id: submission.hackathonId,
            team_id: teamId,
            title: submission.ideaTitle,
            status: 'submitted',
            problem_statement: submission.problemStatement,
            solution: submission.solution,
            tech_stack: submission.techStack,
            submitted_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (projData) {
        mappedResult.id = projData.id;
      }
    } catch (err) {
      console.warn('Supabase submission insert caught error (relying on optimistic state):', err);
    }

    return mappedResult;
  }

  /**
   * Run AI analysis via Supabase Edge Function 'analyze-project',
   * with fallback to server API /api/analyze-idea and client rule engine.
   */
  static async runProjectAnalysis(
    targetSub: IdeaSubmission,
    sessionToken?: string
  ): Promise<IdeaFeedback> {
    // 1. Try Supabase Edge Function
    try {
      const headers: Record<string, string> = {
        apikey: supabaseAnonKey,
        'Content-Type': 'application/json',
      };
      if (sessionToken) {
        headers['Authorization'] = `Bearer ${sessionToken}`;
      }

      const efRes = await fetch(`${supabaseUrl}/functions/v1/analyze-project`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          projectId: targetSub.id,
          title: targetSub.ideaTitle,
          problem_statement: targetSub.problemStatement,
          solution: targetSub.solution,
          tech_stack: targetSub.techStack,
          target_users: targetSub.targetUsers,
          expected_impact: targetSub.expectedImpact,
          teamName: targetSub.teamName,
          leadName: targetSub.leadName,
          hackathonTitle: targetSub.hackathonTitle,
        }),
      });

      if (efRes.ok) {
        const efJson = await efRes.json();
        console.log('Supabase Edge Function analyze-project returned:', efJson);

        // Store into ai_analysis table if possible
        try {
          await supabase.from('ai_analysis').insert([
            {
              project_id: targetSub.id,
              summary: efJson.summary || targetSub.solution,
              strengths: efJson.strengths || [],
              innovation_analysis: efJson.innovationAnalysis || { tier: 'Tier B+ Potential', verdict: 'Good problem-fit' },
              extensions: efJson.extensions || [],
              status: 'completed',
            },
          ]);
        } catch {}

        return {
          id: `fb-${Date.now()}`,
          submissionId: targetSub.id,
          ideaTitle: targetSub.ideaTitle,
          leadName: targetSub.leadName,
          teamName: targetSub.teamName,
          hackathonTitle: targetSub.hackathonTitle,
          summary: efJson.summary || targetSub.solution,
          strengths: efJson.strengths || [],
          gaps: efJson.gaps || [
            { title: 'Freshness Validation', desc: 'Clarify telemetry freshness cycles.' },
            { title: 'Edge Scalability', desc: 'Add graceful throttling under peak load.' },
          ],
          innovationAnalysis: efJson.innovationAnalysis || {
            tier: 'Tier B+ Potential',
            verdict: 'Clear problem-fit addressing campus bottlenecks.',
          },
          improvements: efJson.improvements || [
            { step: '01', title: 'Automated Processing', desc: 'Optimize verification sequence.' },
            { step: '02', title: 'Telemetry Signals', desc: 'Add latency metrics and status signals.' },
          ],
          extensions: efJson.extensions || [
            { level: 1, tag: 'LEVEL 1 • IMPROVE', title: 'Telemetry Buffer', desc: 'Buffer dynamic queue requests.', icon: 'tune', bgClass: 'bg-orange-50 border-orange-200', badgeClass: 'bg-orange-100 text-orange-800' },
            { level: 2, tag: 'LEVEL 2 • EXTEND', title: 'Campus Timetable Sync', desc: 'Sync with break intervals.', icon: 'calendar_month', bgClass: 'bg-blue-50 border-blue-200', badgeClass: 'bg-blue-100 text-blue-800' },
            { level: 3, tag: 'LEVEL 3 • SCALE', title: 'Multi-Vendor Extension', desc: 'Extend to stationery & lab kiosks.', icon: 'hub', bgClass: 'bg-purple-50 border-purple-200', badgeClass: 'bg-purple-100 text-purple-800' },
            { level: 4, tag: 'LEVEL 4 • FUTURE', title: 'Predictive Inventory', desc: 'Predictive inventory replenishment.', icon: 'rocket_launch', bgClass: 'bg-emerald-50 border-emerald-200', badgeClass: 'bg-emerald-100 text-emerald-800' },
          ],
          nextSteps: efJson.nextSteps || [
            { icon: 'draw', text: 'Refine workflow blueprint' },
            { icon: 'restart_alt', text: 'Prepare for secondary showcase screening' },
            { icon: 'school', text: 'Connect with campus mentor / faculty lead' },
          ],
          improvedDraft: efJson.improvedDraft,
        };
      }
    } catch (e) {
      console.warn('Edge Function analyze-project notice (falling back):', e);
    }

    // 2. Try Node/Express server backend /api/analyze-idea
    try {
      const srvRes = await fetch('/api/analyze-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ideaTitle: targetSub.ideaTitle,
          problemStatement: targetSub.problemStatement,
          solution: targetSub.solution,
          techStack: targetSub.techStack,
          targetUsers: targetSub.targetUsers,
          expectedImpact: targetSub.expectedImpact,
          hackathonTitle: targetSub.hackathonTitle,
          leadName: targetSub.leadName,
          teamName: targetSub.teamName,
          submissionId: targetSub.id,
        }),
      });

      if (srvRes.ok) {
        return await srvRes.json();
      }
    } catch {}

    // 3. Guaranteed client-side AI Review Generator fallback
    return generateStructuredIdeaReview(targetSub, targetSub.hackathonTitle);
  }

  /**
   * Submit judge evaluation into Supabase judge_evaluations table.
   */
  static async submitEvaluation(
    projectId: string,
    judgeId: string,
    score: number,
    comments: string,
    statusDecision: 'selected' | 'not_selected' = 'selected'
  ): Promise<boolean> {
    try {
      const { error: evalErr } = await supabase.from('judge_evaluations').insert([
        {
          project_id: projectId,
          judge_id: judgeId,
          total_score: score,
          comments,
        },
      ]);

      if (evalErr) {
        console.warn('Supabase judge_evaluations notice:', evalErr.message);
      }

      // Update project status in Supabase
      await supabase
        .from('projects')
        .update({ status: statusDecision, updated_at: new Date().toISOString() })
        .eq('id', projectId);

      return true;
    } catch (err) {
      console.warn('Error saving evaluation to Supabase:', err);
      return false;
    }
  }

  /**
   * Fetch user notifications from Supabase
   */
  static async getNotifications(userId?: string): Promise<NotificationItem[]> {
    try {
      let query = supabase.from('notifications').select('*').order('created_at', { ascending: false });
      if (userId) {
        query = query.eq('user_id', userId);
      }
      const { data, error } = await query;
      if (error || !data || data.length === 0) {
        return INITIAL_NOTIFICATIONS;
      }

      return data.map((n) => ({
        id: n.id,
        title: n.title,
        message: n.message,
        type: (n.type as any) || 'opportunity',
        timeAgo: 'Just now',
        isRead: Boolean(n.read),
      }));
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  }
}
