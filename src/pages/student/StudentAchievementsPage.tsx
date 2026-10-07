import React, { useState } from 'react';
import { UserProfile, Achievement, Certification, ResearchPublication } from '../../types/profile';
import { 
  Trophy, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  ExternalLink, 
  Calendar, 
  Sparkles,
  Medal,
  CheckCircle2
} from 'lucide-react';

interface StudentAchievementsPageProps {
  profile: UserProfile;
  onNavigate: (route: string) => void;
}

export const StudentAchievementsPage: React.FC<StudentAchievementsPageProps> = ({
  profile,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Hackathons' | 'Certifications' | 'Publications'>('All');

  return (
    <div className="student-page-container">
      {/* Header Banner */}
      <div className="color-card color-card-orange">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner flex-between-header">
          <div>
            <div className="tag-pill-orange">
              <Trophy size={14} style={{ color: '#F97316' }} />
              <span>Honors & Credentials</span>
            </div>
            <h1 className="page-main-heading">Achievements & Credentials</h1>
            <p className="page-sub-heading">Verified hackathon prizes, cloud certifications, and peer-reviewed research publications.</p>
          </div>

          <div className="stats-kpi-pill">
            <span className="kpi-num">{profile.achievements.length + profile.certifications.length + profile.publications.length}</span>
            <span className="kpi-lbl">Total Credentials</span>
          </div>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="metrics-row-4">
        <div className="stat-summary-card border-orange">
          <div className="stat-card-title">Hackathons & Honors</div>
          <div className="stat-card-num text-orange">{profile.achievements.length}</div>
          <div className="stat-card-sub">National & Collegiate</div>
        </div>
        <div className="stat-summary-card border-royal">
          <div className="stat-card-title">Certifications</div>
          <div className="stat-card-num text-royal">{profile.certifications.length}</div>
          <div className="stat-card-sub">AWS & Kubernetes</div>
        </div>
        <div className="stat-summary-card border-emerald">
          <div className="stat-card-title">Publications</div>
          <div className="stat-card-num text-emerald">{profile.publications.length}</div>
          <div className="stat-card-sub">IEEE & Conferences</div>
        </div>
        <div className="stat-summary-card border-purple">
          <div className="stat-card-title">NFT Cyber Badges</div>
          <div className="stat-card-num text-purple">{profile.badges?.length || 4}</div>
          <div className="stat-card-sub">Platform Milestones</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-pills-bar">
        {(['All', 'Hackathons', 'Certifications', 'Publications'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`filter-tab-pill ${activeTab === tab ? 'active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Achievements Cards (Hackathons) */}
      {(activeTab === 'All' || activeTab === 'Hackathons') && (
        <div className="credentials-section">
          <div className="section-label-header">
            <Trophy size={16} className="text-orange" />
            <span>Hackathons & Competitive Honors ({profile.achievements.length})</span>
          </div>

          <div className="credentials-grid">
            {profile.achievements.map(ach => (
              <div key={ach.id} className="credential-card-item">
                <div className="cred-top-row">
                  <span className="category-chip cat-hackathon">{ach.category}</span>
                  {ach.rank && <span className="rank-badge">{ach.rank}</span>}
                </div>

                <h3 className="cred-title">{ach.title}</h3>
                <div className="cred-org-row">
                  <span>{ach.organization}</span> • <span>{ach.date}</span>
                </div>

                <p className="cred-desc">{ach.description}</p>

                <div className="cred-footer">
                  <span className="verified-status-tag">
                    <ShieldCheck size={14} style={{ color: '#059669' }} /> Verified Milestone
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Cards */}
      {(activeTab === 'All' || activeTab === 'Certifications') && (
        <div className="credentials-section">
          <div className="section-label-header">
            <Award size={16} className="text-royal" />
            <span>Professional Certifications ({profile.certifications.length})</span>
          </div>

          <div className="credentials-grid">
            {profile.certifications.map(cert => (
              <div key={cert.id} className="credential-card-item">
                <div className="cred-top-row">
                  <span className="category-chip cat-cert">Certification</span>
                  <span className="cred-date-tag">{cert.issueDate}</span>
                </div>

                <h3 className="cred-title">{cert.title}</h3>
                <div className="cred-org-row">Issuer: <strong>{cert.issuer}</strong></div>

                <div className="cred-id-box">
                  Credential ID: <code>{cert.credentialId}</code>
                </div>

                <div className="cred-footer">
                  <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="btn-verify-cred">
                    <span>Verify Credential</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Research Publications Cards */}
      {(activeTab === 'All' || activeTab === 'Publications') && (
        <div className="credentials-section">
          <div className="section-label-header">
            <BookOpen size={16} className="text-emerald" />
            <span>Research & Publications ({profile.publications.length})</span>
          </div>

          <div className="credentials-grid">
            {profile.publications.map(pub => (
              <div key={pub.id} className="credential-card-item">
                <div className="cred-top-row">
                  <span className="category-chip cat-pub">Peer-Reviewed</span>
                  <span className="cred-date-tag">{pub.publicationDate}</span>
                </div>

                <h3 className="cred-title">{pub.title}</h3>
                <div className="cred-org-row">Published in: <strong>{pub.publisher}</strong></div>

                <p className="cred-desc">{pub.abstract}</p>

                {pub.doi && (
                  <div className="cred-id-box">
                    DOI: <code>{pub.doi}</code>
                  </div>
                )}

                <div className="cred-footer">
                  <a href={pub.url || '#'} target="_blank" rel="noreferrer" className="btn-verify-cred">
                    <span>Read Publication</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

        .tag-pill-orange {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 800;
          color: #F97316;
          background: #FFF7ED;
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

        .stats-kpi-pill {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 12px;
          padding: 10px 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .kpi-num {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: #F97316;
          line-height: 1;
        }
        .kpi-lbl {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--slate-500);
          margin-top: 4px;
        }

        .metrics-row-4 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 16px;
        }
        .stat-summary-card {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
        }
        .border-orange { border-top: 4px solid #F97316; }
        .border-royal { border-top: 4px solid #2563EB; }
        .border-emerald { border-top: 4px solid #059669; }
        .border-purple { border-top: 4px solid #7C3AED; }

        .stat-card-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--slate-600);
        }
        .stat-card-num {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 800;
          margin-top: 8px;
        }
        .stat-card-sub {
          font-size: 0.72rem;
          color: var(--slate-400);
          margin-top: 4px;
        }
        .text-orange { color: #F97316; }
        .text-royal { color: #2563EB; }
        .text-emerald { color: #059669; }
        .text-purple { color: #7C3AED; }

        .filter-pills-bar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .filter-tab-pill {
          padding: 7px 16px;
          border-radius: 20px;
          border: 1px solid var(--slate-200);
          background: #FFFFFF;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--slate-600);
          cursor: pointer;
        }
        .filter-tab-pill.active {
          background: var(--navy-900);
          color: #FFFFFF;
          border-color: var(--navy-900);
        }

        .credentials-section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .section-label-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.92rem;
          font-weight: 800;
          color: var(--navy-900);
        }

        .credentials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 16px;
        }
        .credential-card-item {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 12px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 2px 6px rgba(15,23,42,0.03);
          transition: transform 0.15s ease;
        }
        .credential-card-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(15,23,42,0.08);
        }

        .cred-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .category-chip {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .cat-hackathon { background: #FFF7ED; color: #C2410C; }
        .cat-cert { background: #EFF6FF; color: #1D4ED8; }
        .cat-pub { background: #ECFDF5; color: #047857; }

        .rank-badge {
          font-size: 0.72rem;
          font-weight: 800;
          background: #FEF3C7;
          color: #92400E;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .cred-date-tag {
          font-size: 0.72rem;
          color: var(--slate-400);
        }

        .cred-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--navy-900);
          line-height: 1.35;
        }
        .cred-org-row {
          font-size: 0.78rem;
          color: var(--slate-500);
        }
        .cred-desc {
          font-size: 0.8rem;
          color: var(--slate-600);
          line-height: 1.45;
        }

        .cred-id-box {
          background: var(--slate-50);
          border: 1px solid var(--slate-200);
          border-radius: 6px;
          padding: 6px 10px;
          font-size: 0.72rem;
          color: var(--slate-600);
        }
        .cred-id-box code {
          color: #2563EB;
          font-weight: 700;
        }

        .cred-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid var(--slate-100);
        }
        .verified-status-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: #059669;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .btn-verify-cred {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--codolio-orange);
          text-decoration: none;
        }
        .btn-verify-cred:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
