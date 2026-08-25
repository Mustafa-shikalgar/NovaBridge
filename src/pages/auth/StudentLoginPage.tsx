import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2, User, KeyRound } from 'lucide-react';
import { authenticateUser, loginWithBackend, DEMO_CREDENTIALS, AuthSession } from '../../services/authService';

interface StudentLoginPageProps {
  onLoginSuccess: (session: AuthSession) => void;
  onNavigate: (route: string) => void;
}

export const StudentLoginPage: React.FC<StudentLoginPageProps> = ({
  onLoginSuccess,
  onNavigate
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // 1. Try real backend login first
    const backendRes = await loginWithBackend(email, password);
    if (backendRes.success && backendRes.session) {
      setLoading(false);
      onLoginSuccess(backendRes.session);
      onNavigate('/student/dashboard');
      return;
    }

    // 2. Fallback to local demo auth
    setTimeout(() => {
      const res = authenticateUser(email, password, 'student');
      setLoading(false);
      if (res.success && res.session) {
        onLoginSuccess(res.session);
        onNavigate('/student/dashboard');
      } else {
        setError(res.message || 'Invalid student credentials.');
      }
    }, 400);
  };

  const handleQuickDemoLogin = async () => {
    setEmail(DEMO_CREDENTIALS.student.email);
    setPassword(DEMO_CREDENTIALS.student.password);
    setLoading(true);
    // Try real backend first
    const backendRes = await loginWithBackend(DEMO_CREDENTIALS.student.email, DEMO_CREDENTIALS.student.password);
    setLoading(false);
    if (backendRes.success && backendRes.session) {
      onLoginSuccess(backendRes.session);
      onNavigate('/student/dashboard');
      return;
    }
    // Fallback
    const res = authenticateUser(DEMO_CREDENTIALS.student.email, DEMO_CREDENTIALS.student.password, 'student');
    if (res.success && res.session) {
      onLoginSuccess(res.session);
      onNavigate('/student/dashboard');
    }
  };

  return (
    <div className="auth-hero-container">
      <div className="auth-split-wrapper">
        {/* Left Feature Showcase Banner */}
        <div className="auth-feature-panel">
          <div className="brand-badge-top">
            <div className="logo-icon-orange">NB</div>
            <span className="brand-text">NovaBridge Student Portal</span>
          </div>

          <div className="feature-headline-group">
            <h1 className="feature-main-title">Build Your Verified Engineering Card Today</h1>
            <p className="feature-sub-title">Connect your GitHub, LeetCode, and Codeforces profiles to showcase verified coding skills, projects, and academic benchmarks to top recruiters.</p>
          </div>

          <div className="feature-perks-list">
            <div className="perk-item">
              <ShieldCheck size={20} className="perk-icon" />
              <div>
                <div className="perk-title">Cryptographically Verified Proofs</div>
                <div className="perk-desc">Live REST sync directly from competitive coding platforms.</div>
              </div>
            </div>
            <div className="perk-item">
              <User size={20} className="perk-icon" />
              <div>
                <div className="perk-title">Personalized Career Intelligence</div>
                <div className="perk-desc">Niche-based course recommendations and readiness tracking.</div>
              </div>
            </div>
          </div>

          <div className="demo-credentials-card">
            <div className="demo-card-header">
              <KeyRound size={15} style={{ color: '#F97316' }} />
              <span>Demo Student Login Credentials</span>
            </div>
            <div className="demo-credential-row">
              <span>Email:</span> <code>student@novabridge.demo</code>
            </div>
            <div className="demo-credential-row">
              <span>Password:</span> <code>student123</code>
            </div>
            <button type="button" onClick={handleQuickDemoLogin} className="btn-quick-demo">
              Fill & Login as Student
            </button>
          </div>
        </div>

        {/* Right Form Box */}
        <div className="auth-form-panel">
          <div className="auth-form-card">
            <div className="form-header-text">
              <h2 className="form-title">Welcome back to NovaBridge</h2>
              <p className="form-subtitle">Continue building your skills, portfolio and career.</p>
            </div>

            {error && (
              <div className="auth-error-banner">
                <span>{error}</span>
              </div>
            )}

            {/* Student Email Sign In Form */}
            <form onSubmit={handleSignIn} className="auth-form-elements">
              <div className="input-group-field">
                <label className="field-label">Student Email Address</label>
                <div className="input-inner-wrap">
                  <Mail size={16} className="input-icon-left" />
                  <input 
                    type="email" 
                    placeholder="student@novabridge.demo" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                    className="styled-auth-input"
                  />
                </div>
              </div>

              <div className="input-group-field">
                <div className="label-with-link">
                  <label className="field-label">Password</label>
                  <a href="#" onClick={e => { e.preventDefault(); alert('Password reset link sent to student email.'); }} className="forgot-pass-link">Forgot Password</a>
                </div>
                <div className="input-inner-wrap">
                  <Lock size={16} className="input-icon-left" />
                  <input 
                    type="password" 
                    placeholder="••••••••••••" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    className="styled-auth-input"
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary-auth">
                <span>{loading ? 'Signing In...' : 'Sign In as Student'}</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="auth-action-links">
              <button type="button" onClick={() => onNavigate('/student/signup')} className="btn-secondary-link">
                Create Student Account
              </button>
            </div>

            <div className="auth-footer-prompt">
              Are you a recruiter?{' '}
              <button type="button" onClick={() => onNavigate('/recruiter/login')} className="link-switch-auth">
                Sign in here
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .auth-hero-container {
          min-height: calc(100vh - 70px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px 20px;
          background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
        }
        .auth-split-wrapper {
          display: grid;
          grid-template-columns: 1fr 480px;
          max-width: 1040px;
          width: 100%;
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid var(--slate-200);
          box-shadow: 0 20px 50px rgba(15,23,42,0.08);
          overflow: hidden;
        }

        .auth-feature-panel {
          background: linear-gradient(145deg, #0F172A 0%, #1E293B 100%);
          color: #FFFFFF;
          padding: 44px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .brand-badge-top { display: flex; align-items: center; gap: 10px; }
        .brand-text { font-family: var(--font-heading); font-size: 1.25rem; font-weight: 800; color: #FFFFFF; }
        .feature-headline-group { margin-top: 24px; }
        .feature-main-title { font-family: var(--font-heading); font-size: 1.75rem; font-weight: 800; line-height: 1.25; color: #FFFFFF; }
        .feature-sub-title { font-size: 0.88rem; color: #94A3B8; margin-top: 12px; line-height: 1.5; }

        .feature-perks-list { display: flex; flex-direction: column; gap: 18px; margin-top: 24px; }
        .perk-item { display: flex; align-items: flex-start; gap: 14px; }
        .perk-icon { color: var(--codolio-orange); flex-shrink: 0; margin-top: 2px; }
        .perk-title { font-weight: 700; font-size: 0.9rem; color: #F8FAFC; }
        .perk-desc { font-size: 0.8125rem; color: #94A3B8; margin-top: 2px; }

        .demo-credentials-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 14px;
          padding: 16px;
          margin-top: 28px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .demo-card-header {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.82rem; font-weight: 800; color: #F8FAFC; margin-bottom: 4px;
        }
        .demo-credential-row {
          font-size: 0.78rem; color: #CBD5E1; display: flex; justify-content: space-between; align-items: center;
        }
        .demo-credential-row code {
          background: rgba(0,0,0,0.3); padding: 2px 8px; border-radius: 6px; color: #F97316; font-weight: 700;
        }
        .btn-quick-demo {
          margin-top: 10px; padding: 8px 12px; border-radius: 8px;
          background: #F97316; color: #FFFFFF; font-size: 0.78rem; font-weight: 800; border: none; cursor: pointer;
        }
        .btn-quick-demo:hover { background: #EA580C; }

        .auth-form-panel { padding: 44px 40px; display: flex; align-items: center; }
        .auth-form-card { width: 100%; display: flex; flex-direction: column; gap: 20px; }
        .form-header-text { text-align: left; }
        .form-title { font-family: var(--font-heading); font-size: 1.55rem; font-weight: 800; color: var(--navy-900); }
        .form-subtitle { font-size: 0.85rem; color: var(--slate-500); margin-top: 4px; }

        .auth-error-banner {
          background: #FEF2F2; border: 1px solid #FCA5A5; color: #991B1B;
          padding: 10px 14px; border-radius: 10px; font-size: 0.8125rem; font-weight: 700;
        }

        .auth-form-elements { display: flex; flex-direction: column; gap: 16px; }
        .input-group-field { display: flex; flex-direction: column; gap: 6px; }
        .label-with-link { display: flex; justify-content: space-between; align-items: center; }
        .field-label { font-size: 0.8125rem; font-weight: 700; color: var(--navy-900); }
        .forgot-pass-link { font-size: 0.78rem; font-weight: 700; color: var(--codolio-orange); text-decoration: none; }
        .input-inner-wrap { position: relative; display: flex; align-items: center; }
        .input-icon-left { position: absolute; left: 14px; color: var(--slate-400); }
        .styled-auth-input {
          width: 100%; padding: 11px 14px 11px 40px; border: 1.5px solid var(--slate-200);
          border-radius: 10px; font-size: 0.88rem; color: var(--navy-900); outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .styled-auth-input:focus { border-color: var(--codolio-orange); box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.15); }

        .btn-primary-auth {
          width: 100%; background: var(--codolio-orange); color: #FFFFFF;
          font-family: var(--font-heading); font-size: 0.92rem; font-weight: 800;
          padding: 12px 18px; border-radius: 12px; display: flex; align-items: center;
          justify-content: center; gap: 8px; margin-top: 8px; transition: background 0.15s ease;
        }
        .btn-primary-auth:hover { background: var(--codolio-orange-hover); }

        .auth-action-links { display: flex; justify-content: center; margin-top: -4px; }
        .btn-secondary-link {
          background: none; border: none; font-size: 0.82rem; font-weight: 700; color: var(--navy-900); cursor: pointer;
        }
        .btn-secondary-link:hover { text-decoration: underline; color: var(--codolio-orange); }

        .auth-footer-prompt { font-size: 0.82rem; color: var(--slate-500); text-align: center; }
        .link-switch-auth { font-weight: 800; color: var(--codolio-orange); background: none; border: none; padding: 0; cursor: pointer; }
        .link-switch-auth:hover { text-decoration: underline; }

        @media (max-width: 900px) {
          .auth-split-wrapper { grid-template-columns: 1fr; }
          .auth-feature-panel { display: none; }
        }
      `}</style>
    </div>
  );
};
