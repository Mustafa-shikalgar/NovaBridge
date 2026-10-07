import React, { useState } from 'react';
import { BookOpen, Star, ShoppingCart, CheckCircle2, X, Filter, Zap, ShieldCheck, Sparkles, CreditCard } from 'lucide-react';

export interface StoreCourse {
  id: string;
  title: string;
  subtitle: string;
  instructor: string;
  badge: 'Bestseller' | 'Premium' | 'Featured' | 'New';
  rating: number;
  ratingCount: number;
  level: string;
  priceINR: number;
  originalPriceINR: number;
  imageUrl: string;
  category: string;
}

export const initialStoreCourses: StoreCourse[] = [
  {
    id: 'sc1',
    title: 'Mastering QuickBooks Online & Financial Bookkeeping',
    subtitle: 'Become An Expert QuickBooks Online And Learn How To Keep An Accurate Set Of Books',
    instructor: 'Mark Smolen',
    badge: 'Bestseller',
    rating: 4.6,
    ratingCount: 14967,
    level: 'All levels',
    priceINR: 429,
    originalPriceINR: 3909,
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    category: 'Money Management Tools'
  },
  {
    id: 'sc2',
    title: 'SAP FICO (Financial Accounting & Management Accounting)',
    subtitle: 'The course covers both configuration and end-user financial statement workflows',
    instructor: 'Rana W Mehmood',
    badge: 'Premium',
    rating: 4.3,
    ratingCount: 13222,
    level: 'All levels',
    priceINR: 509,
    originalPriceINR: 4629,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    category: 'Money Management Tools'
  },
  {
    id: 'sc3',
    title: 'QuickBooks Online Complex Issues And Advanced Techniques',
    subtitle: 'How To Prove An Entire Set Of QuickBooks Online Records Are Clean & Audit Ready',
    instructor: 'Mark Smolen',
    badge: 'Premium',
    rating: 4.7,
    ratingCount: 900,
    level: 'All levels',
    priceINR: 399,
    originalPriceINR: 3199,
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    category: 'Money Management Tools'
  },
  {
    id: 'sc4',
    title: 'Excel Crash Course: Master Excel for Financial Analysis',
    subtitle: 'Beginner to Advanced: Learn Excel Shortcuts, Formulas & Functions for Wall Street',
    instructor: 'Scott Powell',
    badge: 'Premium',
    rating: 4.6,
    ratingCount: 17539,
    level: 'All levels',
    priceINR: 469,
    originalPriceINR: 3589,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    category: 'Money Management Tools'
  },
  {
    id: 'sc5',
    title: 'Distributed System Design & High-Throughput Microservices',
    subtitle: 'Master Raft Consensus, gRPC, Redis Streams, Kafka Partitions & Scale to 1M req/sec',
    instructor: 'Prof. Robert Morris (MIT)',
    badge: 'Bestseller',
    rating: 4.9,
    ratingCount: 24800,
    level: 'Advanced',
    priceINR: 599,
    originalPriceINR: 5999,
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    category: 'System Design & Engineering'
  },
  {
    id: 'sc6',
    title: 'Competitive Programming Masterclass (Codeforces Candidate Master)',
    subtitle: 'Advanced Graph Algorithms, Dynamic Programming, Segment Trees & Math for CP',
    instructor: 'Jatin Vishwakarma (IITB)',
    badge: 'Premium',
    rating: 4.8,
    ratingCount: 8920,
    level: 'Intermediate - Expert',
    priceINR: 499,
    originalPriceINR: 4499,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    category: 'Algorithms & Coding'
  }
];

export const CourseStorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCourse, setSelectedCourse] = useState<StoreCourse | null>(null);
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const categories = ['All', 'Money Management Tools', 'System Design & Engineering', 'Algorithms & Coding'];

  const filteredCourses = selectedCategory === 'All'
    ? initialStoreCourses
    : initialStoreCourses.filter(c => c.category === selectedCategory);

  const handleBuyCourse = (course: StoreCourse) => {
    setSelectedCourse(course);
    setCheckoutSuccess(false);
  };

  const handleConfirmPayment = () => {
    if (selectedCourse) {
      setPurchasedCourses([...purchasedCourses, selectedCourse.id]);
      setCheckoutSuccess(true);
      setTimeout(() => {
        setCheckoutSuccess(false);
        setSelectedCourse(null);
        setToastMsg(`Successfully enrolled in "${selectedCourse.title}"! Course unlocked.`);
        setTimeout(() => setToastMsg(null), 4000);
      }, 1200);
    }
  };

  return (
    <div className="course-store-container">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="toast-notification">
          <CheckCircle2 size={16} style={{ color: '#10B981' }} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="color-card color-card-purple" style={{ marginBottom: '24px' }}>
        <div className="color-card-ribbon"></div>
        <div className="color-card-inner">
          <div className="store-banner-header">
            <div>
              <span className="store-tag">NovaBridge Academy & Skills Marketplace</span>
              <h1 className="store-main-title">Top Courses & Certifications Marketplace</h1>
              <p className="store-sub-title">Learn from industry experts, verify your skill credentials, and accelerate your engineering career.</p>
            </div>
            <div className="store-kpi-badge">
              <Sparkles size={18} style={{ color: '#7C3AED' }} />
              <div>
                <div className="kpi-num">100% Verified</div>
                <div className="kpi-lbl">Certificate Guarantee</div>
              </div>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="category-filter-row">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cat-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Store Section Title (Matching media_1787150570105.png) */}
      <div className="store-section-title">
        <h2>Top courses in {selectedCategory === 'All' ? 'Money Management & Engineering Tools' : selectedCategory}</h2>
      </div>

      {/* Course Cards Grid (Matching media_1787150570105.png exact card style) */}
      <div className="udemy-course-grid">
        {filteredCourses.map(course => {
          const isEnrolled = purchasedCourses.includes(course.id);
          return (
            <div key={course.id} className="udemy-course-card">
              {/* Card Banner Image */}
              <div className="course-card-image-wrap">
                <img src={course.imageUrl} alt={course.title} className="course-card-img" />
                {course.badge === 'Premium' && (
                  <div className="badge-purple-premium">
                    <Sparkles size={11} /> <span>Premium</span>
                  </div>
                )}
                {course.badge === 'Bestseller' && (
                  <div className="badge-yellow-bestseller">
                    <span>Bestseller</span>
                  </div>
                )}
              </div>

              {/* Card Content Body */}
              <div className="course-card-body">
                <h3 className="udemy-course-title">{course.title}</h3>
                <p className="udemy-course-sub">{course.subtitle}</p>
                <div className="udemy-instructor-name">{course.instructor}</div>

                {/* Rating & Level Pills */}
                <div className="udemy-rating-row">
                  <div className="rating-num-box">
                    <Star size={12} fill="#F59E0B" stroke="#F59E0B" />
                    <span>{course.rating}</span>
                  </div>
                  <span className="rating-count-text">({course.ratingCount.toLocaleString()} ratings)</span>
                  <span className="level-pill-tag">{course.level}</span>
                </div>

                {/* Price Section (Matching ₹429.00 ₹3,909.00) */}
                <div className="udemy-price-row">
                  <span className="price-current">₹{course.priceINR}.00</span>
                  <span className="price-original">₹{course.originalPriceINR.toLocaleString()}.00</span>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleBuyCourse(course)}
                  disabled={isEnrolled}
                  className={`btn-buy-course ${isEnrolled ? 'btn-enrolled' : ''}`}
                >
                  {isEnrolled ? (
                    <><CheckCircle2 size={15} /> Enrolled & Active</>
                  ) : (
                    <><ShoppingCart size={15} /> Buy Course Now</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CHECKOUT MODAL POPUP */}
      {selectedCourse && (
        <div className="modal-overlay-bg" onClick={() => setSelectedCourse(null)}>
          <div className="checkout-modal-card" onClick={e => e.stopPropagation()}>
            <div className="checkout-top">
              <div>
                <h3 className="checkout-title">Complete Checkout</h3>
                <p className="checkout-sub">Unlock full lifetime access & verified certificate</p>
              </div>
              <button onClick={() => setSelectedCourse(null)} className="modal-close-x"><X size={18} /></button>
            </div>

            <div className="checkout-summary-box">
              <img src={selectedCourse.imageUrl} alt={selectedCourse.title} className="summary-thumb" />
              <div>
                <h4 className="summary-title">{selectedCourse.title}</h4>
                <div className="summary-by">By {selectedCourse.instructor}</div>
                <div className="summary-price">
                  <span>Total Amount:</span> <strong>₹{selectedCourse.priceINR}.00</strong>
                </div>
              </div>
            </div>

            <div className="payment-options-group">
              <label className="payment-label">Select Payment Method</label>
              <div className="payment-methods-grid">
                <div className="pay-method-chip active">
                  <CreditCard size={16} /> <span>UPI / GPay / PhonePe</span>
                </div>
                <div className="pay-method-chip">
                  <CreditCard size={16} /> <span>Credit / Debit Card</span>
                </div>
              </div>
            </div>

            <div className="checkout-actions-row">
              <button onClick={() => setSelectedCourse(null)} className="btn-cancel-checkout">Cancel</button>
              <button onClick={handleConfirmPayment} disabled={checkoutSuccess} className="btn-confirm-pay">
                {checkoutSuccess ? (
                  <><CheckCircle2 size={16} /> Payment Successful!</>
                ) : (
                  <><Zap size={16} /> Pay ₹{selectedCourse.priceINR}.00 & Enroll</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .course-store-container {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .store-banner-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
        }
        .store-tag {
          font-size: 0.78rem;
          font-weight: 800;
          color: #7C3AED;
          background: #F3E8FF;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .store-main-title {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--navy-900);
          margin-top: 6px;
        }
        .store-sub-title {
          font-size: 0.85rem;
          color: var(--slate-500);
          margin-top: 4px;
        }

        .store-kpi-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #F3E8FF;
          padding: 10px 16px;
          border-radius: 12px;
          border: 1px solid #DDD6FE;
        }
        .kpi-num {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          color: #6D28D9;
        }
        .kpi-lbl {
          font-size: 0.72rem;
          color: var(--slate-600);
        }

        .category-filter-row {
          display: flex;
          gap: 8px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        .cat-pill-btn {
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid var(--slate-200);
          background: #FFFFFF;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--slate-600);
          transition: all 0.15s ease;
        }
        .cat-pill-btn.active {
          background: var(--navy-900);
          color: #FFFFFF;
          border-color: var(--navy-900);
        }

        .store-section-title h2 {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--navy-900);
        }

        /* Udemy Course Card Style (Matching media_1787150570105.png) */
        .udemy-course-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }
        .udemy-course-card {
          background: #FFFFFF;
          border: 1px solid var(--slate-200);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(15,23,42,0.04);
          display: flex;
          flex-direction: column;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .udemy-course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(15,23,42,0.1);
        }
        .course-card-image-wrap {
          position: relative;
          width: 100%;
          height: 140px;
        }
        .course-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .badge-purple-premium {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #7C3AED;
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .badge-yellow-bestseller {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #D97706;
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .course-card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
        .udemy-course-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--navy-900);
          line-height: 1.35;
        }
        .udemy-course-sub {
          font-size: 0.78rem;
          color: var(--slate-500);
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .udemy-instructor-name {
          font-size: 0.75rem;
          color: var(--slate-500);
        }

        .udemy-rating-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 4px;
          flex-wrap: wrap;
        }
        .rating-num-box {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--navy-900);
          background: #FEF3C7;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .rating-count-text {
          font-size: 0.72rem;
          color: var(--slate-500);
        }
        .level-pill-tag {
          font-size: 0.7rem;
          color: var(--slate-500);
          background: var(--slate-100);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .udemy-price-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
        }
        .price-current {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .price-original {
          font-size: 0.8125rem;
          color: var(--slate-400);
          text-decoration: line-through;
        }

        .btn-buy-course {
          margin-top: auto;
          padding: 10px;
          border-radius: 10px;
          background: var(--codolio-orange);
          color: #FFFFFF;
          font-size: 0.8125rem;
          font-weight: 800;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: background 0.15s ease;
        }
        .btn-buy-course:hover {
          background: var(--codolio-orange-hover);
        }
        .btn-enrolled {
          background: #10B981 !important;
        }

        /* Checkout Modal */
        .checkout-modal-card {
          background: #FFFFFF;
          border-radius: 18px;
          padding: 24px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 20px 50px rgba(15,23,42,0.2);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .checkout-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid var(--slate-100);
          padding-bottom: 12px;
        }
        .checkout-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--navy-900);
        }
        .checkout-sub { font-size: 0.78rem; color: var(--slate-500); }
        .checkout-summary-box {
          display: flex;
          gap: 12px;
          background: var(--slate-50);
          padding: 12px;
          border-radius: 12px;
          border: 1px solid var(--slate-200);
        }
        .summary-thumb { width: 70px; height: 50px; border-radius: 8px; object-fit: cover; }
        .summary-title { font-family: var(--font-heading); font-size: 0.88rem; font-weight: 800; color: var(--navy-900); }
        .summary-by { font-size: 0.75rem; color: var(--slate-500); }
        .summary-price { font-size: 0.8125rem; color: var(--navy-900); margin-top: 4px; }

        .payment-options-group { display: flex; flex-direction: column; gap: 8px; }
        .payment-label { font-size: 0.8rem; font-weight: 700; color: var(--navy-900); }
        .payment-methods-grid { display: flex; gap: 10px; }
        .pay-method-chip {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px;
          border: 1.5px solid var(--slate-200);
          border-radius: 10px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--slate-600);
          cursor: pointer;
        }
        .pay-method-chip.active {
          border-color: var(--codolio-orange);
          color: var(--codolio-orange);
          background: #FFF7ED;
        }

        .checkout-actions-row {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 8px;
        }
        .btn-cancel-checkout {
          padding: 9px 16px;
          border-radius: 10px;
          border: 1px solid var(--slate-200);
          background: var(--slate-100);
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--slate-600);
        }
        .btn-confirm-pay {
          padding: 10px 20px;
          border-radius: 10px;
          background: var(--codolio-orange);
          color: #FFFFFF;
          font-weight: 800;
          font-size: 0.82rem;
          border: none;
          display: flex;
          align-items: center;
          gap: 6px;
        }
      `}</style>
    </div>
  );
};
