import React from 'react';
import { UserProfile } from '../../types/profile';
import { AuthUser } from '../../services/authService';
import { 
  Sparkles, 
  Target, 
  TrendingUp, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ShieldCheck, 
  Briefcase, 
  Award,
  ArrowRight,
  BookOpen,
  DollarSign
} from 'lucide-react';

interface StudentCareerIntelligencePageProps {
  profile: UserProfile;
  user: AuthUser;
  onNavigate: (route: string) => void;
}

export const StudentCareerIntelligencePage: React.FC<StudentCareerIntelligencePageProps> = ({
  profile,
  user,
  onNavigate
}) => {
  return (
    <div className="student-page-container">
      {/* Header Banner */}
      <div className="color-card color-card-navy">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner flex-between-header">
          <div>
            <div className="tag-pill-navy">
              <Sparkles size={14} style={{ color: '#F97316' }} />
              <span>Career Roadmap & Market Insights</span>
            </div>
            <h1 className="page-main-heading">Career Intelligence Hub</h1>
            <p className="page-sub-heading">Continuous algorithmic analysis of your skills, project depth, and competitive programming standing.</p>
          </div>

          <div className="career-target-pill">
            <span className="target-lbl">Target Role</span>
            <span className="target-role-val">{user.targetRole || 'Full Stack Developer'}</span>
          </div>
        </div>
      </div>

      {/* Career Readiness Score & Sub-scores */}
      <div className="color-card color-card-royal">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner">
          <div className="readiness-split-grid">
            <div className="readiness-main-dial">
              <div className="dial-circle">
                <span className="dial-number">78%</span>
                <span className="dial-sub">Readiness</span>
              </div>
              <div className="dial-verdict">Strong Candidate Match</div>
              <p className="dial-caption">Outperforming 82% of peer applicants for Software Engineering and Distributed Systems tracks.</p>
            </div>

            <div className="readiness-breakdown-list">
              <h4 className="breakdown-title">Competency Vector Breakdown</h4>

              <div className="score-metric-row">
                <div className="metric-info-line">
                  <span className="metric-name">Verified Skills Completeness</span>
                  <span className="metric-pct">82%</span>
                </div>
                <div className="metric-bar-track">
                  <div className="metric-bar-val bg-royal" style={{ width: '82%' }}></div>
                </div>
              </div>

              <div className="score-metric-row">
                <div className="metric-info-line">
                  <span className="metric-name">Engineering Project Depth</span>
                  <span className="metric-pct">91%</span>
                </div>
                <div className="metric-bar-track">
                  <div className="metric-bar-val bg-emerald" style={{ width: '91%' }}></div>
                </div>
              </div>

              <div className="score-metric-row">
                <div className="metric-info-line">
                  <span className="metric-name">Competitive Programming (CF / LC)</span>
                  <span className="metric-pct">74%</span>
                </div>
                <div className="metric-bar-track">
                  <div className="metric-bar-val bg-orange" style={{ width: '74%' }}></div>
                </div>
              </div>

              <div className="score-metric-row">
                <div className="metric-info-line">
                  <span className="metric-name">System Verification & Proofs</span>
                  <span className="metric-pct">88%</span>
                </div>
                <div className="metric-bar-track">
                  <div className="metric-bar-val bg-navy" style={{ width: '88%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter Outreach & Visibility Metrics */}
      <div className="color-card color-card-emerald">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner">
          <h3 className="section-main-heading" style={{ marginBottom: '16px' }}>Recruiter Search & Discovery Activity</h3>

          <div className="recruiter-stat-boxes-grid">
            <div className="rec-intel-box">
              <div className="intel-num text-royal">245</div>
              <div className="intel-lbl">Profile Views</div>
              <div className="intel-sub">+32 this week</div>
            </div>
            <div className="rec-intel-box">
              <div className="intel-num text-emerald">18</div>
              <div className="intel-lbl">Talent Search Hits</div>
              <div className="intel-sub">Matched role queries</div>
            </div>
            <div className="rec-intel-box">
              <div className="intel-num text-orange">6</div>
              <div className="intel-lbl">Company Shortlists</div>
              <div className="intel-sub">Active recruiter folders</div>
            </div>
            <div className="rec-intel-box">
              <div className="intel-num text-navy">2</div>
              <div className="intel-lbl">Pending Invites</div>
              <div className="intel-sub">Technical screening</div>
            </div>
          </div>

          <div className="top-viewing-companies">
            <div className="top-comp-title">Top Companies Viewing Your Profile:</div>
            <div className="companies-chips-row">
              <div className="company-view-chip">
                <Building2 size={14} style={{ color: '#0F172A' }} />
                <span>Uber Distributed Systems Team</span>
                <span className="view-time">2 days ago</span>
              </div>
              <div className="company-view-chip">
                <Building2 size={14} style={{ color: '#2563EB' }} />
                <span>Google Cloud Engineering</span>
                <span className="view-time">4 days ago</span>
              </div>
              <div className="company-view-chip">
                <Building2 size={14} style={{ color: '#7C3AED' }} />
                <span>Stripe Infrastructure</span>
                <span className="view-time">1 week ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Career Roadmap Timeline */}
      <div className="color-card color-card-orange">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner">
          <h3 className="section-main-heading">Target Career Roadmap</h3>
          <p className="section-sub-heading">Milestones required to reach the top 1% candidate tier for {user.targetRole || 'Full Stack Engineer'}</p>

          <div className="roadmap-milestones-list">
            <div className="milestone-row completed">
              <div className="milestone-status-icon">
                <CheckCircle2 size={16} />
              </div>
              <div className="milestone-info">
                <div className="milestone-title">Complete Profile & Link Competitive Coding Accounts</div>
                <div className="milestone-desc">GitHub, LeetCode, and Codeforces handles connected with live API verification.</div>
              </div>
              <span className="milestone-badge-done">Completed</span>
            </div>

            <div className="milestone-row completed">
              <div className="milestone-status-icon">
                <CheckCircle2 size={16} />
              </div>
              <div className="milestone-info">
                <div className="milestone-title">Publish 5+ Production-Grade Projects</div>
                <div className="milestone-desc">{profile.projects.length} verified projects with architecture case studies in repository.</div>
              </div>
              <span className="milestone-badge-done">Completed</span>
            </div>

            <div className="milestone-row active">
              <div className="milestone-status-icon icon-active">
                <TrendingUp size={16} />
              </div>
              <div className="milestone-info">
                <div className="milestone-title">Reach 1900+ Codeforces Rating (Candidate Master)</div>
                <div className="milestone-desc">Current rating: <strong>{profile.codeforcesStats.rating}</strong> (Peak: {profile.codeforcesStats.maxRating}). 109 rating points to target.</div>
              </div>
              <span className="milestone-badge-progress">In Progress</span>
            </div>

            <div className="milestone-row pending">
              <div className="milestone-status-icon icon-pending">
                <Clock size={16} />
              </div>
              <div className="milestone-info">
                <div className="milestone-title">System Design & High-Throughput Databases Certification</div>
                <div className="milestone-desc">Complete distributed caching & PostgreSQL indexing learning path.</div>
              </div>
              <button onClick={() => onNavigate('/student/courses')} className="btn-milestone-action">
                View Courses -&gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .student-page-container {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
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
        }

        .career-target-pill {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 12px;
          padding: 10px 18px;
          display: flex;
          flex-direction: column;
        }
        .target-lbl {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--slate-500);
          text-transform: uppercase;
        }
        .target-role-val {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--navy-900);
          margin-top: 2px;
        }

        .readiness-split-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 28px;
          align-items: center;
        }

        .readiness-main-dial {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 14px;
          border-right: 1px solid var(--slate-200);
        }
        .dial-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 8px solid #2563EB;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .dial-number {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 800;
          color: var(--navy-900);
          line-height: 1;
        }
        .dial-sub {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--slate-500);
          text-transform: uppercase;
        }
        .dial-verdict {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          color: #059669;
          margin-top: 14px;
        }
        .dial-caption {
          font-size: 0.78rem;
          color: var(--slate-500);
          margin-top: 4px;
          line-height: 1.4;
        }

        .readiness-breakdown-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .breakdown-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .score-metric-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .metric-info-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--slate-700);
        }
        .metric-pct {
          font-weight: 800;
          color: var(--navy-900);
        }
        .metric-bar-track {
          width: 100%;
          height: 6px;
          background: var(--slate-100);
          border-radius: 6px;
          overflow: hidden;
        }
        .metric-bar-val {
          height: 100%;
          border-radius: 6px;
        }
        .bg-royal { background: #2563EB; }
        .bg-emerald { background: #059669; }
        .bg-orange { background: #F97316; }
        .bg-navy { background: #0F172A; }

        .section-main-heading {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .section-sub-heading {
          font-size: 0.8125rem;
          color: var(--slate-500);
          margin-top: 2px;
        }

        .recruiter-stat-boxes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 14px;
        }
        .rec-intel-box {
          background: var(--slate-50);
          border: 1px solid var(--slate-200);
          border-radius: 10px;
          padding: 14px;
          display: flex;
          flex-direction: column;
        }
        .intel-num {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 1;
        }
        .intel-lbl {
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--navy-900);
          margin-top: 6px;
        }
        .intel-sub {
          font-size: 0.72rem;
          color: var(--slate-400);
          margin-top: 2px;
        }

        .top-viewing-companies {
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid var(--slate-100);
        }
        .top-comp-title {
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--slate-600);
          text-transform: uppercase;
        }
        .companies-chips-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 8px;
        }
        .company-view-chip {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 8px;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--navy-900);
        }
        .view-time {
          font-size: 0.7rem;
          color: var(--slate-400);
          font-weight: 600;
        }

        .roadmap-milestones-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 16px;
        }
        .milestone-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid var(--slate-200);
          background: #FFFFFF;
        }
        .milestone-row.completed {
          background: #F8FAFC;
        }
        .milestone-row.active {
          border-color: #F97316;
          background: #FFF7ED;
        }
        .milestone-status-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #D1FAE5;
          color: #059669;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .icon-active {
          background: #FFEDD5;
          color: #F97316;
        }
        .icon-pending {
          background: var(--slate-100);
          color: var(--slate-400);
        }
        .milestone-info {
          flex: 1;
        }
        .milestone-title {
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .milestone-desc {
          font-size: 0.78rem;
          color: var(--slate-600);
          margin-top: 2px;
        }
        .milestone-badge-done {
          font-size: 0.72rem;
          font-weight: 800;
          color: #065F46;
          background: #D1FAE5;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .milestone-badge-progress {
          font-size: 0.72rem;
          font-weight: 800;
          color: #C2410C;
          background: #FFEDD5;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .btn-milestone-action {
          padding: 6px 12px;
          border-radius: 6px;
          background: var(--navy-900);
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }

        @media (max-width: 800px) {
          .readiness-split-grid {
            grid-template-columns: 1fr;
          }
          .readiness-main-dial {
            border-right: none;
            border-bottom: 1px solid var(--slate-200);
            padding-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};
