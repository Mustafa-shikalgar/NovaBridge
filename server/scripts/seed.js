const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');

const demoCourses = [
  {
    customId: 'sc1',
    title: 'Mastering QuickBooks Online & Financial Bookkeeping',
    price: 1,
    instructor: 'Mark Smolen'
  },
  {
    customId: 'sc2',
    title: 'SAP FICO (Financial Accounting & Management Accounting)',
    price: 1,
    instructor: 'Rana W Mehmood'
  },
  {
    customId: 'sc3',
    title: 'QuickBooks Online Complex Issues And Advanced Techniques',
    price: 1,
    instructor: 'Mark Smolen'
  },
  {
    customId: 'sc4',
    title: 'Excel Crash Course: Master Excel for Financial Analysis',
    price: 1,
    instructor: 'Scott Powell'
  },
  {
    customId: 'sc5',
    title: 'Distributed System Design & High-Throughput Microservices',
    price: 1,
    instructor: 'Prof. Robert Morris (MIT)'
  },
  {
    customId: 'sc6',
    title: 'Competitive Programming Masterclass (Codeforces Candidate Master)',
    price: 1,
    instructor: 'Jatin Vishwakarma (IITB)'
  }
];

const demoUser = {
  name: 'Jatin Vishwakarma',
  email: 'student@novabridge.demo',
  role: 'student',
  purchasedCourses: []
};

async function seed() {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/novabridge';
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding.');

    // 1. Seed courses
    console.log('Seeding courses...');
    await Course.deleteMany({});
    const createdCourses = await Course.insertMany(demoCourses);
    console.log(`Seeded ${createdCourses.length} courses successfully.`);

    // 2. Seed student user
    console.log('Seeding student user...');
    await User.deleteMany({ email: demoUser.email });
    const createdUser = await User.create(demoUser);
    console.log('Seeded demo student user:', createdUser.email);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seed();
