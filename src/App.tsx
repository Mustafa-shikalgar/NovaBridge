import React, { useState, useEffect } from 'react';
import { 
  UserProfile, 
  CodingHandles, 
  LinkedInStats, 
  CodeChefStats, 
  HackerRankStats, 
  CodeStudioStats,
  Project
} from './types/profile';
import { initialProfileData } from './data/mockProfile';
import { syncAllProfiles } from './services/apiService';
import { 
  AuthSession, 
  AuthUser,
  getStoredSession, 
  saveSession,
  clearSession 
} from './services/authService';

// Auth Pages
import { StudentLoginPage } from './pages/auth/StudentLoginPage';
import { RecruiterLoginPage } from './pages/auth/RecruiterLoginPage';
import { AdminLoginPage } from './pages/auth/AdminLoginPage';

// Role Dashboards
import { StudentDashboard } from './pages/student/StudentDashboard';
import { RecruiterDashboard } from './pages/recruiter/RecruiterDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Existing components
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LeftProfileCard } from './components/LeftProfileCard';
import { DashboardStats } from './components/DashboardStats';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TimelineSection } from './components/TimelineSection';
import { CoursesSection } from './components/CoursesSection';
import { CertificatesPage } from './components/CertificatesPage';
import { CourseStorePage } from './components/CourseStorePage';
import { MyCourses } from './components/MyCourses';
import { ResumeModal } from './components/ResumeModal';
import { EditProfileModal } from './components/EditProfileModal';
import { UpdateLinksModal } from './components/UpdateLinksModal';
import { RecruiterView } from './components/RecruiterView';
import { ContestsPage } from './components/ContestsPage';
import { RecommendedLearningSection } from './components/RecommendedLearningSection';
import { CheckCircle2, Building2 } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Route type covers ALL portal routes
// ─────────────────────────────────────────────────────────────
type AppRoute =
  // Student auth
  | '/student/login'
  | '/student/signup'
  // Recruiter auth  
  | '/recruiter/login'
  | '/recruiter/signup'
  // Admin auth
  | '/admin/login'
  // Student portal
  | '/student/dashboard'
  | '/student/profile'
  | '/student/portfolio'
  | '/student/courses'
  | '/student/mycourses'
  | '/student/certificates'
  | '/student/opportunities'
  | '/student/applications'
  | '/student/messages'
  | '/student/notifications'
  | '/student/settings'
  | '/student/skills'
  | '/student/projects'
  | '/student/achievements'
  | '/student/mentors'
  | '/student/intelligence'
  // Recruiter portal
  | '/recruiter/dashboard'
  | '/recruiter/talent'
  | '/recruiter/saved'
  | '/recruiter/jobs'
  | '/recruiter/applications'
  | '/recruiter/challenges'
  | '/recruiter/messages'
  | '/recruiter/analytics'
  | '/recruiter/org'
  | '/recruiter/settings'
  // Admin portal
  | '/admin/dashboard'
  | '/admin/users'
  | '/admin/opportunities'
  | '/admin/projects'
  | '/admin/verification'
  | '/admin/reports'
  | '/admin/analytics'
  | '/admin/settings';

// ─────────────────────────────────────────────────────────────
// Protected Route Guard
// ─────────────────────────────────────────────────────────────
function getDefaultRoute(role: string): AppRoute {
  if (role === 'recruiter') return '/recruiter/dashboard';
  if (role === 'admin') return '/admin/dashboard';
  return '/student/dashboard';
}

function guardRoute(route: AppRoute, session: AuthSession): AppRoute {
  if (!session.isAuthenticated || !session.user) {
    // Redirect to appropriate login
    if (route.startsWith('/recruiter/')) return '/recruiter/login';
    if (route.startsWith('/admin/')) return '/admin/login';
    return '/student/login';
  }

  const role = session.user.role;

  // Student tries to access recruiter/admin routes
  if (route.startsWith('/recruiter/') && !route.includes('login') && role !== 'recruiter') {
    return getDefaultRoute(role);
  }
  if (route.startsWith('/admin/') && !route.includes('login') && role !== 'admin') {
    return getDefaultRoute(role);
  }
  // Recruiter tries student/admin routes
  if (route.startsWith('/student/') && !route.includes('login') && role !== 'student') {
    return getDefaultRoute(role);
  }
  // Admin tries student/recruiter routes
  if (route.startsWith('/student/') && !route.includes('login') && role === 'admin') {
    return '/admin/dashboard';
  }

  return route;
}

export function App() {
  // ─── Auth Session (from localStorage) ───────────────────────
  const [authSession, setAuthSession] = useState<AuthSession>(getStoredSession);

  // ─── Route ──────────────────────────────────────────────────
  const defaultRoute: AppRoute = authSession.isAuthenticated && authSession.user
    ? getDefaultRoute(authSession.user.role)
    : '/student/login';

  const [currentRoute, setCurrentRoute] = useState<AppRoute>(defaultRoute);

  // ─── Profile ────────────────────────────────────────────────
  const [profile, setProfile] = useState<UserProfile>(initialProfileData);
  const [publicProfileEnabled, setPublicProfileEnabled] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUpdateLinksOpen, setIsUpdateLinksOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isSyncingAPIs, setIsSyncingAPIs] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // ─── Navigation (guarded) ───────────────────────────────────
  const navigate = (route: string) => {
    const safeRoute = guardRoute(route as AppRoute, authSession);
    setCurrentRoute(safeRoute);
  };

  // ─── Auth Handlers ──────────────────────────────────────────
  const handleLoginSuccess = (session: AuthSession) => {
    setAuthSession(session);
    saveSession(session);
    showToast(`Welcome back, ${session.user?.name}!`);
  };

  const handleLogout = () => {
    clearSession();
    const role = authSession.user?.role || 'student';
    setAuthSession({ isAuthenticated: false, user: null, token: null });
    const loginRoute: AppRoute = role === 'recruiter' 
      ? '/recruiter/login' 
      : role === 'admin' 
      ? '/admin/login' 
      : '/student/login';
    setCurrentRoute(loginRoute);
    showToast('You have been signed out successfully.');
  };

  // ─── Sync APIs ──────────────────────────────────────────────
  const handleSyncAPIs = async (updatedHandles?: CodingHandles) => {
    setIsSyncingAPIs(true);
    const targetHandles = updatedHandles || profile.handles;
    try {
      const synced = await syncAllProfiles(targetHandles, {
        gh: profile.githubStats,
        cf: profile.codeforcesStats,
        lc: profile.leetcodeStats,
        cc: profile.codeChefStats,
        hr: profile.hackerRankStats,
        cs: profile.codeStudioStats,
        li: profile.linkedInStats
      });
      setProfile(prev => ({
        ...prev,
        handles: targetHandles,
        githubStats: synced.gh,
        codeforcesStats: synced.cf,
        leetcodeStats: synced.lc
      }));
      showToast('Live coding profiles synced successfully!');
    } catch (err) {
      console.error(err);
      showToast('Synced with cached fallbacks');
    } finally {
      setIsSyncingAPIs(false);
    }
  };

  const handleSaveHandles = (
    newHandles: CodingHandles,
    newLinkedIn: LinkedInStats,
    newCodeChef: CodeChefStats,
    newHackerRank: HackerRankStats,
    newCodeStudio: CodeStudioStats
  ) => {
    setProfile(prev => ({
      ...prev,
      handles: newHandles,
      linkedInStats: newLinkedIn,
      codeChefStats: newCodeChef,
      hackerRankStats: newHackerRank,
      codeStudioStats: newCodeStudio
    }));
    showToast('Coding profiles updated! Re-syncing stats...');
    handleSyncAPIs(newHandles);
  };

  const handleAddProject = () => {
    const newProj: Project = {
      id: `p_${Date.now()}`,
      title: 'New Developer App',
      subtitle: 'Coding platform or web utility',
      description: 'Built a responsive coding compiler or stateful micro-frontend application.',
      role: 'Full-Stack Creator',
      outcomes: ['Optimized search queries by 45%'],
      techStack: ['TypeScript', 'C++', 'CSS'],
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      featured: true
    };
    setProfile(prev => ({ ...prev, projects: [newProj, ...prev.projects] }));
    showToast('New project card added!');
  };

  // ─── AUTH PAGES (no sidebar/header) ─────────────────────────
  const isAuthPage = 
    currentRoute === '/student/login' ||
    currentRoute === '/student/signup' ||
    currentRoute === '/recruiter/login' ||
    currentRoute === '/recruiter/signup' ||
    currentRoute === '/admin/login';

  if (isAuthPage) {
    return (
      <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
        {/* Minimal header for auth pages */}
        <div className="auth-top-nav">
          <div className="logo-container" style={{ cursor: 'pointer' }}>
            <div className="logo-icon-orange">NB</div>
            <span className="logo-text">NovaBridge</span>
          </div>
          <div className="auth-portal-links">
            <button onClick={() => setCurrentRoute('/student/login')} className={`portal-link-btn ${currentRoute === '/student/login' ? 'active' : ''}`}>Student</button>
            <button onClick={() => setCurrentRoute('/recruiter/login')} className={`portal-link-btn ${currentRoute === '/recruiter/login' ? 'active' : ''}`}>Recruiter</button>
            <button onClick={() => setCurrentRoute('/admin/login')} className={`portal-link-btn ${currentRoute === '/admin/login' ? 'active' : ''}`}>Admin</button>
          </div>
        </div>

        {currentRoute === '/student/login' && (
          <StudentLoginPage onLoginSuccess={s => { handleLoginSuccess(s); navigate('/student/dashboard'); }} onNavigate={r => navigate(r)} />
        )}
        {currentRoute === '/recruiter/login' && (
          <RecruiterLoginPage onLoginSuccess={s => { handleLoginSuccess(s); navigate('/recruiter/dashboard'); }} onNavigate={r => navigate(r)} />
        )}
        {currentRoute === '/admin/login' && (
          <AdminLoginPage onLoginSuccess={s => { handleLoginSuccess(s); navigate('/admin/dashboard'); }} onNavigate={r => navigate(r)} />
        )}

        <style>{`
          .auth-top-nav {
            height: 60px;
            background: #FFFFFF;
            border-bottom: 1px solid var(--slate-200);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 32px;
            position: sticky;
            top: 0;
            z-index: 100;
          }
          .auth-portal-links {
            display: flex;
            gap: 4px;
          }
          .portal-link-btn {
            padding: 6px 16px;
            border-radius: 8px;
            border: 1px solid var(--slate-200);
            background: var(--slate-50);
            font-size: 0.82rem;
            font-weight: 700;
            color: var(--slate-600);
            cursor: pointer;
          }
          .portal-link-btn.active {
            background: var(--codolio-orange);
            color: #FFFFFF;
            border-color: var(--codolio-orange);
          }
        `}</style>
      </div>
    );
  }

  // ─── MAIN APP LAYOUT ────────────────────────────────────────
  const user = authSession.user;

  return (
    <div className="app-layout" style={{ gridTemplateColumns: sidebarCollapsed ? '60px 1fr' : '240px 1fr' }}>
      {/* Toast */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle2 size={16} style={{ color: '#10B981' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Role-Based Sidebar */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={navigate}
        user={user}
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main View */}
      <div className="main-view-panel">
        {/* Global Top Header */}
        <Header
          currentPage={currentRoute.split('/')[2] as any || 'dashboard'}
          setCurrentPage={(page: any) => {
            const role = user?.role || 'student';
            navigate(`/${role}/${page}`);
          }}
          authSession={{ isAuthenticated: authSession.isAuthenticated, user: user ? { name: user.name, email: user.email, avatarUrl: user.avatarUrl, provider: 'google' } : null }}
          onOpenEdit={() => setIsEditOpen(true)}
          onOpenUpdateLinks={() => setIsUpdateLinksOpen(true)}
          onSyncAPIs={() => handleSyncAPIs()}
          isSyncing={isSyncingAPIs}
          onLogout={handleLogout}
        />

        {/* ── STUDENT PORTAL ROUTES ── */}
        {user?.role === 'student' && (
          <>
            {(currentRoute === '/student/dashboard' || currentRoute === '/student/profile' || currentRoute === '/student/portfolio') && (
              <StudentDashboard
                profile={profile}
                user={user}
                onOpenUpdateLinks={() => setIsUpdateLinksOpen(true)}
                onSyncAPIs={handleSyncAPIs}
                isSyncing={isSyncingAPIs}
                onAddProject={handleAddProject}
                onLogout={handleLogout}
                onNavigate={navigate}
                currentRoute={currentRoute}
              />
            )}

            {currentRoute === '/student/courses' && (
              <div>
                <CourseStorePage user={user} />
              </div>
            )}

            {currentRoute === '/student/mycourses' && (
              <MyCourses onNavigateToCourseStore={() => navigate('/student/courses')} />
            )}

            {currentRoute === '/student/certificates' && (
              <CertificatesPage
                certifications={profile.certifications}
                achievements={profile.achievements}
                publications={profile.publications}
                badges={profile.badges}
              />
            )}

            {currentRoute === '/student/opportunities' && (
              <div style={{ padding: '24px' }}>
                <StudentDashboard
                  profile={profile}
                  user={user}
                  onOpenUpdateLinks={() => setIsUpdateLinksOpen(true)}
                  onSyncAPIs={handleSyncAPIs}
                  isSyncing={isSyncingAPIs}
                  onAddProject={handleAddProject}
                  onLogout={handleLogout}
                  onNavigate={navigate}
                  currentRoute={currentRoute}
                />
              </div>
            )}

            {/* Contests, Settings, Messages pages - fallback to dashboard */}
            {(currentRoute === '/student/messages' ||
              currentRoute === '/student/notifications' ||
              currentRoute === '/student/settings' ||
              currentRoute === '/student/skills' ||
              currentRoute === '/student/projects' ||
              currentRoute === '/student/achievements' ||
              currentRoute === '/student/mentors' ||
              currentRoute === '/student/intelligence' ||
              currentRoute === '/student/applications') && (
              <div style={{ padding: '24px' }}>
                <div className="placeholder-page-card color-card color-card-navy">
                  <div className="color-card-ribbon"></div>
                  <div className="color-card-inner">
                    <h2 className="placeholder-page-title">{currentRoute.split('/').pop()?.replace(/-/g, ' ').toUpperCase()}</h2>
                    <p className="placeholder-page-sub">This section is coming soon. Return to your dashboard to manage your career journey.</p>
                    <button onClick={() => navigate('/student/dashboard')} className="btn-back-dash">← Back to Dashboard</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── RECRUITER PORTAL ROUTES ── */}
        {user?.role === 'recruiter' && (
          <>
            {(currentRoute === '/recruiter/dashboard' || currentRoute === '/recruiter/talent' || currentRoute === '/recruiter/applications' || currentRoute === '/recruiter/saved') && (
              <RecruiterDashboard
                profile={profile}
                user={user}
                onLogout={handleLogout}
                onNavigate={navigate}
              />
            )}

            {(currentRoute === '/recruiter/jobs' ||
              currentRoute === '/recruiter/challenges' ||
              currentRoute === '/recruiter/messages' ||
              currentRoute === '/recruiter/analytics' ||
              currentRoute === '/recruiter/org' ||
              currentRoute === '/recruiter/settings') && (
              <div style={{ padding: '24px' }}>
                <div className="placeholder-page-card color-card color-card-royal">
                  <div className="color-card-ribbon"></div>
                  <div className="color-card-inner">
                    <h2 className="placeholder-page-title">{currentRoute.split('/').pop()?.replace(/-/g, ' ').toUpperCase()}</h2>
                    <p className="placeholder-page-sub">This recruiter module is coming soon. Return to your talent dashboard.</p>
                    <button onClick={() => navigate('/recruiter/dashboard')} className="btn-back-dash btn-back-blue">← Back to Dashboard</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── ADMIN PORTAL ROUTES ── */}
        {user?.role === 'admin' && (
          <>
            {(currentRoute === '/admin/dashboard' || currentRoute === '/admin/users' || currentRoute === '/admin/verification') && (
              <AdminDashboard
                profile={profile}
                user={user}
                onLogout={handleLogout}
                onNavigate={navigate}
              />
            )}

            {(currentRoute === '/admin/opportunities' ||
              currentRoute === '/admin/projects' ||
              currentRoute === '/admin/reports' ||
              currentRoute === '/admin/analytics' ||
              currentRoute === '/admin/settings') && (
              <div style={{ padding: '24px' }}>
                <div className="placeholder-page-card color-card color-card-emerald">
                  <div className="color-card-ribbon"></div>
                  <div className="color-card-inner">
                    <h2 className="placeholder-page-title">ADMIN: {currentRoute.split('/').pop()?.replace(/-/g, ' ').toUpperCase()}</h2>
                    <p className="placeholder-page-sub">This admin module is coming soon. Return to the admin operations console.</p>
                    <button onClick={() => navigate('/admin/dashboard')} className="btn-back-dash btn-back-emerald">← Back to Admin Console</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <UpdateLinksModal profile={profile} isOpen={isUpdateLinksOpen} onClose={() => setIsUpdateLinksOpen(false)} onSave={handleSaveHandles} />
      <EditProfileModal profile={profile} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} onSave={updated => setProfile(updated)} />
      <ResumeModal profile={profile} isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      <style>{`
        .toast-notification {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 9999;
          background: #FFFFFF;
          border: 1px solid #A7F3D0;
          border-left: 4px solid #10B981;
          border-radius: 10px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #065F46;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
          animation: slideIn 0.3s ease;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .placeholder-page-card {
          border-radius: 16px;
          border: 1px solid var(--slate-200);
          overflow: hidden;
        }
        .placeholder-page-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--navy-900);
          margin-bottom: 8px;
        }
        .placeholder-page-sub {
          font-size: 0.88rem;
          color: var(--slate-500);
          margin-bottom: 16px;
        }
        .btn-back-dash {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: 10px;
          background: var(--codolio-orange);
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }
        .btn-back-blue { background: #2563EB; }
        .btn-back-emerald { background: #059669; }
      `}</style>
    </div>
  );
}
