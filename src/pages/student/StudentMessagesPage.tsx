import React, { useState } from 'react';
import { UserProfile } from '../../types/profile';
import { AuthUser } from '../../services/authService';
import { 
  MessageSquare, 
  Search, 
  Send, 
  Paperclip, 
  CheckCheck, 
  Building2, 
  Calendar, 
  User, 
  Phone, 
  Video, 
  MoreVertical,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

interface StudentMessagesPageProps {
  profile: UserProfile;
  user: AuthUser;
  onNavigate: (route: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

interface ConversationThread {
  id: string;
  partnerName: string;
  partnerAvatar: string;
  partnerRole: string;
  partnerCompany: string;
  type: 'Recruiter' | 'Mentor';
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  online: boolean;
  messages: ChatMessage[];
}

const DEMO_CONVERSATIONS: ConversationThread[] = [
  {
    id: 'conv_1',
    partnerName: 'Sarah Jenkins',
    partnerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    partnerRole: 'Tech Talent Acquisition Lead',
    partnerCompany: 'Uber Infrastructure',
    type: 'Recruiter',
    unreadCount: 1,
    lastMessage: 'Your distributed systems case study looks remarkable. Would you be open for an initial technical screen this Thursday?',
    lastMessageTime: '10:42 AM',
    online: true,
    messages: [
      { id: 'm1', sender: 'them', text: 'Hi Jatin! I came across your verified NovaBridge profile and your Codeforces rating of 1891.', time: '10:30 AM' },
      { id: 'm2', sender: 'them', text: 'Our Distributed Systems and Edge Routing team in Bengaluru is actively looking for high-ownership software engineers.', time: '10:32 AM' },
      { id: 'm3', sender: 'me', text: 'Hello Sarah! Thank you for reaching out. Yes, I have spent significant time working on high-throughput microservices in Go and Redis.', time: '10:38 AM' },
      { id: 'm4', sender: 'them', text: 'Your distributed systems case study looks remarkable. Would you be open for an initial technical screen this Thursday?', time: '10:42 AM' }
    ]
  },
  {
    id: 'conv_2',
    partnerName: 'Devon Vance',
    partnerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    partnerRole: 'Staff Software Engineer (L6)',
    partnerCompany: 'Uber Infrastructure',
    type: 'Mentor',
    unreadCount: 0,
    lastMessage: 'I reviewed your database indexing query plan. Left a few comments on your repository.',
    lastMessageTime: 'Yesterday',
    online: false,
    messages: [
      { id: 'm21', sender: 'me', text: 'Hi Devon, thanks for the advisory session on Monday! Could you review the query optimization on table partition?', time: 'Yesterday 3:15 PM' },
      { id: 'm22', sender: 'them', text: 'I reviewed your database indexing query plan. Left a few comments on your repository.', time: 'Yesterday 4:20 PM' }
    ]
  },
  {
    id: 'conv_3',
    partnerName: 'Rohit Gupta',
    partnerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    partnerRole: 'University Engineering Recruiter',
    partnerCompany: 'Google Cloud Platform',
    type: 'Recruiter',
    unreadCount: 0,
    lastMessage: 'Application received for the Backend Specialist track. Coding challenge link sent.',
    lastMessageTime: 'Aug 22',
    online: true,
    messages: [
      { id: 'm31', sender: 'them', text: 'Application received for the Backend Specialist track. Coding challenge link sent.', time: 'Aug 22' }
    ]
  }
];

export const StudentMessagesPage: React.FC<StudentMessagesPageProps> = ({
  profile,
  user,
  onNavigate
}) => {
  const [conversations, setConversations] = useState<ConversationThread[]>(DEMO_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string>('conv_1');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'me',
      text: inputMessage.trim(),
      time: 'Just now'
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConvId) {
        return {
          ...conv,
          lastMessage: newMsg.text,
          lastMessageTime: 'Just now',
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    }));

    setInputMessage('');

    // Optional simulated reply after 1.5s
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `reply_${Date.now()}`,
        sender: 'them',
        text: 'Sounds great! I have noted that. Looking forward to our next interaction.',
        time: 'Just now'
      };
      setConversations(prev => prev.map(conv => {
        if (conv.id === activeConvId) {
          return {
            ...conv,
            lastMessage: replyMsg.text,
            lastMessageTime: 'Just now',
            messages: [...conv.messages, replyMsg]
          };
        }
        return conv;
      }));
    }, 1200);
  };

  const filteredConversations = conversations.filter(c => 
    c.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.partnerCompany.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="student-page-container">
      {/* Header Banner */}
      <div className="color-card color-card-navy">
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner flex-between-header">
          <div>
            <div className="tag-pill-navy">
              <MessageSquare size={14} style={{ color: '#2563EB' }} />
              <span>Direct Recruitment & Advisory Communications</span>
            </div>
            <h1 className="page-main-heading">Messages & Recruiter Inquiries</h1>
            <p className="page-sub-heading">Real-time conversations with verified technical recruiters and senior industry mentors.</p>
          </div>

          <div className="unread-total-badge">
            <span className="unread-number">1</span>
            <span className="unread-text">Unread Inquiry</span>
          </div>
        </div>
      </div>

      {/* Two-Pane Messenger Layout */}
      <div className="messenger-card-container">
        {/* Left Pane: Conversation Threads */}
        <div className="messenger-threads-pane">
          <div className="threads-search-wrap">
            <Search size={15} className="search-icon-pos" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              className="threads-search-input" 
            />
          </div>

          <div className="threads-list-scroll">
            {filteredConversations.map(conv => (
              <div 
                key={conv.id} 
                onClick={() => {
                  setActiveConvId(conv.id);
                  // Clear unread
                  setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unreadCount: 0 } : c));
                }}
                className={`thread-item-row ${activeConvId === conv.id ? 'active' : ''}`}
              >
                <div className="thread-avatar-wrapper">
                  <img src={conv.partnerAvatar} alt={conv.partnerName} className="thread-avatar-img" />
                  {conv.online && <span className="online-green-dot"></span>}
                </div>

                <div className="thread-info-col">
                  <div className="thread-title-line">
                    <span className="partner-name-text">{conv.partnerName}</span>
                    <span className="message-time-text">{conv.lastMessageTime}</span>
                  </div>

                  <div className="partner-company-tag">
                    <Building2 size={11} /> {conv.partnerCompany}
                  </div>

                  <p className="last-message-snippet">{conv.lastMessage}</p>
                </div>

                {conv.unreadCount > 0 && (
                  <span className="thread-unread-pill">{conv.unreadCount}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Pane: Active Chat Window */}
        <div className="messenger-active-chat-pane">
          {/* Active Chat Header */}
          <div className="chat-active-header">
            <div className="chat-header-profile">
              <div className="thread-avatar-wrapper">
                <img src={activeConv.partnerAvatar} alt={activeConv.partnerName} className="chat-header-avatar" />
                {activeConv.online && <span className="online-green-dot"></span>}
              </div>
              <div>
                <div className="chat-header-name-row">
                  <h3 className="chat-header-name">{activeConv.partnerName}</h3>
                  <span className={`chat-type-badge type-${activeConv.type.toLowerCase()}`}>
                    {activeConv.type}
                  </span>
                </div>
                <div className="chat-header-role">{activeConv.partnerRole} • {activeConv.partnerCompany}</div>
              </div>
            </div>

            <div className="chat-header-actions">
              <button onClick={() => onNavigate('/student/opportunities')} className="btn-chat-action">
                <Building2 size={14} /> View Jobs
              </button>
              <button onClick={() => alert('Launching Google Meet Video Call...')} className="btn-chat-action-primary">
                <Video size={14} /> Video Call
              </button>
            </div>
          </div>

          {/* Chat Messages List */}
          <div className="chat-messages-scroll-area">
            <div className="chat-encryption-notice">
              🔒 End-to-end encrypted direct recruiter communication channel
            </div>

            {activeConv.messages.map(msg => (
              <div key={msg.id} className={`chat-bubble-row ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                <div className="chat-bubble">
                  <p className="chat-text">{msg.text}</p>
                  <div className="chat-time-row">
                    <span>{msg.time}</span>
                    {msg.sender === 'me' && <CheckCheck size={13} style={{ color: '#2563EB' }} />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="chat-input-bar">
            <button type="button" onClick={() => alert('Attach resume or project case study file')} className="btn-chat-attach">
              <Paperclip size={18} />
            </button>
            <input 
              type="text" 
              placeholder={`Write your reply to ${activeConv.partnerName}...`} 
              value={inputMessage} 
              onChange={e => setInputMessage(e.target.value)} 
              className="chat-text-input" 
            />
            <button type="submit" disabled={!inputMessage.trim()} className="btn-chat-send">
              <Send size={16} />
              <span>Send</span>
            </button>
          </form>
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

        .unread-total-badge {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 12px;
          padding: 10px 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .unread-number {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: #2563EB;
          line-height: 1;
        }
        .unread-text {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--slate-500);
          margin-top: 4px;
        }

        /* Messenger Container */
        .messenger-card-container {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 16px;
          display: grid;
          grid-template-columns: 320px 1fr;
          height: 680px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(15,23,42,0.04);
        }

        .messenger-threads-pane {
          border-right: 1px solid var(--slate-200);
          display: flex;
          flex-direction: column;
          background: #F8FAFC;
        }

        .threads-search-wrap {
          padding: 14px;
          border-bottom: 1px solid var(--slate-200);
          position: relative;
          display: flex;
          align-items: center;
        }
        .threads-search-input {
          width: 100%;
          padding: 8px 12px 8px 34px;
          border: 1px solid var(--slate-200);
          border-radius: 8px;
          font-size: 0.8125rem;
          outline: none;
          background: #FFFFFF;
        }
        .threads-search-input:focus {
          border-color: #2563EB;
        }

        .threads-list-scroll {
          flex: 1;
          overflow-y: auto;
        }

        .thread-item-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px;
          border-bottom: 1px solid var(--slate-200);
          cursor: pointer;
          transition: background 0.15s ease;
          position: relative;
        }
        .thread-item-row:hover {
          background: #F1F5F9;
        }
        .thread-item-row.active {
          background: #FFFFFF;
          border-left: 4px solid #2563EB;
        }

        .thread-avatar-wrapper {
          position: relative;
          flex-shrink: 0;
        }
        .thread-avatar-img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
        }
        .online-green-dot {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10B981;
          border: 2px solid #FFFFFF;
        }

        .thread-info-col {
          flex: 1;
          min-width: 0;
        }
        .thread-title-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .partner-name-text {
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .message-time-text {
          font-size: 0.7rem;
          color: var(--slate-400);
        }

        .partner-company-tag {
          font-size: 0.72rem;
          color: #2563EB;
          font-weight: 700;
          margin-top: 2px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .last-message-snippet {
          font-size: 0.78rem;
          color: var(--slate-500);
          margin-top: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .thread-unread-pill {
          background: #2563EB;
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 10px;
          align-self: center;
        }

        /* Active Chat Pane */
        .messenger-active-chat-pane {
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
        }

        .chat-active-header {
          padding: 14px 20px;
          border-bottom: 1px solid var(--slate-200);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .chat-header-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .chat-header-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
        }
        .chat-header-name-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .chat-header-name {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .chat-type-badge {
          font-size: 0.68rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .type-recruiter { background: #EFF6FF; color: #1D4ED8; }
        .type-mentor { background: #FFF7ED; color: #C2410C; }

        .chat-header-role {
          font-size: 0.75rem;
          color: var(--slate-500);
          margin-top: 2px;
        }

        .chat-header-actions {
          display: flex;
          gap: 8px;
        }
        .btn-chat-action {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 7px 12px;
          border-radius: 8px;
          border: 1px solid var(--slate-200);
          background: var(--slate-50);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--slate-700);
          cursor: pointer;
        }
        .btn-chat-action-primary {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 7px 14px;
          border-radius: 8px;
          background: #2563EB;
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }

        .chat-messages-scroll-area {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
          background: #F8FAFC;
        }

        .chat-encryption-notice {
          text-align: center;
          font-size: 0.72rem;
          color: var(--slate-400);
          margin-bottom: 10px;
        }

        .chat-bubble-row {
          display: flex;
        }
        .chat-bubble-row.sent {
          justify-content: flex-end;
        }
        .chat-bubble-row.received {
          justify-content: flex-start;
        }

        .chat-bubble {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 14px;
          box-shadow: 0 1px 4px rgba(15,23,42,0.04);
        }
        .chat-bubble-row.sent .chat-bubble {
          background: #2563EB;
          color: #FFFFFF;
          border-bottom-right-radius: 3px;
        }
        .chat-bubble-row.received .chat-bubble {
          background: #FFFFFF;
          color: var(--navy-900);
          border: 1px solid var(--slate-200);
          border-bottom-left-radius: 3px;
        }

        .chat-text {
          font-size: 0.85rem;
          line-height: 1.45;
        }

        .chat-time-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
          font-size: 0.68rem;
          margin-top: 6px;
          opacity: 0.85;
        }

        .chat-input-bar {
          padding: 14px 20px;
          border-top: 1px solid var(--slate-200);
          display: flex;
          align-items: center;
          gap: 10px;
          background: #FFFFFF;
        }
        .btn-chat-attach {
          background: none;
          border: none;
          color: var(--slate-400);
          cursor: pointer;
        }
        .btn-chat-attach:hover {
          color: var(--navy-900);
        }

        .chat-text-input {
          flex: 1;
          padding: 10px 14px;
          border: 1.5px solid var(--slate-200);
          border-radius: 10px;
          font-size: 0.85rem;
          color: var(--navy-900);
          outline: none;
        }
        .chat-text-input:focus {
          border-color: #2563EB;
        }

        .btn-chat-send {
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
        .btn-chat-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 850px) {
          .messenger-card-container {
            grid-template-columns: 1fr;
            height: auto;
          }
          .messenger-threads-pane {
            height: 250px;
          }
        }
      `}</style>
    </div>
  );
};
