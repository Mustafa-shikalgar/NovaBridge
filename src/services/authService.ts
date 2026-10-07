export type UserRole = 'student' | 'recruiter' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  targetRole?: string;
  institution?: string;
  company?: string;
  skills?: string[];
  niche?: string;
}

export interface AuthSession {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
}

const STORAGE_KEY = 'novabridge_auth_session';

export const DEMO_CREDENTIALS = {
  student: {
    email: 'student@novabridge.demo',
    password: 'student123',
    user: {
      id: 'demo_std_1',
      name: 'Jatin Vishwakarma',
      email: 'student@novabridge.demo',
      role: 'student' as UserRole,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      targetRole: 'Full Stack Developer',
      institution: 'Indian Institute of Technology (IIT), Bombay',
      skills: ['TypeScript', 'React.js', 'Go', 'C++', 'Node.js'],
      niche: 'Software Development'
    }
  },
  recruiter: {
    email: 'recruiter@novabridge.demo',
    password: 'recruiter123',
    user: {
      id: 'demo_rec_1',
      name: 'Sarah Jenkins',
      email: 'recruiter@novabridge.demo',
      role: 'recruiter' as UserRole,
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      company: 'Uber Infrastructure & Tech Talent Acquisition'
    }
  },
  admin: {
    email: 'admin@novabridge.demo',
    password: 'admin123',
    user: {
      id: 'demo_adm_1',
      name: 'NovaBridge System Admin',
      email: 'admin@novabridge.demo',
      role: 'admin' as UserRole,
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
    }
  }
};

export const getStoredSession = (): AuthSession => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.isAuthenticated && parsed.user) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored auth session:', e);
  }
  // Default to student demo session if none set, or null
  return {
    isAuthenticated: true,
    user: DEMO_CREDENTIALS.student.user,
    token: 'demo_session_token_std'
  };
};

export const saveSession = (session: AuthSession): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (e) {
    console.error('Error saving auth session:', e);
  }
};

export const clearSession = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing auth session:', e);
  }
};

export const authenticateUser = (
  email: string,
  pass: string,
  expectedRole: UserRole
): { success: boolean; session?: AuthSession; message?: string } => {
  const cleanEmail = email.trim().toLowerCase();

  // Check demo accounts
  for (const key of Object.keys(DEMO_CREDENTIALS) as UserRole[]) {
    const cred = DEMO_CREDENTIALS[key];
    if (cred.email.toLowerCase() === cleanEmail && cred.password === pass) {
      if (cred.user.role !== expectedRole) {
        return {
          success: false,
          message: `This account has the '${cred.user.role}' role. Please sign in at the /${cred.user.role}/login portal.`
        };
      }
      const newSession: AuthSession = {
        isAuthenticated: true,
        user: cred.user,
        token: `token_${cred.user.role}_${Date.now()}`
      };
      saveSession(newSession);
      return { success: true, session: newSession };
    }
  }

  // Fallback for custom logins
  if (cleanEmail && pass.length >= 4) {
    const newUser: AuthUser = {
      id: `usr_${Date.now()}`,
      name: cleanEmail.split('@')[0].replace('.', ' ').toUpperCase(),
      email: cleanEmail,
      role: expectedRole,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      targetRole: expectedRole === 'student' ? 'Full Stack Developer' : undefined,
      niche: expectedRole === 'student' ? 'Software Development' : undefined
    };
    const newSession: AuthSession = {
      isAuthenticated: true,
      user: newUser,
      token: `token_${expectedRole}_${Date.now()}`
    };
    saveSession(newSession);
    return { success: true, session: newSession };
  }

  return { success: false, message: 'Invalid credentials. Use demo accounts or enter valid email/password.' };
};
