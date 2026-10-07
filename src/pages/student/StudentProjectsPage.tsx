import React, { useState } from 'react';
import { UserProfile, Project } from '../../types/profile';
import { 
  FolderGit2, 
  Plus, 
  ExternalLink, 
  Github, 
  Eye, 
  Star, 
  Layers, 
  Code2, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface StudentProjectsPageProps {
  profile: UserProfile;
  onAddProject: () => void;
  onNavigate: (route: string) => void;
}

export const StudentProjectsPage: React.FC<StudentProjectsPageProps> = ({
  profile,
  onAddProject,
  onNavigate
}) => {
  const [filter, setFilter] = useState<'All' | 'Featured' | 'Full Stack' | 'Systems'>('All');

  const filteredProjects = profile.projects.filter(p => {
    if (filter === 'Featured') return p.featured;
    if (filter === 'Full Stack') return p.techStack.some(t => ['React.js', 'TypeScript', 'Node.js'].includes(t));
    if (filter === 'Systems') return p.techStack.some(t => ['Go', 'C++', 'Redis', 'Docker'].includes(t));
    return true;
  });

  return (
    <div className="student-page-container">
      {/* Header Banner */}
      <div className="color-card color-card-navy">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner flex-between-header">
          <div>
            <div className="tag-pill-navy">
              <FolderGit2 size={14} style={{ color: '#2563EB' }} />
              <span>Engineering Portfolio</span>
            </div>
            <h1 className="page-main-heading">My Verified Projects</h1>
            <p className="page-sub-heading">Showcase verified engineering builds, production metrics, and architecture case studies.</p>
          </div>

          <div className="header-actions-group">
            <button onClick={onAddProject} className="btn-add-primary">
              <Plus size={16} /> Add New Project
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-pills-bar">
        {(['All', 'Featured', 'Full Stack', 'Systems'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`filter-tab-pill ${filter === tab ? 'active' : ''}`}
          >
            {tab} {tab === 'All' ? `(${profile.projects.length})` : ''}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="empty-projects-card">
          <FolderGit2 size={48} style={{ color: 'var(--slate-400)' }} />
          <h3>No projects found in this category</h3>
          <p>Add a new build or clear filters to view your engineering portfolio.</p>
          <button onClick={onAddProject} className="btn-add-primary" style={{ marginTop: '12px' }}>
            <Plus size={15} /> Add Project
          </button>
        </div>
      ) : (
        <div className="projects-cards-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-showcase-card">
              <div className="project-cover-wrap">
                <img src={project.imageUrl} alt={project.title} className="project-cover-img" />
                {project.featured && (
                  <span className="featured-badge">
                    <Star size={12} fill="#F97316" color="#F97316" /> Featured Build
                  </span>
                )}
              </div>

              <div className="project-content-body">
                <div className="project-role-tag">{project.role}</div>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-subtitle-text">{project.subtitle}</p>
                <p className="project-desc-text">{project.description}</p>

                {/* Tech Stack Chips */}
                <div className="project-tech-chips">
                  {project.techStack.map(t => (
                    <span key={t} className="tech-badge-chip">{t}</span>
                  ))}
                </div>

                {/* Measurable Outcomes */}
                {project.outcomes && project.outcomes.length > 0 && (
                  <div className="project-outcomes-box">
                    <div className="outcomes-label">Measurable Outcomes & KPIs:</div>
                    <ul className="outcomes-list">
                      {project.outcomes.map((o, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={13} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Footer Action Buttons */}
                <div className="project-card-footer">
                  <a 
                    href={project.liveUrl || 'https://github.com'} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-proj-live"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                  <a 
                    href={project.githubUrl || 'https://github.com'} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-proj-github"
                  >
                    <Github size={14} /> GitHub Repo
                  </a>
                </div>
              </div>
            </div>
          ))}
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

        .btn-add-primary {
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
          transition: background 0.15s ease;
        }
        .btn-add-primary:hover {
          background: var(--codolio-orange-hover);
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

        .projects-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 20px;
        }

        .project-showcase-card {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(15,23,42,0.04);
          display: flex;
          flex-direction: column;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .project-showcase-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(15,23,42,0.08);
        }

        .project-cover-wrap {
          position: relative;
          width: 100%;
          height: 175px;
          background: var(--slate-100);
        }
        .project-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .featured-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #FFFFFF;
          color: #C2410C;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 4px 8px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .project-content-body {
          padding: 18px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .project-role-tag {
          font-size: 0.72rem;
          font-weight: 800;
          color: #2563EB;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .project-card-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--navy-900);
          margin-top: 4px;
        }
        .project-subtitle-text {
          font-size: 0.8rem;
          color: var(--slate-500);
          margin-top: 2px;
        }
        .project-desc-text {
          font-size: 0.82rem;
          color: var(--slate-600);
          margin-top: 10px;
          line-height: 1.45;
        }

        .project-tech-chips {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 12px;
        }
        .tech-badge-chip {
          font-size: 0.72rem;
          font-weight: 700;
          color: #1E40AF;
          background: #EFF6FF;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .project-outcomes-box {
          margin-top: 14px;
          background: var(--slate-50);
          border: 1px solid var(--slate-200);
          border-radius: 8px;
          padding: 10px 12px;
        }
        .outcomes-label {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--slate-600);
          text-transform: uppercase;
        }
        .outcomes-list {
          list-style: none;
          padding: 0;
          margin: 6px 0 0 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .outcomes-list li {
          font-size: 0.78rem;
          color: var(--slate-700);
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }

        .project-card-footer {
          margin-top: auto;
          display: flex;
          gap: 10px;
          padding-top: 16px;
          border-top: 1px solid var(--slate-100);
        }
        .btn-proj-live {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 8px;
          background: var(--codolio-orange);
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 800;
          text-decoration: none;
        }
        .btn-proj-live:hover {
          background: var(--codolio-orange-hover);
        }
        .btn-proj-github {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid var(--slate-200);
          background: var(--slate-50);
          color: var(--navy-900);
          font-size: 0.78rem;
          font-weight: 700;
          text-decoration: none;
        }
        .btn-proj-github:hover {
          background: var(--slate-100);
        }

        .empty-projects-card {
          background: #FFFFFF;
          border: 1px dashed var(--slate-300);
          border-radius: 14px;
          padding: 48px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
      `}</style>
    </div>
  );
};
