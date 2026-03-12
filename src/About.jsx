import React from "react";
import Nav from "./Nav";
import { 
  FaWhatsapp, 
  FaPhone, 
  FaInstagram, 
  FaHeartbeat, 
  FaShieldAlt, 
  FaLeaf,
  FaTruck,
  FaAward,
  FaUsers,
  FaHandsHelping,
  FaRegClock,
  FaStar,
  FaQuoteRight,
  FaRocket,
  FaCheckCircle,
  FaHeadSideVirus,  // New icon for Expert Guidance

} from "react-icons/fa";

const PHONE = "917011617976";
const WHATSAPP_MSG = encodeURIComponent(
  "Hello! I'm interested in NT Healthcare products. Could you please provide me with information about your healthcare range and prices?"
);
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${WHATSAPP_MSG}`;
const CALL_URL = `tel:+917011617976`;
const INSTA_URL = `https://www.instagram.com/sakshishukla5027`;

// Sample product images (you can replace with actual image URLs)
const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
];

// Testimonials data
const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    text: "NT Healthcare has been a game-changer for my family. Their products are authentic and the customer service is exceptional!",
    rating: 5
  },
  {
    name: "Rajesh Kumar",
    text: "I've been using their healthcare products for 6 months now. The quality is consistently excellent and prices are reasonable.",
    rating: 5
  },
  {
    name: "Anjali Patel",
    text: "Finally found a reliable healthcare brand I can trust. Their delivery is always on time and products are genuine.",
    rating: 5
  }
];

// Milestones data
const MILESTONES = [
  { number: "5000+", label: "Happy Customers", icon: FaUsers },
  { number: "100+", label: "Products", icon: FaRocket },
  { number: "50+", label: "Cities", icon: FaTruck },
  { number: "4.9★", label: "Rating", icon: FaStar }
];

export default function About() {
  return (
    <>
      <Nav />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;700&display=swap');

        .nt-about {
          font-family: 'DM Sans', sans-serif;
          background: #f0f7f4;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── Animations ─────────────────────────────── */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(26, 158, 114, 0.4); }
          50% { box-shadow: 0 0 0 15px rgba(26, 158, 114, 0); }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeUp {
          animation: fadeInUp 1s ease forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulseGlow {
          animation: pulseGlow 2s infinite;
        }

        .animate-slideLeft {
          animation: slideInLeft 1s ease forwards;
        }

        .animate-slideRight {
          animation: slideInRight 1s ease forwards;
        }

        .stagger-item {
          opacity: 0;
          animation: fadeInUp 0.6s ease forwards;
        }

        .stagger-item:nth-child(1) { animation-delay: 0.1s; }
        .stagger-item:nth-child(2) { animation-delay: 0.3s; }
        .stagger-item:nth-child(3) { animation-delay: 0.5s; }
        .stagger-item:nth-child(4) { animation-delay: 0.7s; }

        /* ── Hero Section ─────────────────────────────── */
        .nt-hero {
          background: linear-gradient(135deg, #0d6e4f 0%, #1a9e72 50%, #0d6e4f 100%);
          color: #fff;
          padding: 100px 20px 120px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .nt-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .nt-hero::after {
          content: '';
          position: absolute;
          width: 150%;
          height: 150%;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(255, 255, 255, 0.02) 20px,
            rgba(255, 255, 255, 0.02) 40px
          );
          animation: slideInLeft 20s linear infinite;
          opacity: 0.3;
          pointer-events: none;
        }

        .nt-hero-badge {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          color: #d4f5e3;
          font-size: 0.78rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          padding: 8px 22px;
          border-radius: 50px;
          margin-bottom: 25px;
          backdrop-filter: blur(8px);
          animation: fadeInUp 0.8s ease;
        }

        .nt-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 7vw, 4.8rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 20px;
          animation: fadeInUp 0.8s ease 0.2s both;
        }

        .nt-hero h1 span {
          color: #7effc5;
          position: relative;
          display: inline-block;
          animation: float 3s ease-in-out infinite;
        }

        .nt-hero h1 span::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 100%;
          height: 8px;
          background: rgba(255,255,255,0.2);
          border-radius: 4px;
          transform: skewX(-15deg);
        }

        .nt-hero p {
          max-width: 600px;
          margin: 0 auto;
          font-size: 1.15rem;
          color: rgba(255,255,255,0.9);
          line-height: 1.7;
          animation: fadeInUp 0.8s ease 0.4s both;
        }

        .nt-hero-wave {
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          line-height: 0;
        }

        .nt-hero-wave svg {
          width: 100%;
          height: auto;
        }

        /* ── Floating Stats ─────────────────────────────── */
        .nt-floating-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 50px;
          flex-wrap: wrap;
          animation: fadeInUp 0.8s ease 0.6s both;
        }

        .nt-stat-item {
          text-align: center;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 20px 30px;
          border-radius: 60px;
          border: 1px solid rgba(255,255,255,0.2);
          transition: transform 0.3s;
        }

        .nt-stat-item:hover {
          transform: translateY(-5px) scale(1.05);
        }

        .nt-stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #7effc5;
          line-height: 1.2;
        }

        .nt-stat-label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.9;
        }

        /* ── Sections ─────────────────────────────── */
        .nt-section {
          padding: 80px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .nt-tag {
          font-size: 0.75rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #1a9e72;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .nt-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: #0d2b20;
          line-height: 1.2;
          margin-bottom: 25px;
        }

        .nt-body {
          color: #4a6b5d;
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        /* ── Story Layout ─────────────────────────────── */
        .nt-story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
          margin-bottom: 60px;
        }

        .nt-story-images {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .nt-story-image {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(13,110,79,0.15);
          transition: transform 0.3s;
        }

        .nt-story-image:hover {
          transform: scale(1.02);
        }

        .nt-story-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .nt-story-image:first-child {
          grid-column: span 2;
        }

        .nt-story-image:first-child img {
          height: 250px;
        }

        /* ── Founders ─────────────────────────────── */
        .nt-founders {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
          margin: 40px 0;
          justify-content: center;
        }

        .nt-founder-card {
          flex: 1 1 250px;
          background: #fff;
          border-radius: 30px;
          padding: 35px 25px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(13,110,79,0.1);
          border: 1px solid #e0f0e8;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .nt-founder-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #1a9e72, #7effc5);
          transform: scaleX(0);
          transition: transform 0.3s;
        }

        .nt-founder-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px rgba(13,110,79,0.2);
        }

        .nt-founder-card:hover::before {
          transform: scaleX(1);
        }

        .nt-founder-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a9e72, #0d6e4f);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          color: #fff;
          margin: 0 auto 20px;
          font-weight: 700;
          border: 3px solid #fff;
          box-shadow: 0 10px 20px rgba(13,110,79,0.2);
          transition: transform 0.3s;
        }

        .nt-founder-card:hover .nt-founder-avatar {
          transform: rotate(5deg) scale(1.05);
        }

        .nt-founder-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #0d2b20;
          margin-bottom: 5px;
        }

        .nt-founder-role {
          font-size: 0.9rem;
          color: #1a9e72;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 15px;
        }

        .nt-founder-quote {
          font-style: italic;
          color: #4a6b5d;
          font-size: 0.95rem;
          line-height: 1.6;
          position: relative;
          padding: 0 10px;
        }

        .nt-founder-quote::before {
          content: '"';
          font-size: 3rem;
          color: #1a9e72;
          opacity: 0.2;
          position: absolute;
          top: -15px;
          left: -5px;
        }

        /* ── Values ─────────────────────────────── */
        .nt-values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin: 50px 0;
        }

        .nt-value-card {
          background: #fff;
          border-radius: 24px;
          padding: 35px 25px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(13,110,79,0.05);
          border: 1px solid #e0f0e8;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .nt-value-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #1a9e72, #7effc5);
          transform: translateX(-100%);
          transition: transform 0.3s;
        }

        .nt-value-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(13,110,79,0.1);
        }

        .nt-value-card:hover::after {
          transform: translateX(0);
        }

        .nt-value-icon {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          background: linear-gradient(135deg, #d4f5e3, #a8ebcc);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: #0d6e4f;
          margin: 0 auto 20px;
          transition: transform 0.3s;
        }

        .nt-value-card:hover .nt-value-icon {
          transform: rotate(5deg) scale(1.1);
        }

        .nt-value-card h3 {
          font-family: 'Playfair Display', serif;
          color: #0d2b20;
          font-size: 1.3rem;
          margin-bottom: 12px;
        }

        .nt-value-card p {
          font-size: 0.95rem;
          color: #6a8f80;
          line-height: 1.7;
        }

        /* ── Milestones ─────────────────────────────── */
        .nt-milestones {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin: 60px 0;
          background: #fff;
          border-radius: 30px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(13,110,79,0.08);
        }

        .nt-milestone-item {
          text-align: center;
          padding: 20px;
          border-right: 1px solid #e0f0e8;
        }

        .nt-milestone-item:last-child {
          border-right: none;
        }

        .nt-milestone-icon {
          font-size: 2rem;
          color: #1a9e72;
          margin-bottom: 15px;
        }

        .nt-milestone-number {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #0d2b20;
          line-height: 1.2;
        }

        .nt-milestone-label {
          font-size: 0.9rem;
          color: #6a8f80;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .nt-milestones {
            grid-template-columns: repeat(2, 1fr);
          }
          .nt-milestone-item {
            border-right: none;
            border-bottom: 1px solid #e0f0e8;
            padding: 20px 10px;
          }
          .nt-milestone-item:nth-last-child(-n+2) {
            border-bottom: none;
          }
        }

        /* ── Product Showcase ─────────────────────────────── */
        .nt-product-showcase {
          margin: 60px 0;
        }

        .nt-product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 30px;
        }

        .nt-product-item {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .nt-product-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s;
        }

        .nt-product-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(13,110,79,0.9), transparent);
          color: #fff;
          padding: 20px 15px 15px;
          transform: translateY(100%);
          transition: transform 0.3s;
        }

        .nt-product-item:hover .nt-product-overlay {
          transform: translateY(0);
        }

        .nt-product-item:hover img {
          transform: scale(1.1);
        }

        .nt-product-title {
          font-weight: 600;
          margin-bottom: 5px;
        }

        .nt-product-category {
          font-size: 0.8rem;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .nt-product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ── Testimonials ─────────────────────────────── */
        .nt-testimonials {
          margin: 80px 0;
        }

        .nt-testimonial-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 40px;
        }

        .nt-testimonial-card {
          background: #fff;
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(13,110,79,0.05);
          border: 1px solid #e0f0e8;
          transition: all 0.3s;
        }

        .nt-testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(13,110,79,0.15);
        }

        .nt-testimonial-rating {
          color: #ffc107;
          margin-bottom: 15px;
          font-size: 1.1rem;
        }

        .nt-testimonial-text {
          font-size: 1rem;
          color: #4a6b5d;
          line-height: 1.7;
          margin-bottom: 20px;
          font-style: italic;
          position: relative;
          padding-left: 15px;
        }

        .nt-testimonial-text::before {
          content: '"';
          font-size: 3rem;
          color: #1a9e72;
          opacity: 0.2;
          position: absolute;
          top: -15px;
          left: -5px;
        }

        .nt-testimonial-name {
          font-weight: 600;
          color: #0d2b20;
        }

        @media (max-width: 768px) {
          .nt-testimonial-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ── FAQ Section ─────────────────────────────── */
        .nt-faq {
          margin: 80px 0;
        }

        .nt-faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-top: 40px;
        }

        .nt-faq-item {
          background: #fff;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(13,110,79,0.05);
          border: 1px solid #e0f0e8;
          transition: all 0.3s;
        }

        .nt-faq-item:hover {
          transform: translateX(5px);
          border-color: #1a9e72;
        }

        .nt-faq-question {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #0d2b20;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nt-faq-answer {
          font-size: 0.95rem;
          color: #6a8f80;
          line-height: 1.7;
          padding-left: 30px;
        }

        @media (max-width: 768px) {
          .nt-faq-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ── CTA Section ─────────────────────────────── */
        .nt-cta-section {
          background: linear-gradient(135deg, #0d6e4f, #1a9e72);
          padding: 80px 20px;
          text-align: center;
          color: #fff;
          position: relative;
          overflow: hidden;
        }

        .nt-cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 70%);
        }

        .nt-cta-section::after {
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 30px,
            rgba(255, 255, 255, 0.03) 30px,
            rgba(255, 255, 255, 0.03) 60px
          );
          animation: slideInLeft 30s linear infinite;
          opacity: 0.3;
        }

        .nt-cta-content {
          position: relative;
          z-index: 2;
        }

        .nt-cta-section h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          margin-bottom: 15px;
          animation: fadeInUp 0.8s ease;
        }

        .nt-cta-section p {
          color: rgba(255,255,255,0.9);
          margin-bottom: 40px;
          font-size: 1.1rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          animation: fadeInUp 0.8s ease 0.2s both;
        }

        .nt-cta-btns {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
          position: relative;
          animation: fadeInUp 0.8s ease 0.4s both;
        }

        .nt-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 32px;
          border-radius: 60px;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          white-space: nowrap;
          font-family: 'DM Sans', sans-serif;
          min-width: 180px;
        }

        .nt-btn:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 15px 35px rgba(0,0,0,0.25);
        }

        .nt-btn:active {
          transform: translateY(-2px);
        }

        .nt-btn-whatsapp {
          background: #25D366;
          color: #fff;
        }

        .nt-btn-whatsapp:hover {
          background: #20bd5a;
        }

        .nt-btn-call {
          background: #fff;
          color: #0d6e4f;
        }

        .nt-btn-call:hover {
          background: #f8fff8;
        }

        .nt-btn-insta {
          background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
          color: #fff;
        }

        .nt-btn-insta:hover {
          background: linear-gradient(135deg, #e08a30, #d65f38, #c7243e, #b81f5c, #a8167c);
        }

        /* ── Footer ─────────────────────────────── */
        .nt-footer {
          background: #0d2b20;
          color: #fff;
          padding: 60px 20px 30px;
        }

        .nt-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .nt-footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 15px;
          color: #7effc5;
        }

        .nt-footer-about {
          color: #a0c0b0;
          line-height: 1.7;
          font-size: 0.95rem;
          margin-bottom: 20px;
        }

        .nt-footer-social {
          display: flex;
          gap: 15px;
        }

        .nt-footer-social a {
          color: #a0c0b0;
          font-size: 1.2rem;
          transition: all 0.3s;
        }

        .nt-footer-social a:hover {
          color: #7effc5;
          transform: translateY(-3px);
        }

        .nt-footer-title {
          font-weight: 600;
          margin-bottom: 20px;
          color: #fff;
        }

        .nt-footer-links {
          list-style: none;
          padding: 0;
        }

        .nt-footer-links li {
          margin-bottom: 12px;
        }

        .nt-footer-links a {
          color: #a0c0b0;
          text-decoration: none;
          transition: color 0.3s;
          font-size: 0.95rem;
        }

        .nt-footer-links a:hover {
          color: #7effc5;
        }

        .nt-footer-bottom {
          text-align: center;
          padding-top: 40px;
          margin-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.1);
          color: #a0c0b0;
          font-size: 0.9rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .nt-footer-bottom span {
          color: #7effc5;
        }

        @media (max-width: 992px) {
          .nt-footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .nt-footer-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ── Responsive Adjustments ─────────────────────────────── */
        @media (max-width: 768px) {
          .nt-story-grid {
            grid-template-columns: 1fr;
          }
          
          .nt-btn {
            width: 100%;
            max-width: 300px;
          }
          
          .nt-cta-btns {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <div className="nt-about">

        {/* ── HERO SECTION ── */}
        <section className="nt-hero">
          <div className="nt-hero-badge animate-fadeUp">Est. 2025 · Premium Healthcare Products</div>
          <h1>
            About <span>NT Healthcare</span>
          </h1>
          <p>
            Founded by Neha and Trilok with a simple vision — to deliver trust, quality, 
            and care right to your doorstep. We're not just selling products; we're building 
            a healthier tomorrow.
          </p>
          
          {/* Floating Statistics */}
          <div className="nt-floating-stats">
            <div className="nt-stat-item stagger-item">
              <div className="nt-stat-number">5000+</div>
              <div className="nt-stat-label">Happy Families</div>
            </div>
            <div className="nt-stat-item stagger-item">
              <div className="nt-stat-number">100+</div>
              <div className="nt-stat-label">Products</div>
            </div>
            <div className="nt-stat-item stagger-item">
              <div className="nt-stat-number">50+</div>
              <div className="nt-stat-label">Cities</div>
            </div>
          </div>

          <div className="nt-hero-wave">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0,50 C240,80 480,20 720,50 C960,80 1200,20 1440,50 L1440,100 L0,100 Z" fill="#f0f7f4"/>
            </svg>
          </div>
        </section>

        {/* ── OUR STORY ── */}
        <section className="nt-section">
          <div className="nt-tag animate-slideLeft">Our Story</div>
          <div className="nt-story-grid">
            <div className="animate-slideLeft">
              <h2 className="nt-heading">From a Dream to Reality: The NT Healthcare Journey</h2>
              <p className="nt-body">
                It all started in early 2025 when Neha and Trilok noticed a gap in the healthcare market. 
                People wanted genuine, high-quality products but often ended up with counterfeit or 
                overpriced alternatives. That's when they decided to take matters into their own hands.
              </p>
              <p className="nt-body">
                With combined experience in healthcare and customer service, they built NT Healthcare 
                from the ground up. Today, we serve thousands of happy customers across 50+ cities, 
                maintaining the same trust and transparency we started with.
              </p>
              <p className="nt-body">
                Our mission is simple: make premium healthcare accessible to every Indian family 
                without breaking the bank. Every product in our catalog goes through rigorous quality 
                checks before reaching your doorstep.
              </p>
            </div>
            
            {/* Story Images */}
            <div className="nt-story-images animate-slideRight">
              <div className="nt-story-image">
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Healthcare products" />
              </div>
              <div className="nt-story-image">
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Medical supplies" />
              </div>
              <div className="nt-story-image">
                <img src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Healthcare delivery" />
              </div>
            </div>
          </div>

          {/* Founders Section */}
          <div className="nt-tag" style={{ marginTop: 60 }}>Meet The Founders</div>
          <h2 className="nt-heading">The Visionaries Behind NT Healthcare</h2>
          <div className="nt-founders">
            <div className="nt-founder-card stagger-item">
              <div className="nt-founder-avatar animate-float">N</div>
              <div className="nt-founder-name">Neha</div>
              <div className="nt-founder-role">Co-Founder & CEO</div>
              <div className="nt-founder-quote">
                "Healthcare should be about care, not commerce. We're here to change that narrative."
              </div>
            </div>
            
            <div className="nt-founder-card stagger-item">
              <div className="nt-founder-avatar animate-float">T</div>
              <div className="nt-founder-name">Trilok</div>
              <div className="nt-founder-role">Co-Founder & COO</div>
              <div className="nt-founder-quote">
                "Every product we sell is a product we'd use for our own family. That's our promise."
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="nt-tag" style={{ marginTop: 60 }}>Our Core Values</div>
          <h2 className="nt-heading">What Drives Us Every Day</h2>
          <div className="nt-values-grid">
            <div className="nt-value-card stagger-item">
              <div className="nt-value-icon animate-float"><FaShieldAlt /></div>
              <h3>100% Authentic</h3>
              <p>Every product is verified and sourced directly from manufacturers. No middlemen, no compromises.</p>
            </div>
            
            <div className="nt-value-card stagger-item">
              <div className="nt-value-icon animate-float"><FaHeartbeat /></div>
              <h3>Health First</h3>
              <p>Your wellbeing is our priority. We carefully curate products that actually make a difference.</p>
            </div>
            
            <div className="nt-value-card stagger-item">
              <div className="nt-value-icon animate-float"><FaLeaf /></div>
              <h3>Affordable Care</h3>
              <p>Quality healthcare shouldn't be a luxury. We maintain competitive prices without cutting corners.</p>
            </div>
            
            <div className="nt-value-card stagger-item">
              <div className="nt-value-icon animate-float"><FaTruck /></div>
              <h3>Fast Delivery</h3>
              <p>Nationwide shipping with real-time tracking. Your health needs reach you when you need them.</p>
            </div>
            
            <div className="nt-value-card stagger-item">
              <div className="nt-value-icon animate-float"><FaAward /></div>
              <h3>Quality Assured</h3>
              <p>Rigorous quality checks at every stage. We don't just meet standards; we set them.</p>
            </div>
            
            <div className="nt-value-card stagger-item">
              <div className="nt-value-icon animate-float"><FaUsers /></div>
              <h3>Customer First</h3>
              <p>24/7 support and easy returns. Because your satisfaction matters as much as your health.</p>
            </div>
            <div className="nt-value-card stagger-item">
  <div className="nt-value-icon animate-float"><FaHeadSideVirus /></div>
  <h3>Expert Guidance</h3>
  <p>Consult with healthcare professionals for personalized product recommendations and wellness advice.</p>
</div>

<div className="nt-value-card stagger-item">
  <div className="nt-value-icon animate-float"><FaHandsHelping /></div>
  <h3>Community Care</h3>
  <p>Join thousands of families who trust us for their healthcare needs. We grow together, we heal together.</p>
</div>
          </div>

          {/* Milestones */}
          <div className="nt-milestones">
            {MILESTONES.map((item, index) => (
              <div key={index} className="nt-milestone-item stagger-item">
                <div className="nt-milestone-icon"><item.icon /></div>
                <div className="nt-milestone-number">{item.number}</div>
                <div className="nt-milestone-label">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Product Showcase */}
          <div className="nt-product-showcase">
            <div className="nt-tag">Our Products</div>
            <h2 className="nt-heading">Healthcare You Can Trust</h2>
            <div className="nt-product-grid">
              {PRODUCT_IMAGES.map((img, index) => (
                <div key={index} className="nt-product-item stagger-item">
                  <img src={img} alt={`Healthcare product ${index + 1}`} />
                  <div className="nt-product-overlay">
                    <div className="nt-product-title">Premium Healthcare</div>
                    <div className="nt-product-category">Category {index + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="nt-testimonials">
            <div className="nt-tag">Testimonials</div>
            <h2 className="nt-heading">What Our Customers Say</h2>
            <div className="nt-testimonial-grid">
              {TESTIMONIALS.map((testimonial, index) => (
                <div key={index} className="nt-testimonial-card stagger-item">
                  <div className="nt-testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} style={{ color: '#ffc107' }} />
                    ))}
                  </div>
                  <div className="nt-testimonial-text">{testimonial.text}</div>
                  <div className="nt-testimonial-name">— {testimonial.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="nt-faq">
            <div className="nt-tag">FAQ</div>
            <h2 className="nt-heading">Frequently Asked Questions</h2>
            <div className="nt-faq-grid">
              <div className="nt-faq-item stagger-item">
                <div className="nt-faq-question">
                  <FaCheckCircle style={{ color: '#1a9e72' }} />
                  Are your products genuine?
                </div>
                <div className="nt-faq-answer">
                  Absolutely! We source directly from certified manufacturers and verify every batch.
                </div>
              </div>
              
              <div className="nt-faq-item stagger-item">
                <div className="nt-faq-question">
                  <FaCheckCircle style={{ color: '#1a9e72' }} />
                  Do you deliver pan-India?
                </div>
                <div className="nt-faq-answer">
                  Yes, we deliver to all major cities and towns across India with tracking.
                </div>
              </div>
              
              <div className="nt-faq-item stagger-item">
                <div className="nt-faq-question">
                  <FaCheckCircle style={{ color: '#1a9e72' }} />
                  What's your return policy?
                </div>
                <div className="nt-faq-answer">
                  7-day easy returns if product is unused and in original packaging.
                </div>
              </div>
              
              <div className="nt-faq-item stagger-item">
                <div className="nt-faq-question">
                  <FaCheckCircle style={{ color: '#1a9e72' }} />
                  Do you have customer support?
                </div>
                <div className="nt-faq-answer">
                  Yes! You can reach us via WhatsApp, call, or Instagram. We respond within 2 hours.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ── */}
        <section className="nt-cta-section">
          <div className="nt-cta-content">
            <h2>Let's Connect & Chat 💚</h2>
            <p>
              Have questions about our products? Need help choosing the right healthcare solution? 
              We're just a message away!
            </p>
            <div className="nt-cta-btns">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nt-btn nt-btn-whatsapp"
              >
                <FaWhatsapp size={20} />
                WhatsApp Us
              </a>

              <a
                href={CALL_URL}
                className="nt-btn nt-btn-call"
              >
                <FaPhone size={17} />
                Call Now
              </a>

              <a
                href={INSTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nt-btn nt-btn-insta"
              >
                <FaInstagram size={20} />
                Follow on Instagram
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}