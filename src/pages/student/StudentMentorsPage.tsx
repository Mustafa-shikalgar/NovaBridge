import React, { useState } from 'react';
import { UserProfile } from '../../types/profile';
import { AuthUser } from '../../services/authService';
import { 
  Users, 
  Search, 
  Calendar, 
  Clock, 
  Star, 
  Briefcase, 
  Building2, 
  GraduationCap, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  X,
  Send,
  Video
} from 'lucide-react';

interface StudentMentorsPageProps {
  profile: UserProfile;
  user: AuthUser;
  onNavigate: (route: string) => void;
}

export interface MentorItem {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  companyBg: string;
  almaMater: string;
  rating: number;
  sessionsCount: number;
  expertise: string[];
  nextSlot: string;
  hourlyRate: string;
  bio: string;
}

const DEMO_MENTORS: MentorItem[] = [
  {
    id: 'm_1',
    name: 'Devon Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    role: 'Staff Software Engineer (L6)',
    company: 'Uber Infrastructure',
    companyBg: '#0F172A',
    almaMater: 'IIT Bombay (\'18)',
    rating: 4.97,
    sessionsCount: 54,
    expertise: ['Distributed Systems', 'Go', 'System Design', 'Concurrency'],
    nextSlot: 'Tomorrow at 6:30 PM',
    hourlyRate: 'Free for NovaBridge Scholars',
    bio: 'Leads edge routing and gateway infrastructure. Conducted 120+ bar-raiser engineering interviews at Uber.'
  },
  {
    id: 'm_2',
    name: 'Priya Nair',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    role: 'Principal Systems Architect',
    company: 'Google Cloud Platform',
    companyBg: '#2563EB',
    almaMater: 'IISc Bangalore (\'16)',
    rating: 4.99,
    sessionsCount: 82,
    expertise: ['Cloud Architecture', 'Kubernetes', 'High-Availability', 'C++'],
    nextSlot: 'Friday at 7:00 PM',
    hourlyRate: 'Free for NovaBridge Scholars',
    bio: 'Built multi-region VPC and network topology services. Mentored 30+ students into top tier product engineering roles.'
  },
  {
    id: 'm_3',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    role: 'Lead Payment Core Engineer',
    company: 'Stripe',
    companyBg: '#6366F1',
    almaMater: 'Stanford University (\'19)',
    rating: 4.95,
    sessionsCount: 39,
    expertise: ['Fintech Scaling', 'PostgreSQL', 'API Design', 'Idempotency'],
    nextSlot: 'Saturday at 5:00 PM',
    hourlyRate: 'Free for NovaBridge Scholars',
    bio: 'Designs transaction consistency and ledger systems processing billions daily. Specializes in backend system design rounds.'
  },
  {
    id: 'm_4',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    role: 'Senior Machine Learning Scientist',
    company: 'Meta FAIR',
    companyBg: '#059669',
    almaMater: 'CMU (\'20)',
    rating: 4.98,
    sessionsCount: 46,
    expertise: ['PyTorch', 'LLM Fine-Tuning', 'MLOps', 'Vector Search'],
    nextSlot: 'Sunday at 4:30 PM',
    hourlyRate: 'Free for NovaBridge Scholars',
    bio: 'Focuses on production inference latency and parameter-efficient tuning. Helps students craft top ML research & engineering resumes.'
  }
];

export const StudentMentorsPage: React.FC<StudentMentorsPageProps> = ({
  profile,
  user,
  onNavigate
}) => {
  const [mentors, setMentors] = useState<MentorItem[]>(DEMO_MENTORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('All');
  const [bookingMentor, setBookingMentor] = useState<MentorItem | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('Tomorrow, 6:30 PM - 7:15 PM');
  const [selectedTopic, setSelectedTopic] = useState('System Design Mock Interview');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filteredMentors = mentors.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesExpertise = selectedExpertise === 'All' || m.expertise.includes(selectedExpertise);
    return matchesSearch && matchesExpertise;
  });

  const handleConfirmBooking = () => {
    if (!bookingMentor) return;
    const name = bookingMentor.name;
    setBookingMentor(null);
    showToast(`1:1 Mentorship Session scheduled with ${name}! Check your email for calendar invite.`);
  };

  return (
    <div className="student-page-container">
      {/* Toast Notification */}
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
              <Users size={14} style={{ color: '#2563EB' }} />
              <span>Verified Tech Advisory</span>
            </div>
            <h1 className="page-main-heading">Industry Mentors & Advisory</h1>
            <p className="page-sub-heading">Connect 1-on-1 with senior engineers from Uber, Google, Stripe, and Meta for mock interviews, portfolio reviews, and architecture guidance.</p>
          </div>

          <div className="mentor-metrics-box">
            <span className="mentor-badge-kpi">4.97 ★ Avg. Rating</span>
            <span className="mentor-sub-kpi">Over 220+ verified sessions</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Pills */}
      <div className="search-filter-controls-row">
        <div className="search-input-wrap">
          <Search size={16} className="search-icon-pos" />
          <input 
            type="text" 
            placeholder="Search mentors by name, company, or technical domain..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
            className="mentor-search-input" 
          />
        </div>

        <div className="expertise-filter-pills">
          {['All', 'Distributed Systems', 'System Design', 'Kubernetes', 'PyTorch', 'Fintech Scaling', 'PostgreSQL'].map(exp => (
            <button
              key={exp}
              onClick={() => setSelectedExpertise(exp)}
              className={`exp-pill-btn ${selectedExpertise === exp ? 'active' : ''}`}
            >
              {exp}
            </button>
          ))}
        </div>
      </div>

      {/* Mentors Cards Grid */}
      <div className="mentors-cards-grid">
        {filteredMentors.map(mentor => (
          <div key={mentor.id} className="mentor-card-item">
            <div className="mentor-top-row">
              <img src={mentor.avatar} alt={mentor.name} className="mentor-avatar" />
              <div className="mentor-identity-col">
                <div className="mentor-name-flex">
                  <h3 className="mentor-name-text">{mentor.name}</h3>
                  <div className="mentor-rating-tag">
                    <Star size={12} fill="#F59E0B" color="#F59E0B" />
                    <span>{mentor.rating} ({mentor.sessionsCount})</span>
                  </div>
                </div>

                <div className="mentor-role-text">{mentor.role}</div>
                <div className="mentor-comp-text">
                  <Building2 size={13} style={{ color: '#2563EB' }} />
                  <span>{mentor.company}</span> • <span>{mentor.almaMater}</span>
                </div>
              </div>
            </div>

            <p className="mentor-bio-text">{mentor.bio}</p>

            <div className="mentor-skills-wrap">
              {mentor.expertise.map(exp => (
                <span key={exp} className="mentor-expertise-chip">{exp}</span>
              ))}
            </div>

            <div className="mentor-slot-row">
              <div className="slot-info">
                <Clock size={13} className="text-slate-400" />
                <span>Next slot: <strong>{mentor.nextSlot}</strong></span>
              </div>
              <span className="rate-badge">{mentor.hourlyRate}</span>
            </div>

            <div className="mentor-card-actions">
              <button 
                onClick={() => setBookingMentor(mentor)} 
                className="btn-book-advisory"
              >
                <Calendar size={14} /> Book Advisory Call
              </button>
              <button 
                onClick={() => onNavigate('/student/messages')} 
                className="btn-msg-mentor"
                title="Message Mentor"
              >
                <MessageSquare size={14} /> Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BOOKING MODAL */}
      {bookingMentor && (
        <div className="modal-backdrop-overlay" onClick={() => setBookingMentor(null)}>
          <div className="booking-modal-box" onClick={e => e.stopPropagation()}>
            <div className="booking-modal-header">
              <div className="mentor-modal-profile">
                <img src={bookingMentor.avatar} alt={bookingMentor.name} className="modal-avatar-thumb" />
                <div>
                  <h3 className="modal-mentor-title">Schedule Advisory Call with {bookingMentor.name}</h3>
                  <div className="modal-mentor-subtitle">{bookingMentor.role} • {bookingMentor.company}</div>
                </div>
              </div>
              <button onClick={() => setBookingMentor(null)} className="modal-close-icon"><X size={18} /></button>
            </div>

            <div className="modal-body-form">
              <div className="form-group-item">
                <label className="field-lbl">Session Topic & Focus</label>
                <select 
                  value={selectedTopic} 
                  onChange={e => setSelectedTopic(e.target.value)}
                  className="modal-select-input"
                >
                  <option value="System Design Mock Interview">System Design Mock Interview (45 mins)</option>
                  <option value="Resume & Portfolio Deep-Dive">Resume & Portfolio Deep-Dive (30 mins)</option>
                  <option value="Competitive Programming Strategy">Competitive Programming & FAANG Strategy (45 mins)</option>
                  <option value="Career Transition & Offer Evaluation">Career Advisory & Tech Offer Evaluation (30 mins)</option>
                </select>
              </div>

              <div className="form-group-item">
                <label className="field-lbl">Available Calendar Slot</label>
                <div className="slot-picker-options">
                  {[
                    'Tomorrow, 6:30 PM - 7:15 PM',
                    'Friday, 7:00 PM - 7:45 PM',
                    'Saturday, 5:00 PM - 5:45 PM',
                    'Sunday, 11:00 AM - 11:45 AM'
                  ].map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`slot-choice-pill ${selectedSlot === slot ? 'active' : ''}`}
                    >
                      <Video size={13} /> {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group-item">
                <label className="field-lbl">Preparation Notes / Questions</label>
                <textarea 
                  rows={3} 
                  placeholder="Share details about what you want to cover or link your GitHub repo / case study..." 
                  className="modal-text-area"
                />
              </div>

              <div className="booking-modal-footer">
                <button onClick={() => setBookingMentor(null)} className="btn-cancel-modal">Cancel</button>
                <button onClick={handleConfirmBooking} className="btn-confirm-booking">
                  <CheckCircle2 size={15} /> Confirm Video Session (Free)
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
          line-height: 1.5;
        }

        .mentor-metrics-box {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 12px;
          padding: 10px 18px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .mentor-badge-kpi {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: #D97706;
        }
        .mentor-sub-kpi {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--slate-500);
          margin-top: 2px;
        }

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
        .mentor-search-input {
          width: 100%;
          padding: 11px 14px 11px 40px;
          border: 1.5px solid var(--slate-200);
          border-radius: 12px;
          font-size: 0.88rem;
          color: var(--navy-900);
          outline: none;
          background: #FFFFFF;
        }
        .mentor-search-input:focus {
          border-color: #2563EB;
        }

        .expertise-filter-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .exp-pill-btn {
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
        .exp-pill-btn.active {
          background: var(--navy-900);
          color: #FFFFFF;
          border-color: var(--navy-900);
        }

        .mentors-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 20px;
        }

        .mentor-card-item {
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
        .mentor-card-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(15,23,42,0.08);
        }

        .mentor-top-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .mentor-avatar {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--slate-200);
          flex-shrink: 0;
        }
        .mentor-identity-col {
          flex: 1;
        }
        .mentor-name-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .mentor-name-text {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .mentor-rating-tag {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 800;
          color: #92400E;
          background: #FEF3C7;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .mentor-role-text {
          font-size: 0.8125rem;
          font-weight: 700;
          color: #2563EB;
          margin-top: 2px;
        }
        .mentor-comp-text {
          font-size: 0.75rem;
          color: var(--slate-500);
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .mentor-bio-text {
          font-size: 0.8125rem;
          color: var(--slate-600);
          line-height: 1.45;
        }

        .mentor-skills-wrap {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .mentor-expertise-chip {
          font-size: 0.72rem;
          font-weight: 700;
          color: #1E40AF;
          background: #EFF6FF;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .mentor-slot-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--slate-50);
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.75rem;
        }
        .slot-info {
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--slate-600);
        }
        .slot-info strong {
          color: var(--navy-900);
        }
        .rate-badge {
          font-weight: 800;
          color: #065F46;
          background: #D1FAE5;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.72rem;
        }

        .mentor-card-actions {
          display: flex;
          gap: 10px;
          margin-top: auto;
          padding-top: 10px;
          border-top: 1px solid var(--slate-100);
        }
        .btn-book-advisory {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 14px;
          border-radius: 8px;
          background: var(--codolio-orange);
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }
        .btn-book-advisory:hover {
          background: var(--codolio-orange-hover);
        }
        .btn-msg-mentor {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 14px;
          border-radius: 8px;
          border: 1px solid var(--slate-200);
          background: var(--slate-50);
          color: var(--navy-900);
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-msg-mentor:hover {
          background: var(--slate-100);
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
        .booking-modal-box {
          background: #FFFFFF;
          border-radius: 18px;
          width: 100%;
          max-width: 560px;
          box-shadow: 0 24px 60px rgba(15,23,42,0.25);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .booking-modal-header {
          padding: 18px 24px;
          border-bottom: 1px solid var(--slate-200);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .mentor-modal-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .modal-avatar-thumb {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
        }
        .modal-mentor-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .modal-mentor-subtitle {
          font-size: 0.78rem;
          color: var(--slate-500);
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

        .modal-body-form {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-group-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .field-lbl {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--navy-900);
        }
        .modal-select-input, .modal-text-area {
          width: 100%;
          padding: 10px 12px;
          border: 1.5px solid var(--slate-200);
          border-radius: 10px;
          font-size: 0.85rem;
          color: var(--navy-900);
          outline: none;
        }
        .modal-select-input:focus, .modal-text-area:focus {
          border-color: #2563EB;
        }

        .slot-picker-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .slot-choice-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border-radius: 8px;
          border: 1px solid var(--slate-200);
          background: var(--slate-50);
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--slate-700);
          cursor: pointer;
          text-align: left;
        }
        .slot-choice-pill.active {
          border-color: #2563EB;
          background: #EFF6FF;
          color: #1D4ED8;
        }

        .booking-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 10px;
          padding-top: 14px;
          border-top: 1px solid var(--slate-100);
        }
        .btn-cancel-modal {
          padding: 9px 16px;
          border-radius: 8px;
          border: 1px solid var(--slate-200);
          background: var(--slate-100);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--slate-600);
          cursor: pointer;
        }
        .btn-confirm-booking {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: 8px;
          background: var(--codolio-orange);
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }
        .btn-confirm-booking:hover {
          background: var(--codolio-orange-hover);
        }
      `}</style>
    </div>
  );
};
