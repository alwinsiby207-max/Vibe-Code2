-- ==============================================================================
-- HackBridge Supabase Demo Seed & Setup Script
-- Project URL: https://fflqsgztcbklxjxafgii.supabase.co
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- ==============================================================================

-- 1. Create or ensure demo auth users
-- (Pass: 'Password123!' encrypted with standard Supabase blowfish crypt)
DO $$
DECLARE
  v_student_id UUID := '11111111-1111-1111-1111-111111111111';
  v_organizer_id UUID := '22222222-2222-2222-2222-222222222222';
  v_judge_id UUID := '33333333-3333-3333-3333-333333333333';
  v_faculty_id UUID := '44444444-4444-4444-4444-444444444444';
  
  v_hackathon_id UUID := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  v_team_id UUID := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
  v_project_id UUID := 'cccccccc-cccc-cccc-cccc-cccccccccccc';
BEGIN
  -- Insert Auth users if not existing
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  ) VALUES
  (
    v_student_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'student@campus.edu', crypt('Password123!', gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}', '{"name":"Alex Rivera (Student)","role":"student"}', now(), now()
  ),
  (
    v_organizer_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'organizer@campus.edu', crypt('Password123!', gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}', '{"name":"Prof. Sarah Jenkins (Organizer)","role":"organizer"}', now(), now()
  ),
  (
    v_judge_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'judge@campus.edu', crypt('Password123!', gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}', '{"name":"Dr. Maya Sen (Judge)","role":"judge"}', now(), now()
  ),
  (
    v_faculty_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'faculty@campus.edu', crypt('Password123!', gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}', '{"name":"Dean Kumar (Faculty Guide)","role":"faculty"}', now(), now()
  )
  ON CONFLICT (id) DO NOTHING;

  -- 2. Upsert Profiles with proper assigned roles
  INSERT INTO public.profiles (id, name, email, role, avatar_url, updated_at) VALUES
    (v_student_id, 'Alex Rivera', 'student@campus.edu', 'student', 'https://api.dicebear.com/7.x/bottts/svg?seed=Alex', now()),
    (v_organizer_id, 'Prof. Sarah Jenkins', 'organizer@campus.edu', 'organizer', 'https://api.dicebear.com/7.x/bottts/svg?seed=Sarah', now()),
    (v_judge_id, 'Dr. Maya Sen', 'judge@campus.edu', 'judge', 'https://api.dicebear.com/7.x/bottts/svg?seed=Maya', now()),
    (v_faculty_id, 'Dean Kumar', 'faculty@campus.edu', 'faculty', 'https://api.dicebear.com/7.x/bottts/svg?seed=Dean', now())
  ON CONFLICT (id) DO UPDATE SET
    role = EXCLUDED.role,
    name = EXCLUDED.name,
    updated_at = now();

  -- 3. Demo Hackathon
  INSERT INTO public.hackathons (
    id, title, description, status, registration_deadline, start_date, end_date,
    max_team_size, banner_url, organizer_id, prizes
  ) VALUES (
    v_hackathon_id,
    'HackForge 2026: Campus AI Challenge',
    'Build campus solutions leveraging machine intelligence, automation, and distributed systems. 36-hour collegiate innovation sprint.',
    'Registration Open',
    (now() + interval '14 days'),
    (now() + interval '16 days'),
    (now() + interval '18 days'),
    4,
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    v_organizer_id,
    '[{"place":1,"rankLabel":"1st Place","amount":"₹1,00,000","benefits":"Direct incubation fast-track + cloud credits"},{"place":2,"rankLabel":"2nd Place","amount":"₹50,000","benefits":"Mentorship stipend + hardware prototyping pack"}]'
  ) ON CONFLICT (id) DO NOTHING;

  -- 4. Judging Criteria
  INSERT INTO public.judging_criteria (hackathon_id, name, description, weight) VALUES
    (v_hackathon_id, 'Innovation & Uniqueness', 'Originality of the conceptual approach and differentiation', 30),
    (v_hackathon_id, 'Technical Execution', 'Code quality, system architecture, and tech stack choices', 30),
    (v_hackathon_id, 'Campus Problem-Fit', 'Practicality and direct value for university students and faculty', 25),
    (v_hackathon_id, 'Impact & Scalability', 'Potential reach across multiple departments and future scaling', 15)
  ON CONFLICT DO NOTHING;

  -- 5. Demo Team
  INSERT INTO public.teams (id, hackathon_id, name) VALUES
    (v_team_id, v_hackathon_id, 'Team Nova')
  ON CONFLICT (id) DO NOTHING;

  -- 6. Team Member
  INSERT INTO public.team_members (team_id, student_id, role) VALUES
    (v_team_id, v_student_id, 'lead')
  ON CONFLICT DO NOTHING;

  -- 7. Registration
  INSERT INTO public.registrations (hackathon_id, student_id, status) VALUES
    (v_hackathon_id, v_student_id, 'registered')
  ON CONFLICT DO NOTHING;

  -- 8. Project Submission
  INSERT INTO public.projects (
    id, hackathon_id, team_id, title, status, problem_statement,
    solution, tech_stack, github_url, demo_url, submitted_at
  ) VALUES (
    v_project_id,
    v_hackathon_id,
    v_team_id,
    'Smart Campus Cafeteria Pacing Engine',
    'submitted',
    'Massive order queues during 15-minute lecture breaks cause 200+ students to crowd cafeteria counters, missing meals and classes.',
    'A dynamic pacing queue that throttles order release according to kitchen preparation timers and syncs with lecture break timetables.',
    'React, Supabase, Node.js, WebSockets',
    'https://github.com/campus-builders/smart-canteen',
    'https://smart-canteen-demo.vercel.app',
    now()
  ) ON CONFLICT (id) DO NOTHING;

  -- 9. AI Analysis
  INSERT INTO public.ai_analysis (
    project_id, summary, strengths, innovation_analysis, extensions, status
  ) VALUES (
    v_project_id,
    'Dynamic cafeteria queue scheduling engine synchronizing kitchen throughput with student lecture intervals.',
    '[{"title":"High Campus Problem-Fit","desc":"Addresses recurring cafeteria rush friction."},{"title":"Intuitive User Journey","desc":"Zero-onboarding tap-to-token design."},{"title":"Clear Stakeholder Roles","desc":"Addresses both kitchen staff pacing and student scheduling."}]',
    '{"tier":"Tier A Potential","verdict":"Timetable synchronization is the true unique differentiator."}',
    '[{"level":1,"tag":"LEVEL 1 • IMPROVE","title":"Kitchen Prep Pacing","desc":"Dynamic counter tap confirmations.","icon":"tune","bgClass":"bg-orange-50 border-orange-200","badgeClass":"bg-orange-100 text-orange-800"},{"level":2,"tag":"LEVEL 2 • EXTEND","title":"Lecture Sync","desc":"Sync pickup windows with academic breaks.","icon":"calendar_month","bgClass":"bg-blue-50 border-blue-200","badgeClass":"bg-blue-100 text-blue-800"},{"level":3,"tag":"LEVEL 3 • SCALE","title":"Multi-Vendor Hub","desc":"Extend to campus print labs and stationery.","icon":"hub","bgClass":"bg-purple-50 border-purple-200","badgeClass":"bg-purple-100 text-purple-800"},{"level":4,"tag":"LEVEL 4 • FUTURE","title":"Predictive Restock","desc":"Proactive inventory replenishment forecasts.","icon":"rocket_launch","bgClass":"bg-emerald-50 border-emerald-200","badgeClass":"bg-emerald-100 text-emerald-800"}]',
    'completed'
  ) ON CONFLICT DO NOTHING;

  -- 10. Judge Evaluation
  INSERT INTO public.judge_evaluations (
    project_id, judge_id, total_score, comments
  ) VALUES (
    v_project_id,
    v_judge_id,
    88,
    'Exceptional problem-fit and well-defined architecture. Recommended implementation of timetable webhook integration for v2 sprint.'
  ) ON CONFLICT DO NOTHING;

  -- 11. Initial Notifications
  INSERT INTO public.notifications (user_id, title, message, type, read) VALUES
    (v_student_id, 'Application Queued', 'Your project Smart Campus Cafeteria Pacing Engine was submitted for screening.', 'selection', false),
    (v_student_id, 'AI Review Ready', 'Initial architectural analysis generated for your project submission.', 'feedback', false),
    (v_organizer_id, 'New Submission Received', 'Team Nova submitted Smart Campus Cafeteria Pacing Engine.', 'opportunity', false)
  ON CONFLICT DO NOTHING;

END $$;
