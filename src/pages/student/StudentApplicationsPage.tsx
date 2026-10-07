import React, { useState } from 'react';
import { UserProfile } from '../../types/profile';
import { AuthUser } from '../../services/authService';
import { 
  Briefcase, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Building2, 
  MapPin, 
  ArrowRight, 
  ExternalLink, 
  Search, 
  Filter, 
  X,
  MessageSquare,
  ChevronRight,
  Sparkles,
  FileText
} from 'lucide-react';

interface StudentApplicationsPageProps {
  profile: UserProfile;
  user: AuthUser;
  onNavigate: (route: string) => void;
}

export interface StudentApplicationItem {
  id: string;
  role: string;
  company: string;
  companyBg: string;
  location: string;
  appliedDate: string;
  status: 'In Review' | 'OA Pending' | 'Shortlisted' | 'Interview' | 'Offer Extended';
  nextAction: string;
  nextDate: string;
  salary: string;
  matchScore: number;
  timeline: {
    stage: string;
    date: string;
    completed: boolean;
    current: boolean;
  }[];
}

const DEMO_APPLICATIONS: StudentApplicationItem[] = [
  {
    id: 'app_1',
    role: 'Software Engineer - Distributed Systems',
    company: 'Uber Infrastructure',
    companyBg: '#0F172A',
    location: 'Bengaluru / Remote',
    appliedDate: 'Aug 14, 2026',
    status: 'Interview',
    nextAction: 'Technical Architecture Round with Devon Vance',
    nextDate: 'Tomorrow at 6:30 PM',
    salary: '₹32 - 42 LPA',
    matchScore: 94,
    timeline: [
      { stage: 'Application Submitted via NovaBridge', date: 'Aug 14, 2026', completed: true, current: false },
      { stage: 'Portfolio & Codeforces Proof Screened (Score: 94%)', date: 'Aug 16, 2026', completed: true, current: false },
      { stage: 'Distributed Systems Online Assessment (Passed)', date: 'Aug 19, 2026', completed: true, current: false },
      { stage: 'Live Technical Architecture Screening', date: 'Aug 26, 2026', completed: false, current: true },
      { stage: 'Hiring Committee & Compensation Decision', date: 'Sep 02, 2026', completed: false, current: false }
    ]
  },
  {
    id: 'app_2',
    role: 'Backend Engineering Specialist',
    company: 'Google Cloud Platform',
    companyBg: '#2563EB',
    location: 'Hyderabad, India',
    appliedDate: 'Aug 16, 2026',
    status: 'Shortlisted',
    nextAction: 'Online Coding Assessment Submission',
    nextDate: 'Deadline: Aug 28, 2026',
    salary: '₹35 - 45 LPA',
    matchScore: 88,
    timeline: [
      { stage: 'Application Submitted', date: 'Aug 16, 2026', completed: true, current: false },
      { stage: 'Recruiter Portfolio Review', date: 'Aug 20, 2026', completed: true, current: false },
      { stage: 'GCP Coding Assessment (90 mins)', date: 'Pending', completed: false, current: true },
      { stage: 'Technical Problem Solving Rounds (x3)', date: 'Upcoming', completed: false, current: false },
      { stage: 'Final Committee Review', date: 'Upcoming', completed: false, current: false }
    ]
  },
  {
    id: 'app_3',
    role: 'Full Stack Product Engineer',
    company: 'Stripe Global',
    companyBg: '#6366F1',
    location: 'Remote',
    appliedDate: 'Aug 18, 2026',
    status: 'In Review',
    nextAction: 'Hiring Manager Resume Evaluation',
    nextDate: 'Estimated: 2 business days',
    salary: '₹38 - 50 LPA',
    matchScore: 85,
    timeline: [
      { stage: 'Application Submitted via NovaBridge Card', date: 'Aug 18, 2026', completed: true, current: true },
      { stage: 'Engineering Hiring Manager Review', date: 'Pending', completed: false, current: false },
      { stage: 'Take-Home Stripe API Challenge', date: 'Upcoming', completed: false, current: false },
      { stage: 'Technical Interview Loop', date: 'Upcoming', completed: false, current: false }
    ]
  },
  {
    id: 'app_4',
    role: 'Cloud Native Systems Fellow',
    company: 'Linux Foundation / CNCF',
    companyBg: '#059669',
    location: 'Global Remote',
    appliedDate: 'Aug 05, 2026',
    status: 'Offer Extended',
    nextAction: 'Offer Acceptance & Onboarding Paperwork',
    nextDate: 'Decide by: Aug 31, 2026',
    salary: '₹24 LPA Stipend',
    matchScore: 96,
    timeline: [
      { stage: 'Open Source Mentorship Application', date: 'Aug 05, 2026', completed: true, current: false },
      { stage: 'Kubernetes Maintainer Code Review', date: 'Aug 10, 2026', completed: true, current: false },
      { stage: 'Architecture Design Interview', date: 'Aug 15, 2026', completed: true, current: false },
      { stage: 'Fellowship Selection & Formal Offer Extended 🎉', date: 'Aug 22, 2026', completed: true, current: true }
    ]
  }
];

export const StudentApplicationsPage: React.FC<StudentApplicationsPageProps> = ({
  profile,
  user,
  onNavigate
}) => {
  const [applications, setApplications] = useState<StudentApplicationItem[]>(DEMO_APPLICATIONS);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<StudentApplicationItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleWithdraw = (appId: string, role: string) => {
    if (window.confirm(`Are you sure you want to withdraw your application for "${role}"?`)) {
      setApplications(prev => prev.filter(a => a.id !== appId));
      if (selectedApp?.id === appId) setSelectedApp(null);
      showToast(`Application for ${role} withdrawn.`);
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesFilter = statusFilter === 'All' || app.status === statusFilter;
    const matchesSearch = app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="student-page-container">
      {/* Toast */}
      {toastMsg && (
        <div className="toast-notification-student">
          <CheckCircle2 size={16} style={{ color: '#10B981' }} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="color-card color-card-navy">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner flex-between-header">
          <div>
            <div className="tag-pill-navy">
              <Briefcase size={14} style={{ color: '#2563EB' }} />
              <span>Career Pipeline & Applications</span>
            </div>
            <h1 className="page-main-heading">My Applications & Status Tracker</h1>
            <p className="page-sub-heading">Track your active job applications, live interview schedules, online assessments, and formal offers in real-time.</p>
          </div>

          <div className="header-action-btn-row">
            <button onClick={() => onNavigate('/student/opportunities')} className="btn-explore-more">
              Explore More Opportunities -&gt;
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pipeline Metric Cards */}
      <div className="metrics-pipeline-grid">
        <div className="metric-box-card border-navy">
          <div className="metric-header">
            <span className="metric-title">Total Active</span>
            <Briefcase size={16} className="text-navy" />
          </div>
          <div className="metric-value-huge text-navy">{applications.length}</div>
          <div className="metric-sub-text">Across tech partners</div>
        </div>

        <div className="metric-box-card border-royal">
          <div className="metric-header">
            <span className="metric-title">Interviews Scheduled</span>
            <Calendar size={16} className="text-royal" />
          </div>
          <div className="metric-value-huge text-royal">
            {applications.filter(a => a.status === 'Interview').length}
          </div>
          <div className="metric-sub-text">Next: Tomorrow 6:30 PM</div>
        </div>

        <div className="metric-box-card border-amber">
          <div className="metric-header">
            <span className="metric-title">In Review / Shortlisted</span>
            <Clock size={16} className="text-amber" />
          </div>
          <div className="metric-value-huge text-amber">
            {applications.filter(a => a.status === 'In Review' || a.status === 'Shortlisted').length}
          </div>
          <div className="metric-sub-text">Under recruiter eval</div>
        </div>

        <div className="metric-box-card border-emerald">
          <div className="metric-header">
            <span className="metric-title">Offers Extended</span>
            <Sparkles size={16} className="text-emerald" />
          </div>
          <div className="metric-value-huge text-emerald">
            {applications.filter(a => a.status === 'Offer Extended').length}
          </div>
          <div className="metric-sub-text">🎉 1 Formal Offer Ready</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="search-filter-controls-row">
        <div className="search-input-wrap">
          <Search size={16} className="search-icon-pos" />
          <input 
            type="text" 
            placeholder="Search applications by role, company, or location..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
            className="app-search-input" 
          />
        </div>

        <div className="status-filter-pills">
          {['All', 'Interview', 'Shortlisted', 'In Review', 'Offer Extended'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`status-pill-btn ${statusFilter === st ? 'active' : ''}`}
            >
              {st} {st === 'All' ? `(${applications.length})` : `(${applications.filter(a => a.status === st).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Cards Grid */}
      <div className="applications-cards-grid">
        {filteredApps.map(app => (
          <div key={app.id} className="app-card-item">
            <div className="app-card-top-row">
              <div className="app-company-group">
                <div className="app-company-logo" style={{ background: app.companyBg }}>
                  {app.company.charAt(0)}
                </div>
                <div>
                  <h3 className="app-role-heading">{app.role}</h3>
                  <div className="app-comp-sub">
                    <Building2 size={13} /> {app.company} • <MapPin size={13} /> {app.location}
                  </div>
                </div>
              </div>

              <div className="app-status-badge-wrap">
                <span className={`app-status-chip chip-${app.status.toLowerCase().replace(/ /g, '-')}`}>
                  {app.status}
                </span>
                <span className="app-match-tag">{app.matchScore}% Match</span>
              </div>
            </div>

            <div className="app-action-box">
              <div className="action-box-lbl">Next Step in Hiring Pipeline:</div>
              <div className="action-box-text">
                <Clock size={13} style={{ color: '#2563EB', flexShrink: 0 }} />
                <span>{app.nextAction} (<strong>{app.nextDate}</strong>)</span>
              </div>
            </div>

            <div className="app-meta-details-row">
              <div className="meta-item-box">
                <span className="meta-lbl">Applied On</span>
                <span className="meta-val">{app.appliedDate}</span>
              </div>
              <div className="meta-item-box">
                <span className="meta-lbl">Compensation Tier</span>
                <span className="meta-val text-emerald">{app.salary}</span>
              </div>
            </div>

            <div className="app-card-footer">
              <button onClick={() => setSelectedApp(app)} className="btn-view-pipeline">
                <FileText size={14} /> View Hiring Pipeline ({app.timeline.length} Stages)
              </button>

              <button onClick={() => onNavigate('/student/messages')} className="btn-msg-recruiter" title="Message Recruiter">
                <MessageSquare size={14} /> Chat
              </button>

              <button 
                onClick={() => handleWithdraw(app.id, app.role)} 
                className="btn-withdraw-app" 
                title="Withdraw Application"
              >
                <XCircle size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PIPELINE DETAILS MODAL */}
      {selectedApp && (
        <div className="modal-backdrop-overlay" onClick={() => setSelectedApp(null)}>
          <div className="pipeline-modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-pipe-header">
              <div className="modal-company-title-group">
                <div className="app-company-logo" style={{ background: selectedApp.companyBg }}>
                  {selectedApp.company.charAt(0)}
                </div>
                <div>
                  <h3 className="pipe-modal-role">{selectedApp.role}</h3>
                  <div className="pipe-modal-sub">{selectedApp.company} • {selectedApp.location} • Applied {selectedApp.appliedDate}</div>
                </div>
              </div>
              <button onClick={() => setSelectedApp(null)} className="modal-close-icon"><X size={18} /></button>
            </div>

            <div className="pipe-modal-body">
              <div className="pipeline-progress-banner">
                <div className="pipe-status-current">
                  Current Status: <strong>{selectedApp.status}</strong>
                </div>
                <div className="pipe-next-step">
                  Next: {selectedApp.nextAction} ({selectedApp.nextDate})
                </div>
              </div>

              <h4 className="timeline-section-title">Hiring Process Timeline</h4>

              <div className="stages-vertical-timeline">
                {selectedApp.timeline.map((step, idx) => (
                  <div key={idx} className={`timeline-stage-row ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`}>
                    <div className="stage-marker">
                      {step.completed ? (
                        <CheckCircle2 size={18} style={{ color: '#059669' }} />
                      ) : step.current ? (
                        <div className="current-pulsing-dot"></div>
                      ) : (
                        <div className="pending-gray-dot"></div>
                      )}
                    </div>
                    <div className="stage-content">
                      <div className="stage-name-text">{step.stage}</div>
                      <div className="stage-date-text">{step.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pipe-modal-footer">
                <button onClick={() => onNavigate('/student/messages')} className="btn-contact-hr">
                  <MessageSquare size={14} /> Message Recruiter
                </button>
                <button onClick={() => setSelectedApp(null)} className="btn-close-pipe">
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .student-page-container {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
        }

        .toast-notification-student {
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
        }

        .flex-between-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .tag-pill-navy {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 800;
          color: #2563EB;
          background: #EFF6FF;
          padding: 4px 10px;
          border-radius: 20px;
          width: fit-content;
          margin-bottom: 8px;
        }

        .page-main-heading {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--navy-900);
        }

        .page-sub-heading {
          font-size: 0.85rem;
          color: var(--slate-500);
          margin-top: 4px;
          max-width: 780px;
        }

        .btn-explore-more {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px;
          border-radius: 10px;
          background: var(--codolio-orange);
          color: #FFFFFF;
          font-size: 0.82rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }
        .btn-explore-more:hover {
          background: var(--codolio-orange-hover);
        }

        /* 4 Metrics Grid */
        .metrics-pipeline-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        .metric-box-card {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 14px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 6px rgba(15,23,42,0.03);
        }
        .border-navy { border-top: 4px solid #0F172A; }
        .border-royal { border-top: 4px solid #2563EB; }
        .border-amber { border-top: 4px solid #D97706; }
        .border-emerald { border-top: 4px solid #059669; }

        .metric-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .metric-title {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--slate-600);
        }
        .metric-value-huge {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          margin-top: 10px;
          line-height: 1;
        }
        .text-navy { color: #0F172A; }
        .text-royal { color: #2563EB; }
        .text-amber { color: #D97706; }
        .text-emerald { color: #059669; }
        .metric-sub-text {
          font-size: 0.75rem;
          color: var(--slate-500);
          margin-top: 8px;
        }

        /* Search & Filter */
        .search-filter-controls-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .search-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon-pos {
          position: absolute;
          left: 14px;
          color: var(--slate-400);
        }
        .app-search-input {
          width: 100%;
          padding: 11px 14px 11px 40px;
          border: 1.5px solid var(--slate-200);
          border-radius: 12px;
          font-size: 0.88rem;
          color: var(--navy-900);
          outline: none;
          background: #FFFFFF;
        }
        .app-search-input:focus {
          border-color: #2563EB;
        }

        .status-filter-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .status-pill-btn {
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid var(--slate-200);
          background: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--slate-600);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .status-pill-btn.active {
          background: var(--navy-900);
          color: #FFFFFF;
          border-color: var(--navy-900);
        }

        /* Applications Grid */
        .applications-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 20px;
        }

        .app-card-item {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 2px 8px rgba(15,23,42,0.03);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .app-card-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(15,23,42,0.08);
        }

        .app-card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .app-company-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .app-company-logo {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .app-role-heading {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .app-comp-sub {
          font-size: 0.78rem;
          color: var(--slate-500);
          margin-top: 3px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .app-status-badge-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }
        .app-status-chip {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 12px;
        }
        .chip-interview { background: #EFF6FF; color: #1D4ED8; }
        .chip-shortlisted { background: #FEF3C7; color: #92400E; }
        .chip-in-review { background: #F1F5F9; color: #475569; }
        .chip-offer-extended { background: #D1FAE5; color: #065F46; }

        .app-match-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: #059669;
        }

        .app-action-box {
          background: #F8FAFC;
          border-left: 3px solid #2563EB;
          padding: 10px 12px;
          border-radius: 6px;
        }
        .action-box-lbl {
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--slate-500);
          text-transform: uppercase;
        }
        .action-box-text {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--navy-900);
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .app-meta-details-row {
          display: flex;
          justify-content: space-between;
          background: var(--slate-50);
          padding: 8px 12px;
          border-radius: 8px;
        }
        .meta-item-box {
          display: flex;
          flex-direction: column;
        }
        .meta-lbl {
          font-size: 0.68rem;
          color: var(--slate-500);
          font-weight: 700;
        }
        .meta-val {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--navy-900);
          margin-top: 2px;
        }

        .app-card-footer {
          margin-top: auto;
          display: flex;
          gap: 8px;
          padding-top: 12px;
          border-top: 1px solid var(--slate-100);
        }
        .btn-view-pipeline {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 8px;
          background: var(--navy-900);
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }
        .btn-msg-recruiter {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid var(--slate-200);
          background: var(--slate-50);
          color: var(--navy-900);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-withdraw-app {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 10px;
          border-radius: 8px;
          border: 1px solid #FECACA;
          background: #FEF2F2;
          color: #EF4444;
          cursor: pointer;
        }

        /* Modal Styles */
        .modal-backdrop-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(15,23,42,0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .pipeline-modal-box {
          background: #FFFFFF;
          border-radius: 18px;
          width: 100%;
          max-width: 600px;
          box-shadow: 0 24px 60px rgba(15,23,42,0.25);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .modal-pipe-header {
          padding: 20px 24px;
          border-bottom: 1px solid var(--slate-200);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-company-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pipe-modal-role {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .pipe-modal-sub {
          font-size: 0.78rem;
          color: var(--slate-500);
          margin-top: 2px;
        }
        .modal-close-icon {
          background: var(--slate-100);
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--slate-500);
          cursor: pointer;
        }

        .pipe-modal-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pipeline-progress-banner {
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          border-radius: 10px;
          padding: 12px 16px;
        }
        .pipe-status-current {
          font-size: 0.85rem;
          color: #1E40AF;
        }
        .pipe-next-step {
          font-size: 0.78rem;
          color: #3B82F6;
          margin-top: 4px;
        }

        .timeline-section-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--navy-900);
        }

        .stages-vertical-timeline {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-left: 6px;
        }
        .timeline-stage-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          position: relative;
        }
        .stage-marker {
          width: 20px;
          display: flex;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .current-pulsing-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #2563EB;
          box-shadow: 0 0 0 4px #DBEAFE;
        }
        .pending-gray-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--slate-300);
        }

        .stage-name-text {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--navy-900);
        }
        .timeline-stage-row.completed .stage-name-text {
          color: #065F46;
        }
        .stage-date-text {
          font-size: 0.72rem;
          color: var(--slate-400);
          margin-top: 2px;
        }

        .pipe-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 10px;
          padding-top: 14px;
          border-top: 1px solid var(--slate-100);
        }
        .btn-contact-hr {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          border-radius: 8px;
          background: #2563EB;
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }
        .btn-close-pipe {
          padding: 9px 16px;
          border-radius: 8px;
          border: 1px solid var(--slate-200);
          background: var(--slate-100);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--slate-600);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
