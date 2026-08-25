const User = require('../models/User');
const Payment = require('../models/Payment');
const Course = require('../models/Course');

// Static course details (matches CourseStorePage.tsx initialStoreCourses)
const COURSE_META = {
  sc1: {
    title: 'Mastering QuickBooks Online & Financial Bookkeeping',
    subtitle: 'Become An Expert QuickBooks Online And Learn How To Keep An Accurate Set Of Books',
    instructor: 'Mark Smolen',
    badge: 'Bestseller',
    rating: 4.6,
    ratingCount: 14967,
    level: 'All levels',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    category: 'Money Management Tools',
  },
  sc2: {
    title: 'SAP FICO (Financial Accounting & Management Accounting)',
    subtitle: 'The course covers both configuration and end-user financial statement workflows',
    instructor: 'Rana W Mehmood',
    badge: 'Premium',
    rating: 4.3,
    ratingCount: 13222,
    level: 'All levels',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    category: 'Money Management Tools',
  },
  sc3: {
    title: 'QuickBooks Online Complex Issues And Advanced Techniques',
    subtitle: 'How To Prove An Entire Set Of QuickBooks Online Records Are Clean & Audit Ready',
    instructor: 'Mark Smolen',
    badge: 'Premium',
    rating: 4.7,
    ratingCount: 900,
    level: 'All levels',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    category: 'Money Management Tools',
  },
  sc4: {
    title: 'Excel Crash Course: Master Excel for Financial Analysis',
    subtitle: 'Beginner to Advanced: Learn Excel Shortcuts, Formulas & Functions for Wall Street',
    instructor: 'Scott Powell',
    badge: 'Premium',
    rating: 4.6,
    ratingCount: 17539,
    level: 'All levels',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    category: 'Money Management Tools',
  },
  sc5: {
    title: 'Distributed System Design & High-Throughput Microservices',
    subtitle: 'Master Raft Consensus, gRPC, Redis Streams, Kafka Partitions & Scale to 1M req/sec',
    instructor: 'Prof. Robert Morris (MIT)',
    badge: 'Bestseller',
    rating: 4.9,
    ratingCount: 24800,
    level: 'Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    category: 'System Design & Engineering',
  },
  sc6: {
    title: 'Competitive Programming Masterclass (Codeforces Candidate Master)',
    subtitle: 'Advanced Graph Algorithms, Dynamic Programming, Segment Trees & Math for CP',
    instructor: 'Jatin Vishwakarma (IITB)',
    badge: 'Premium',
    rating: 4.8,
    ratingCount: 8920,
    level: 'Intermediate - Expert',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    category: 'Algorithms & Coding',
  },
};

/**
 * GET /api/users/me
 */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/users/me/courses
 * Returns all courses the logged-in user has purchased, with full metadata
 */
exports.getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('purchasedCourses');

    const enrolledCourses = (user.purchasedCourses || []).map((course) => {
      const meta = COURSE_META[course.customId] || {};
      return {
        id: course._id.toString(),
        customId: course.customId,
        title: meta.title || course.title,
        subtitle: meta.subtitle || '',
        instructor: meta.instructor || course.instructor,
        badge: meta.badge || 'Featured',
        rating: meta.rating || 4.5,
        ratingCount: meta.ratingCount || 0,
        level: meta.level || 'All levels',
        imageUrl: meta.imageUrl || '',
        category: meta.category || 'General',
        enrolledAt: course.createdAt,
      };
    });

    // Also get payment records for enrollment dates
    const payments = await Payment.find({ user: req.user._id, status: 'captured' })
      .populate('order')
      .sort({ createdAt: -1 });

    // Build a map of courseId -> payment date
    const paymentDateMap = {};
    for (const payment of payments) {
      if (payment.order && payment.order.course) {
        const courseId = payment.order.course.toString();
        if (!paymentDateMap[courseId]) {
          paymentDateMap[courseId] = payment.createdAt;
        }
      }
    }

    // Enrich with payment date
    const enriched = enrolledCourses.map((c) => ({
      ...c,
      purchasedAt: paymentDateMap[c.id] || null,
    }));

    res.json({
      success: true,
      data: {
        courses: enriched,
        totalEnrolled: enriched.length,
        enrolledIds: (user.purchasedCourses || []).map((c) => c.customId),
      },
    });
  } catch (error) {
    console.error('getMyCourses error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
