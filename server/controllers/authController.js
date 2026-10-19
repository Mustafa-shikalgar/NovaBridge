const User = require('../models/User');

// Demo credentials map (matches frontend authService.ts)
const DEMO_USERS = {
  'student@novabridge.demo': {
    password: 'student123',
    name: 'Jatin Vishwakarma',
    role: 'student',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    targetRole: 'Full Stack Developer',
    institution: 'Indian Institute of Technology (IIT), Bombay',
  },
  'recruiter@novabridge.demo': {
    password: 'recruiter123',
    name: 'Sarah Jenkins',
    role: 'recruiter',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    company: 'Uber Infrastructure & Tech Talent Acquisition',
  },
  'admin@novabridge.demo': {
    password: 'admin123',
    name: 'NovaBridge System Admin',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
};

/**
 * POST /api/auth/login
 * Validates credentials, ensures user exists in DB, returns token + user info
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const demoUser = DEMO_USERS[cleanEmail];

    // Check credentials
    if (!demoUser || demoUser.password !== password) {
      // Try DB lookup for registered users
      const dbUser = await User.findOne({ email: cleanEmail });
      if (!dbUser || dbUser.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
      // DB user found
      const token = `token_${dbUser.role}_${Date.now()}`;
      return res.json({
        success: true,
        data: {
          token,
          user: {
            id: dbUser._id.toString(),
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role,
            avatarUrl: dbUser.avatarUrl || '',
          }
        }
      });
    }

    // Demo user — find or create in DB
    let dbUser = await User.findOne({ email: cleanEmail });
    if (!dbUser) {
      dbUser = await User.create({
        name: demoUser.name,
        email: cleanEmail,
        password: demoUser.password,
        role: demoUser.role,
      });
      console.log('Auto-created demo user in DB:', cleanEmail);
    }

    // Generate token (same format auth middleware recognizes)
    const token = `token_${demoUser.role}_${Date.now()}`;

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: dbUser._id.toString(),
          name: demoUser.name,
          email: cleanEmail,
          role: demoUser.role,
          avatarUrl: demoUser.avatarUrl,
          targetRole: demoUser.targetRole,
          institution: demoUser.institution,
          company: demoUser.company,
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
};

/**
 * POST /api/auth/register
 * Register a new student account
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role = 'student' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    const existing = await User.findOne({ email: email.trim().toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists' });
    }

    const user = await User.create({
      name,
      email: email.trim().toLowerCase(),
      password,
      role,
    });

    const token = `token_${role}_${Date.now()}`;

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          avatarUrl: '',
        }
      }
    });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
  }
};
