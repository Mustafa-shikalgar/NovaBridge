import React, { useState } from 'react';
import { UserProfile, Skill, SkillCategory } from '../../types/profile';
import { 
  Target, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface StudentSkillsPageProps {
  profile: UserProfile;
  onNavigate: (route: string) => void;
}

const CATEGORIES: SkillCategory[] = ['Languages', 'Frontend', 'Backend', 'Database', 'AI/ML', 'Tools'];

export const StudentSkillsPage: React.FC<StudentSkillsPageProps> = ({
  profile,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredSkills = selectedCategory === 'All' 
    ? profile.skills 
    : profile.skills.filter(s => s.category === selectedCategory);

  const getLevelColor = (level: Skill['level']) => {
    switch (level) {
      case 'Expert': return { bg: '#D1FAE5', text: '#065F46', bar: '#059669', width: '95%' };
      case 'Advanced': return { bg: '#EFF6FF', text: '#1D4ED8', bar: '#2563EB', width: '80%' };
      case 'Intermediate': return { bg: '#FEF3C7', text: '#92400E', bar: '#D97706', width: '65%' };
      default: return { bg: '#F1F5F9', text: '#475569', bar: '#64748B', width: '50%' };
    }
  };

  return (
    <div className="student-page-container">
      {/* Header Banner */}
      <div className="color-card color-card-royal">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner flex-between-header">
          <div>
            <div className="tag-pill-royal">
              <Target size={14} style={{ color: '#2563EB' }} />
              <span>Skill Matrix & Verification</span>
            </div>
            <h1 className="page-main-heading">Verified Skills Matrix</h1>
            <p className="page-sub-heading">Your technology stack backed by real repositories, project code, and competitive coding proofs.</p>
          </div>

          <div className="readiness-score-box">
            <span className="readiness-label">Profile Readiness</span>
            <span className="readiness-val">78%</span>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="filter-pills-bar">
        {['All', ...CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`filter-tab-pill ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat} {cat === 'All' ? `(${profile.skills.length})` : `(${profile.skills.filter(s => s.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="skills-cards-grid">
        {filteredSkills.map(skill => {
          const styling = getLevelColor(skill.level);
          return (
            <div key={skill.id} className="skill-matrix-card">
              <div className="skill-card-top">
                <div className="skill-name-group">
                  <h4 className="skill-name-text">{skill.name}</h4>
                  <span className="skill-category-sub">{skill.category}</span>
                </div>
                {skill.verified && (
                  <span className="verified-shield-icon" title="Cryptographically Verified">
                    <ShieldCheck size={18} style={{ color: '#059669' }} />
                  </span>
                )}
              </div>

              <div className="skill-card-body">
                <div className="skill-level-row">
                  <span className="level-badge" style={{ background: styling.bg, color: styling.text }}>
                    {skill.level}
                  </span>
                  <span className="proof-type-text">{skill.proofType}</span>
                </div>

                <div className="proof-title-text">{skill.proofTitle}</div>

                {/* Progress bar representing mastery */}
                <div className="skill-meter-bg">
                  <div className="skill-meter-fill" style={{ width: styling.width, background: styling.bar }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Skill Gap Analysis Box */}
      <div className="color-card color-card-navy" style={{ marginTop: '10px' }}>
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner">
          <div className="gap-analysis-header">
            <div className="gap-title-group">
              <Sparkles size={18} style={{ color: '#F97316' }} />
              <div>
                <h3 className="section-main-heading">Skill Gap Analysis for Full Stack Developer</h3>
                <p className="section-sub-heading">Add these in-demand skills to your matrix to increase your job match readiness by 15%</p>
              </div>
            </div>
          </div>

          <div className="missing-skills-grid">
            <div className="missing-skill-pill">
              <div>
                <div className="missing-title">System Design & Scalability</div>
                <div className="missing-desc">High demand across Uber, Google, Stripe</div>
              </div>
              <button onClick={() => onNavigate('/student/courses')} className="btn-add-skill-rec">
                <Plus size={13} /> Add & Learn
              </button>
            </div>

            <div className="missing-skill-pill">
              <div>
                <div className="missing-title">PostgreSQL & Query Optimization</div>
                <div className="missing-desc">Strengthen relational data modeling</div>
              </div>
              <button onClick={() => onNavigate('/student/courses')} className="btn-add-skill-rec">
                <Plus size={13} /> Add & Learn
              </button>
            </div>

            <div className="missing-skill-pill">
              <div>
                <div className="missing-title">Docker & Kubernetes (CKA)</div>
                <div className="missing-desc">Cloud-native deployment standard</div>
              </div>
              <button onClick={() => onNavigate('/student/courses')} className="btn-add-skill-rec">
                <Plus size={13} /> Add & Learn
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

        .tag-pill-royal {
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

        .readiness-score-box {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 12px;
          padding: 10px 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .readiness-label {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--slate-500);
          text-transform: uppercase;
        }
        .readiness-val {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: #059669;
        }

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
          transition: all 0.15s ease;
        }
        .filter-tab-pill.active {
          background: var(--navy-900);
          color: #FFFFFF;
          border-color: var(--navy-900);
        }

        .skills-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }

        .skill-matrix-card {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 2px 6px rgba(15,23,42,0.03);
          transition: transform 0.15s ease;
        }
        .skill-matrix-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(15,23,42,0.08);
        }

        .skill-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .skill-name-text {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .skill-category-sub {
          font-size: 0.72rem;
          color: var(--slate-500);
          font-weight: 600;
        }

        .skill-card-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .skill-level-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .level-badge {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 6px;
        }
        .proof-type-text {
          font-size: 0.72rem;
          color: var(--slate-500);
          text-transform: capitalize;
        }

        .proof-title-text {
          font-size: 0.78rem;
          color: var(--slate-600);
          line-height: 1.35;
        }

        .skill-meter-bg {
          width: 100%;
          height: 5px;
          background: var(--slate-100);
          border-radius: 6px;
          overflow: hidden;
          margin-top: 4px;
        }
        .skill-meter-fill {
          height: 100%;
          border-radius: 6px;
        }

        .gap-analysis-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .gap-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
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

        .missing-skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 14px;
        }
        .missing-skill-pill {
          background: var(--slate-50);
          border: 1px solid var(--slate-200);
          border-radius: 10px;
          padding: 12px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }
        .missing-title {
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .missing-desc {
          font-size: 0.72rem;
          color: var(--slate-500);
          margin-top: 2px;
        }
        .btn-add-skill-rec {
          padding: 6px 10px;
          border-radius: 6px;
          background: #FFF7ED;
          border: 1px solid #FFEDD5;
          color: #F97316;
          font-size: 0.75rem;
          font-weight: 800;
          cursor: pointer;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .btn-add-skill-rec:hover {
          background: #F97316;
          color: #FFFFFF;
        }
      `}</style>
    </div>
  );
};
