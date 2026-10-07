import { UserProfile } from '../types/profile';

export const initialProfileData: UserProfile = {
  id: 'usr_75284739',
  slug: 'jatin-vishwakarma',
  fullName: 'Jatin Vishwakarma',
  headline: 'Cloud-Native Backend Engineer | Competitive Programmer (Codeforces Candidate Master) | Building Scalable Systems',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  institution: 'Indian Institute of Technology (IIT), Bombay',
  degree: 'B.Tech in Computer Science & Engineering (\'26)',
  graduationYear: '2026',
  location: 'India',
  availability: 'Available Immediately',
  email: 'jatin.vishwakarma@iitb.ac.in',
  phone: '+91 98765 43210',
  about: `Cloud-Native Backend Engineer & High-Throughput Systems Specialist. Demonstrated track record of building production-grade software, publishing peer-reviewed AI research, winning international hackathons, and ranking in top competitive coding benchmarks globally. Driven by quantitative proof, clean engineering patterns, and shipping scalable solutions.`,
  
  handles: {
    github: 'jatinvishwakarma',
    leetcode: 'jatin_iitb',
    codeforces: 'jatin_v',
    codechef: 'jatin_chef',
    hackerrank: 'jatin_hr',
    codestudio: 'jatin_ninja',
    devfolio: 'jatinvishwakarma',
    linkedin: 'https://linkedin.com/in/jatin-vishwakarma',
    portfolio: 'https://jatinvishwakarma.dev'
  },

  linkedInStats: {
    url: 'https://linkedin.com/in/jatin-vishwakarma',
    followersCount: 2850,
    connectionsCount: 500,
    topSkillEndorsements: ['Distributed Systems', 'C++', 'System Design', 'React.js', 'Go (Golang)'],
    verified: true
  },

  codeChefStats: {
    handle: 'jatin_chef',
    rating: 1950,
    stars: '5★',
    globalRank: 890,
    contestsAttended: 57,
    verified: true
  },

  hackerRankStats: {
    handle: 'jatin_hr',
    badgesCount: 12,
    stars: 6,
    solvedCount: 18,
    verified: true
  },

  codeStudioStats: {
    handle: 'jatin_ninja',
    solvedCount: 420,
    rank: 'Ninja Master',
    verified: true
  },

  githubStats: {
    username: 'jatinvishwakarma',
    publicRepos: 34,
    stars: 890,
    followers: 245,
    following: 68,
    topLanguages: [
      { name: 'TypeScript', percentage: 42, color: '#3178C6' },
      { name: 'C++', percentage: 28, color: '#F34B7D' },
      { name: 'Python', percentage: 18, color: '#3572A5' },
      { name: 'Go', percentage: 8, color: '#00ADD8' },
      { name: 'Rust', percentage: 4, color: '#DEA584' }
    ],
    totalContributions: 1482,
    submissionsCount: 2208,
    maxStreak: 554,
    currentStreak: 554,
    activeDays: 758,
    lastSynced: '2 mins ago'
  },

  leetcodeStats: {
    username: 'jatin_iitb',
    totalSolved: 1829,
    easySolved: 525,
    mediumSolved: 1026,
    hardSolved: 278,
    ranking: 4812,
    acceptanceRate: 74.8,
    totalQuestions: 3888,
    contestsAttended: 5,
    lastSynced: '2 mins ago'
  },

  codeforcesStats: {
    handle: 'jatin_v',
    rating: 1891,
    maxRating: 1980,
    rank: 'Candidate Master',
    maxRank: 'Candidate Master',
    totalContests: 42,
    lastSynced: '2 mins ago'
  },

  skills: [
    { id: 's1', name: 'C++20 / STL', category: 'Languages', level: 'Expert', proofType: 'coding', proofTitle: 'Codeforces Candidate Master (1980 Rating)', verified: true },
    { id: 's2', name: 'Go (Golang)', category: 'Languages', level: 'Advanced', proofType: 'project', proofTitle: 'HyperStream Telemetry Engine', verified: true },
    { id: 's3', name: 'TypeScript', category: 'Languages', level: 'Expert', proofType: 'project', proofTitle: 'NovaBridge Platform Frontend', verified: true },
    { id: 's4', name: 'React.js / Next.js', category: 'Frontend', level: 'Expert', proofType: 'project', proofTitle: 'Production Portfolios & Apps', verified: true },
    { id: 's5', name: 'Distributed Systems Design', category: 'Backend', level: 'Advanced', proofType: 'certification', proofTitle: 'CKA Certified Kubernetes Admin', verified: true },
    { id: 's6', name: 'gRPC & Protocol Buffers', category: 'Backend', level: 'Advanced', proofType: 'project', proofTitle: 'HyperStream Microservices', verified: true },
    { id: 's7', name: 'PostgreSQL / Redis Streams', category: 'Database', level: 'Advanced', proofType: 'project', proofTitle: 'Uber Cache Daemon Internship', verified: true },
    { id: 's8', name: 'PyTorch / RAG Fine-Tuning', category: 'AI/ML', level: 'Intermediate', proofType: 'achievement', proofTitle: 'IEEE Peer-Reviewed RAG Publication', verified: true },
    { id: 's9', name: 'Docker / Kubernetes', category: 'Tools', level: 'Advanced', proofType: 'certification', proofTitle: 'CNCF CKA Certification', verified: true }
  ],

  projects: [
    {
      id: 'p1',
      title: 'NovaBridge: Student Professional Verification Platform',
      subtitle: 'Full-stack platform indexing live coding profiles & developer portfolios',
      description: 'Built a high-performance verification engine rendering live algorithmic stats, project case studies, and automated recruiter evaluations.',
      role: 'Lead Architect & Full-Stack Engineer',
      outcomes: [
        'Rendered dynamic profile cards under 200ms latency',
        'Integrated multi-platform REST APIs for GitHub, LeetCode, and Codeforces',
        'Verified proof items for over 20+ algorithmic achievements'
      ],
      techStack: ['TypeScript', 'React.js', 'Vite', 'CSS3', 'REST APIs', 'Node.js'],
      githubUrl: 'https://github.com/jatinvishwakarma/novabridge-profile',
      liveUrl: 'https://novabridge.dev',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      featured: true,
      caseStudy: {
        overview: 'NovaBridge solves candidate fraud in tech hiring by fetching live, unforgeable data from GitHub, LeetCode, and Codeforces.',
        problemStatement: 'Recruiters waste hundreds of hours filtering exaggerated resumes without verifiable proof of coding ability.',
        architecture: 'Client-side reactive state engine coupled with asynchronous API proxy fallbacks and cached local storage.',
        keyChallenges: [
          'Handling third-party rate limits from competitive programming platforms',
          'Computing real-time skill verification badges across dynamic submissions'
        ],
        solution: 'Built an elastic fallback caching layer with background periodic sync workers.',
        metrics: [
          { label: 'Profile Load Time', value: '180 ms' },
          { label: 'API Resilience Rate', value: '99.9%' },
          { label: 'Verified Proof Items', value: '20+ Proofs' }
        ]
      }
    },
    {
      id: 'p2',
      title: 'HyperStream: High-Throughput gRPC Event Ingestion Engine',
      subtitle: 'Distributed event processing system supporting 100,000 events/sec',
      description: 'Engineered a low-latency event streaming queue in Go and Rust utilizing zero-copy buffer pools and Redis Streams. Benchmarked against Apache Kafka.',
      role: 'Systems Engineer',
      outcomes: [
        'Achieved sub-5ms p99 latency under 100,000 concurrent event load',
        'Cut RAM consumption by 40% using custom memory allocation buffers in Rust',
        'Open-sourced repository with 450+ GitHub Stars'
      ],
      techStack: ['Go', 'Rust', 'gRPC', 'Redis Streams', 'PostgreSQL', 'Docker', 'Grafana'],
      githubUrl: 'https://github.com/jatinvishwakarma/hyperstream',
      liveUrl: 'https://hyperstream.dev/benchmarks',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      featured: true,
      caseStudy: {
        overview: 'HyperStream was designed to handle high-velocity sensor data streams for telemetry pipelines without JVM memory overhead.',
        problemStatement: 'Existing message brokers required excessive heap management under peak surge loads, causing GC latency spikes.',
        architecture: 'Ring-buffer based thread architecture written in Rust core with Go gRPC edge adapters.',
        keyChallenges: [
          'Avoiding garbage collection locks during high payload bursts',
          'Maintaining exact once delivery guarantees across distributed partitions'
        ],
        solution: 'Implemented lock-free ring buffers and explicit byte memory re-use rings.',
        metrics: [
          { label: 'Throughput', value: '100k req/sec' },
          { label: 'p99 Latency', value: '4.2 ms' },
          { label: 'GitHub Stars', value: '450+' }
        ]
      }
    }
  ],

  education: [
    {
      id: 'e1',
      degree: 'Bachelor of Technology (B.Tech)',
      fieldOfStudy: 'Computer Science & Engineering',
      institution: 'Indian Institute of Technology (IIT), Bombay',
      location: 'Mumbai, MH, India',
      startYear: '2022',
      endYear: '2026',
      grade: '9.4 / 10.0 CGPA',
      highlights: [
        'Department Academic Rank 4 in Computer Science',
        'Teaching Assistant for CS213: Data Structures & Algorithms',
        'Head of Tech Infrastructure for Techfest IIT Bombay'
      ]
    }
  ],

  experience: [
    {
      id: 'exp1',
      role: 'Software Engineering Intern (Systems & Core Backend)',
      company: 'Uber Infrastructure Team',
      location: 'Bengaluru, India',
      startDate: 'May 2025',
      endDate: 'Aug 2025',
      current: false,
      type: 'Internship',
      description: [
        'Architected a distributed cache invalidation daemon in Go reducing stale database read queries across 14 microservices by 82%.',
        'Built automated canary deployment verification tools reducing rollback incidents by 35% during peak trip surges.'
      ],
      skillsUsed: ['Go', 'Redis', 'Kafka', 'gRPC', 'Docker', 'Kubernetes']
    },
    {
      id: 'exp2',
      role: 'Open Source Fellow & Contributor',
      company: 'CNCF (Cloud Native Computing Foundation)',
      location: 'Remote',
      startDate: 'Dec 2024',
      endDate: 'Present',
      current: true,
      type: 'Open Source',
      description: [
        'Contributed 18 PRs to Envoy Proxy core written in C++ optimizing memory serialization buffers.',
        'Mentored 12 junior developers in competitive algorithms and system architecture.'
      ],
      skillsUsed: ['C++20', 'Envoy', 'gRPC', 'Bazel', 'Linux Kernel']
    }
  ],

  courses: [
    {
      id: 'crs1',
      title: 'Deep Learning & Neural Networks Specialization',
      platform: 'Coursera (DeepLearning.AI)',
      instructor: 'Andrew Ng',
      completionDate: 'Jan 2025',
      certificateUrl: 'https://coursera.org/verify/dl-spec-jatin',
      skillsLearned: ['PyTorch', 'CNNs', 'Transformers', 'Hyperparameter Tuning', 'Adam Optimizer'],
      progressPercentage: 100,
      gradeOrScore: '99.4% (Grade A+)',
      badgeImageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'crs2',
      title: 'Advanced Distributed Systems & Storage Masterclass',
      platform: 'MIT OpenCourseWare',
      instructor: 'Prof. Robert Morris',
      completionDate: 'Nov 2024',
      certificateUrl: 'https://ocw.mit.edu/courses/6-824',
      skillsLearned: ['Raft Consensus', 'Paxos', 'Spanner', 'MapReduce', 'Fault Tolerance'],
      progressPercentage: 100,
      gradeOrScore: 'Distinction',
      badgeImageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'crs3',
      title: 'AWS Certified Solutions Architect & Cloud Operations',
      platform: 'AWS Academy',
      instructor: 'Amazon Web Services',
      completionDate: 'Mar 2025',
      certificateUrl: 'https://aws.amazon.com/verification',
      skillsLearned: ['IAM', 'VPC Architecture', 'DynamoDB', 'ECS Fargate', 'CloudFront'],
      progressPercentage: 100,
      gradeOrScore: '940 / 1000',
      badgeImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=200&q=80'
    }
  ],

  badges: [
    {
      id: 'bdg1',
      name: 'Codeforces Candidate Master',
      platform: 'Codeforces',
      rarity: 'Legendary',
      earnedDate: 'July 2025',
      description: 'Achieved peak rating of 1980+, placing in top 2.1% globally.',
      verified: true
    },
    {
      id: 'bdg2',
      name: 'LeetCode 500 Days Streak Badge',
      platform: 'LeetCode',
      rarity: 'Gold',
      earnedDate: 'August 2025',
      description: 'Solved algorithmic questions for 500 consecutive days without missing.',
      verified: true
    },
    {
      id: 'bdg3',
      name: 'GitHub Arctic Code Vault Contributor',
      platform: 'GitHub',
      rarity: 'Gold',
      earnedDate: '2024',
      description: 'Code preserved in the Arctic World Archive for future generations.',
      verified: true
    },
    {
      id: 'bdg4',
      name: 'CodeChef 5★ Star Programmer',
      platform: 'CodeChef',
      rarity: 'Gold',
      earnedDate: 'June 2025',
      description: 'Achieved 1950+ rating in monthly Long & Cook-Off Challenges.',
      verified: true
    },
    {
      id: 'bdg5',
      name: 'HackerRank 6★ Problem Solving',
      platform: 'HackerRank',
      rarity: 'Silver',
      earnedDate: 'March 2024',
      description: 'Earned maximum 6 gold stars in Data Structures & Algorithms domain.',
      verified: true
    },
    {
      id: 'bdg6',
      name: 'NovaBridge Certified Developer',
      platform: 'NovaBridge',
      rarity: 'Legendary',
      earnedDate: 'Verified Live',
      description: 'Top 1% candidate with 100% verified proof items and 9.4 CGPA.',
      verified: true
    }
  ],

  certifications: [
    {
      id: 'c1',
      title: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      issueDate: 'Jan 2025',
      credentialId: 'CKA-940218-JV',
      credentialUrl: 'https://www.credly.com/org/cncf'
    }
  ],

  publications: [
    {
      id: 'pub1',
      title: 'Adaptive RAG Reranking via Dense Cross-Encoder Attention in Technical Query Domain',
      publisher: 'IEEE International Conference on Artificial Intelligence (AISS)',
      publicationDate: 'March 2025',
      doi: '10.1109/AISS.2025.9812401',
      url: 'https://doi.org/10.1109/AISS.2025.9812401',
      abstract: 'We present a lightweight dense cross-encoder reranking framework optimized for domain-specific RAG pipelines, demonstrating a 22.4% increase in MRR@10.'
    }
  ],

  achievements: [
    {
      id: 'a1',
      title: 'Global Winner - International HackTech 2025',
      organization: 'MIT & Devfolio Global',
      date: 'Feb 2025',
      category: 'Hackathon',
      description: 'Awarded 1st Place out of 650+ international teams for building HyperStream telemetry engine.',
      rank: '1st Place ($15,000 Prize)'
    },
    {
      id: 'a2',
      title: 'Codeforces Candidate Master (Peak Rating: 1980)',
      organization: 'Codeforces',
      date: 'Ongoing',
      category: 'Competitive Programming',
      description: 'Top 2.1% worldwide in competitive programming.',
      rank: 'Candidate Master (1980)'
    }
  ],

  resumeFileName: 'Jatin_Vishwakarma_Resume_2026.pdf',
  resumeLastUpdated: 'August 2026'
};
