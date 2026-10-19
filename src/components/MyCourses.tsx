import React, { useEffect, useState } from 'react';
import { BookOpen, CheckCircle2, Star, Award, RefreshCw, ShoppingCart, Sparkles } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface EnrolledCourse {
  id: string;
  customId: string;
  title: string;
  subtitle: string;
  instructor: string;
  badge: string;
  rating: number;
  ratingCount: number;
  level: string;
  imageUrl: string;
  category: string;
  purchasedAt: string | null;
}

interface MyCoursesProps {
  onNavigateToCourseStore?: () => void;
}

const getAuthHeader = () => {
  try {
    const raw = localStorage.getItem('novabridge_auth_session');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.token) return { Authorization: `Bearer ${parsed.token}` };
    }
  } catch (_) {}
  return {};
};

export const MyCourses: React.FC<MyCoursesProps> = ({ onNavigateToCourseStore }) => {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMyCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/users/me/courses`, {
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      });
      const data = await res.json();
      if (data.success) {
        setCourses(data.data.courses || []);
      } else {
        setError(data.message || 'Failed to load courses');
      }
    } catch (err: any) {
      setError('Could not connect to server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Recently enrolled';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="my-courses-container">
      {/* Header */}
      <div className="color-card color-card-purple" style={{ marginBottom: '24px' }}>
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner">
          <div className="my-courses-header">
            <div>
              <span className="my-courses-tag">
                <BookOpen size={12} /> My Learning
              </span>
              <h1 className="my-courses-title">My Enrolled Courses</h1>
              <p className="my-courses-sub">All your purchased courses with lifetime access & verified certificates</p>
            </div>
            <button onClick={fetchMyCourses} className="btn-refresh-courses" title="Refresh">
              <RefreshCw size={15} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="my-courses-loading">
          <div className="spinner-ring"></div>
          <span>Loading your courses...</span>
        </div>
      )}

      {error && !loading && (
        <div className="my-courses-error">
          <span>⚠️ {error}</span>
          <button onClick={fetchMyCourses} className="btn-retry">Retry</button>
        </div>
      )}

      {!loading && !error && courses.length === 0 && (
        <div className="my-courses-empty">
          <div className="empty-icon-wrap">
            <BookOpen size={40} style={{ color: '#7C3AED', opacity: 0.5 }} />
          </div>
          <h3 className="empty-title">No courses yet</h3>
          <p className="empty-sub">You haven't purchased any courses. Browse the marketplace to get started!</p>
          {onNavigateToCourseStore && (
            <button onClick={onNavigateToCourseStore} className="btn-browse-courses">
              <ShoppingCart size={15} /> Browse Course Store
            </button>
          )}
        </div>
      )}

      {!loading && !error && courses.length > 0 && (
        <>
          {/* Stats bar */}
          <div className="my-courses-stats-row">
            <div className="stat-chip stat-chip-purple">
              <BookOpen size={14} />
              <span>{courses.length} Course{courses.length > 1 ? 's' : ''} Enrolled</span>
            </div>
            <div className="stat-chip stat-chip-green">
              <CheckCircle2 size={14} />
              <span>Lifetime Access</span>
            </div>
            <div className="stat-chip stat-chip-amber">
              <Award size={14} />
              <span>Certificate Included</span>
            </div>
          </div>

          {/* Course Cards */}
          <div className="enrolled-courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="enrolled-course-card">
                {/* Thumbnail */}
                <div className="enrolled-img-wrap">
                  <img src={course.imageUrl} alt={course.title} className="enrolled-img" />
                  <div className="enrolled-badge-overlay">
                    <CheckCircle2 size={14} /> Enrolled
                  </div>
                  {course.badge === 'Bestseller' && (
                    <div className="badge-yellow-bestseller" style={{ top: 8, left: 8, position: 'absolute' }}>
                      <span>Bestseller</span>
                    </div>
                  )}
                  {course.badge === 'Premium' && (
                    <div className="badge-purple-premium" style={{ top: 8, left: 8, position: 'absolute' }}>
                      <Sparkles size={10} /> <span>Premium</span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="enrolled-card-body">
                  <span className="enrolled-category-tag">{course.category}</span>
                  <h3 className="enrolled-course-title">{course.title}</h3>
                  <p className="enrolled-course-sub">{course.subtitle}</p>
                  <div className="enrolled-instructor">By {course.instructor}</div>

                  <div className="enrolled-rating-row">
                    <Star size={12} fill="#F59E0B" stroke="#F59E0B" />
                    <span className="enrolled-rating-num">{course.rating}</span>
                    <span className="enrolled-rating-count">({course.ratingCount.toLocaleString()})</span>
                    <span className="enrolled-level-pill">{course.level}</span>
                  </div>

                  <div className="enrolled-footer">
                    <span className="enrolled-date">📅 Enrolled: {formatDate(course.purchasedAt)}</span>
                    <button className="btn-continue-course">
                      Continue Learning →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <style>{`
        .my-courses-container {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .my-courses-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
        }
        .my-courses-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          font-weight: 800;
          color: #7C3AED;
          background: #F3E8FF;
          padding: 3px 10px;
          border-radius: 20px;
          margin-bottom: 6px;
        }
        .my-courses-title {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--navy-900);
          margin: 4px 0;
        }
        .my-courses-sub {
          font-size: 0.85rem;
          color: var(--slate-500);
        }
        .btn-refresh-courses {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 10px;
          border: 1.5px solid var(--slate-200);
          background: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--slate-600);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .btn-refresh-courses:hover { background: var(--slate-50); border-color: #7C3AED; color: #7C3AED; }

        .my-courses-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 60px;
          font-size: 0.9rem;
          color: var(--slate-500);
        }
        .spinner-ring {
          width: 24px; height: 24px;
          border: 3px solid #E9D5FF;
          border-top-color: #7C3AED;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .my-courses-error {
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-size: 0.875rem;
          color: #B91C1C;
        }
        .btn-retry {
          padding: 6px 14px;
          border-radius: 8px;
          background: #B91C1C;
          color: #fff;
          font-size: 0.8rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
        }

        .my-courses-empty {
          text-align: center;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .empty-icon-wrap {
          width: 80px; height: 80px;
          background: #F3E8FF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .empty-title { font-family: var(--font-heading); font-size: 1.2rem; font-weight: 800; color: var(--navy-900); }
        .empty-sub { font-size: 0.875rem; color: var(--slate-500); max-width: 360px; }
        .btn-browse-courses {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          border-radius: 10px;
          background: var(--codolio-orange);
          color: #FFFFFF;
          font-size: 0.875rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
          margin-top: 8px;
        }

        .my-courses-stats-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .stat-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
        }
        .stat-chip-purple { background: #F3E8FF; color: #6D28D9; }
        .stat-chip-green { background: #D1FAE5; color: #065F46; }
        .stat-chip-amber { background: #FEF3C7; color: #92400E; }

        .enrolled-courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .enrolled-course-card {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(15,23,42,0.05);
          display: flex;
          flex-direction: column;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .enrolled-course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(15,23,42,0.1);
        }
        .enrolled-img-wrap {
          position: relative;
          width: 100%;
          height: 150px;
        }
        .enrolled-img { width: 100%; height: 100%; object-fit: cover; }
        .enrolled-badge-overlay {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: #10B981;
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .enrolled-card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }
        .enrolled-category-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: #7C3AED;
          background: #F3E8FF;
          padding: 2px 8px;
          border-radius: 12px;
          align-self: flex-start;
        }
        .enrolled-course-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--navy-900);
          line-height: 1.35;
        }
        .enrolled-course-sub {
          font-size: 0.78rem;
          color: var(--slate-500);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .enrolled-instructor { font-size: 0.75rem; color: var(--slate-500); }
        .enrolled-rating-row {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 4px;
        }
        .enrolled-rating-num { font-size: 0.78rem; font-weight: 800; color: var(--navy-900); }
        .enrolled-rating-count { font-size: 0.72rem; color: var(--slate-400); }
        .enrolled-level-pill {
          font-size: 0.68rem;
          color: var(--slate-500);
          background: var(--slate-100);
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: auto;
        }
        .enrolled-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 10px;
          border-top: 1px solid var(--slate-100);
          flex-wrap: wrap;
          gap: 8px;
        }
        .enrolled-date { font-size: 0.72rem; color: var(--slate-400); }
        .btn-continue-course {
          padding: 7px 14px;
          border-radius: 8px;
          background: #7C3AED;
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .btn-continue-course:hover { background: #6D28D9; }
      `}</style>
    </div>
  );
};
