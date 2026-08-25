import React from 'react';
import { 
  Home, 
  User, 
  Briefcase, 
  HelpCircle, 
  MessageSquare, 
  LogOut, 
  LogIn, 
  Calendar, 
  BarChart3, 
  Compass, 
  FolderGit2, 
  ChevronLeft,
  ChevronRight,
  Award,
  BookOpen,
  Sparkles,
  Search,
  Bookmark,
  Users,
  ShieldCheck,
  Server,
  Bell,
  Settings,
  Target,
  Building2
} from 'lucide-react';
import { AuthUser, UserRole } from '../services/authService';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  user: AuthUser | null;
  onLogout: () => void;
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  user,
  onLogout,
  collapsed,
  setCollapsed
}) => {
  const role: UserRole = user?.role || 'student';

  const isRouteActive = (target: string) => {
    return currentRoute === target || currentRoute.startsWith(target);
  };

  return (
    <aside className={`sidebar-panel ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      {/* Top: Brand + Collapse Toggle */}
      <div className="sidebar-top-row">
        {!collapsed && (
          <div className="logo-container" onClick={() => onNavigate(`/${role}/dashboard`)} style={{ cursor: 'pointer' }}>
            <div className="logo-icon-orange">NB</div>
            <span className="logo-text">NovaBridge</span>
          </div>
        )}
        <button
          className="sidebar-toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu Items by Role */}
      <nav className="sidebar-nav-list">
        {/* STUDENT NAVIGATION */}
        {role === 'student' && (
          <>
            {!collapsed && <div className="menu-section-label">STUDENT DASHBOARD</div>}
            <button onClick={() => onNavigate('/student/dashboard')} className={`menu-item-btn ${currentRoute === '/student/dashboard' ? 'active' : ''}`} title="Dashboard">
              <Home size={18} />
              {!collapsed && <span>Dashboard</span>}
            </button>
            <button onClick={() => onNavigate('/student/profile')} className={`menu-item-btn ${currentRoute === '/student/profile' ? 'active' : ''}`} title="My Profile">
              <User size={18} />
              {!collapsed && <span>My Profile</span>}
            </button>
            <button onClick={() => onNavigate('/student/portfolio')} className={`menu-item-btn ${currentRoute === '/student/portfolio' ? 'active' : ''}`} title="Portfolio">
              <FolderGit2 size={18} />
              {!collapsed && <span>Portfolio</span>}
            </button>
            <button onClick={() => onNavigate('/student/skills')} className={`menu-item-btn ${currentRoute === '/student/skills' ? 'active' : ''}`} title="Skills">
              <Target size={18} />
              {!collapsed && <span>Skills</span>}
            </button>
            <button onClick={() => onNavigate('/student/projects')} className={`menu-item-btn ${currentRoute === '/student/projects' ? 'active' : ''}`} title="Projects">
              <FolderGit2 size={18} />
              {!collapsed && <span>Projects</span>}
            </button>
            <button onClick={() => onNavigate('/student/achievements')} className={`menu-item-btn ${currentRoute === '/student/achievements' ? 'active' : ''}`} title="Achievements">
              <Award size={18} />
              {!collapsed && <span>Achievements</span>}
            </button>

            {!collapsed && <div className="menu-section-label">LEARNING & CAREER</div>}
            <button onClick={() => onNavigate('/student/intelligence')} className={`menu-item-btn ${currentRoute === '/student/intelligence' ? 'active' : ''}`} title="Career Intelligence">
              <Sparkles size={18} />
              {!collapsed && <span>Career Intelligence</span>}
            </button>
            <button onClick={() => onNavigate('/student/courses')} className={`menu-item-btn ${currentRoute === '/student/courses' ? 'active' : ''}`} title="Course Store">
              <BookOpen size={18} />
              {!collapsed && <span>Course Store</span>}
            </button>
            <button onClick={() => onNavigate('/student/mycourses')} className={`menu-item-btn ${currentRoute === '/student/mycourses' ? 'active' : ''}`} title="My Courses">
              <Award size={18} />
              {!collapsed && <span>My Courses</span>}
            </button>
            <button onClick={() => onNavigate('/student/opportunities')} className={`menu-item-btn ${currentRoute === '/student/opportunities' ? 'active' : ''}`} title="Opportunities">
              <Briefcase size={18} />
              {!collapsed && <span>Opportunities</span>}
            </button>
            <button onClick={() => onNavigate('/student/mentors')} className={`menu-item-btn ${currentRoute === '/student/mentors' ? 'active' : ''}`} title="Mentors">
              <Users size={18} />
              {!collapsed && <span>Mentors</span>}
            </button>
            <button onClick={() => onNavigate('/student/applications')} className={`menu-item-btn ${currentRoute === '/student/applications' ? 'active' : ''}`} title="Applications">
              <Calendar size={18} />
              {!collapsed && <span>Applications</span>}
            </button>

            {!collapsed && <div className="menu-section-label">COMMUNICATION</div>}
            <button onClick={() => onNavigate('/student/messages')} className={`menu-item-btn ${currentRoute === '/student/messages' ? 'active' : ''}`} title="Messages">
              <MessageSquare size={18} />
              {!collapsed && <span>Messages</span>}
            </button>
            <button onClick={() => onNavigate('/student/notifications')} className={`menu-item-btn ${currentRoute === '/student/notifications' ? 'active' : ''}`} title="Notifications">
              <Bell size={18} />
              {!collapsed && <span>Notifications</span>}
            </button>
            <button onClick={() => onNavigate('/student/settings')} className={`menu-item-btn ${currentRoute === '/student/settings' ? 'active' : ''}`} title="Settings">
              <Settings size={18} />
              {!collapsed && <span>Settings</span>}
            </button>
          </>
        )}

        {/* RECRUITER NAVIGATION */}
        {role === 'recruiter' && (
          <>
            {!collapsed && <div className="menu-section-label">RECRUITER PORTAL</div>}
            <button onClick={() => onNavigate('/recruiter/dashboard')} className={`menu-item-btn ${currentRoute === '/recruiter/dashboard' ? 'active' : ''}`} title="Dashboard">
              <Home size={18} />
              {!collapsed && <span>Dashboard</span>}
            </button>
            <button onClick={() => onNavigate('/recruiter/talent')} className={`menu-item-btn ${currentRoute === '/recruiter/talent' ? 'active' : ''}`} title="Discover Talent">
              <Search size={18} />
              {!collapsed && <span>Discover Talent</span>}
            </button>
            <button onClick={() => onNavigate('/recruiter/saved')} className={`menu-item-btn ${currentRoute === '/recruiter/saved' ? 'active' : ''}`} title="Saved Candidates">
              <Bookmark size={18} />
              {!collapsed && <span>Saved Candidates</span>}
            </button>
            <button onClick={() => onNavigate('/recruiter/jobs')} className={`menu-item-btn ${currentRoute === '/recruiter/jobs' ? 'active' : ''}`} title="Job Posts">
              <Briefcase size={18} />
              {!collapsed && <span>Job Posts</span>}
            </button>

            {!collapsed && <div className="menu-section-label">PIPELINE</div>}
            <button onClick={() => onNavigate('/recruiter/applications')} className={`menu-item-btn ${currentRoute === '/recruiter/applications' ? 'active' : ''}`} title="Applications">
              <Users size={18} />
              {!collapsed && <span>Applications</span>}
            </button>
            <button onClick={() => onNavigate('/recruiter/challenges')} className={`menu-item-btn ${currentRoute === '/recruiter/challenges' ? 'active' : ''}`} title="Challenges">
              <Award size={18} />
              {!collapsed && <span>Challenges</span>}
            </button>
            <button onClick={() => onNavigate('/recruiter/messages')} className={`menu-item-btn ${currentRoute === '/recruiter/messages' ? 'active' : ''}`} title="Messages">
              <MessageSquare size={18} />
              {!collapsed && <span>Messages</span>}
            </button>

            {!collapsed && <div className="menu-section-label">INSIGHTS</div>}
            <button onClick={() => onNavigate('/recruiter/analytics')} className={`menu-item-btn ${currentRoute === '/recruiter/analytics' ? 'active' : ''}`} title="Analytics">
              <BarChart3 size={18} />
              {!collapsed && <span>Analytics</span>}
            </button>
            <button onClick={() => onNavigate('/recruiter/org')} className={`menu-item-btn ${currentRoute === '/recruiter/org' ? 'active' : ''}`} title="Organization">
              <Building2 size={18} />
              {!collapsed && <span>Organization</span>}
            </button>
            <button onClick={() => onNavigate('/recruiter/settings')} className={`menu-item-btn ${currentRoute === '/recruiter/settings' ? 'active' : ''}`} title="Settings">
              <Settings size={18} />
              {!collapsed && <span>Settings</span>}
            </button>
          </>
        )}

        {/* ADMIN NAVIGATION */}
        {role === 'admin' && (
          <>
            {!collapsed && <div className="menu-section-label">ADMIN OPERATIONS</div>}
            <button onClick={() => onNavigate('/admin/dashboard')} className={`menu-item-btn ${currentRoute === '/admin/dashboard' ? 'active' : ''}`} title="Dashboard">
              <Home size={18} />
              {!collapsed && <span>Dashboard</span>}
            </button>
            <button onClick={() => onNavigate('/admin/users')} className={`menu-item-btn ${currentRoute === '/admin/users' ? 'active' : ''}`} title="Users">
              <Users size={18} />
              {!collapsed && <span>Users</span>}
            </button>
            <button onClick={() => onNavigate('/admin/opportunities')} className={`menu-item-btn ${currentRoute === '/admin/opportunities' ? 'active' : ''}`} title="Opportunities">
              <Briefcase size={18} />
              {!collapsed && <span>Opportunities</span>}
            </button>
            <button onClick={() => onNavigate('/admin/projects')} className={`menu-item-btn ${currentRoute === '/admin/projects' ? 'active' : ''}`} title="Projects">
              <FolderGit2 size={18} />
              {!collapsed && <span>Projects</span>}
            </button>

            {!collapsed && <div className="menu-section-label">VERIFICATION</div>}
            <button onClick={() => onNavigate('/admin/verification')} className={`menu-item-btn ${currentRoute === '/admin/verification' ? 'active' : ''}`} title="Verification">
              <ShieldCheck size={18} />
              {!collapsed && <span>Verification Queue</span>}
            </button>

            {!collapsed && <div className="menu-section-label">SYSTEM</div>}
            <button onClick={() => onNavigate('/admin/reports')} className={`menu-item-btn ${currentRoute === '/admin/reports' ? 'active' : ''}`} title="Reports">
              <Compass size={18} />
              {!collapsed && <span>Reports</span>}
            </button>
            <button onClick={() => onNavigate('/admin/analytics')} className={`menu-item-btn ${currentRoute === '/admin/analytics' ? 'active' : ''}`} title="Analytics">
              <BarChart3 size={18} />
              {!collapsed && <span>Analytics</span>}
            </button>
            <button onClick={() => onNavigate('/admin/settings')} className={`menu-item-btn ${currentRoute === '/admin/settings' ? 'active' : ''}`} title="Settings">
              <Settings size={18} />
              {!collapsed && <span>Settings</span>}
            </button>
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="menu-footer">
        {user ? (
          <>
            {!collapsed && (
              <div className="sidebar-user-badge">
                <img src={user.avatarUrl} alt={user.name} className="sidebar-avatar" />
                <div className="sidebar-user-text">
                  <div className="sidebar-user-name">{user.name}</div>
                  <div className="sidebar-user-role-tag">{role.toUpperCase()}</div>
                </div>
              </div>
            )}
            <button onClick={onLogout} className="menu-item-btn text-danger" title="Log Out">
              <LogOut size={18} />
              {!collapsed && <span>Log Out</span>}
            </button>
          </>
        ) : (
          <button onClick={() => onNavigate('/student/login')} className="menu-item-btn" title="Log In">
            <LogIn size={18} />
            {!collapsed && <span>Log In</span>}
          </button>
        )}
      </div>

      <style>{`
        .sidebar-panel {
          background-color: #FFFFFF;
          border-right: 1px solid var(--slate-200);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          flex-shrink: 0;
        }
        .sidebar-expanded {
          width: 240px;
          padding: 20px;
        }
        .sidebar-collapsed {
          width: 60px;
          padding: 16px 8px;
          align-items: center;
        }
        .sidebar-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          min-height: 32px;
        }
        .sidebar-collapsed .sidebar-top-row {
          justify-content: center;
        }
        .sidebar-toggle-btn {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          border: 1px solid var(--slate-200);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          color: var(--slate-500);
          flex-shrink: 0;
          cursor: pointer;
        }
        .sidebar-toggle-btn:hover {
          background: var(--slate-100);
          color: var(--navy-900);
        }
        .sidebar-nav-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow-y: auto;
        }
        .menu-section-label {
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--slate-400);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 14px;
          margin-bottom: 4px;
          padding-left: 10px;
        }
        .sidebar-collapsed .menu-section-label {
          display: none;
        }
        .menu-item-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-radius: 8px;
          border: none;
          background: transparent;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--slate-600);
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }
        .menu-item-btn:hover {
          background: var(--slate-100);
          color: var(--navy-900);
        }
        .menu-item-btn.active {
          background: #FFF7ED;
          color: var(--codolio-orange);
          font-weight: 800;
        }
        .sidebar-collapsed .menu-item-btn {
          justify-content: center;
          padding: 10px;
        }
        .sidebar-user-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          background-color: var(--slate-50);
          border-radius: 8px;
          margin-bottom: 8px;
          border: 1px solid var(--slate-200);
        }
        .sidebar-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }
        .sidebar-user-text { overflow: hidden; }
        .sidebar-user-name {
          font-weight: 800;
          font-size: 0.8125rem;
          color: var(--navy-900);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sidebar-user-role-tag {
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--codolio-orange);
        }
        .text-danger { color: #EF4444 !important; }
      `}</style>
    </aside>
  );
};
