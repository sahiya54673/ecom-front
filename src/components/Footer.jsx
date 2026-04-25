import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#f8fafc',
      color: 'var(--text-muted)',
      padding: '8rem 0 4rem',
      borderTop: '1px solid var(--border-color)'
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
        {/* Brand Info */}
        <div style={{ maxWidth: '350px' }}>
          <h2 style={{ color: 'var(--primary-color)', fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>HAPYSHOPY</h2>
          <p style={{ lineHeight: '1.8', fontSize: '0.95rem', marginBottom: '2.5rem', color: 'var(--text-muted)' }}>
            Elevating your daily experience with curated premium goods and an uncompromising commitment to design and quality.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
              <a key={i} href="#" style={{ 
                width: '40px', 
                height: '40px', 
                background: '#fff', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'var(--text-muted)', 
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s' 
              }} 
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--primary-color)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }} 
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '2rem', fontSize: '1rem', fontWeight: '800' }}>Explore</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty & Health', 'Sports & Outdoors'].map(item => (
              <li key={item}>
                <Link to="#" style={{ fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = 'var(--primary-color)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Navigation */}
        <div>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '2rem', fontSize: '1rem', fontWeight: '800' }}>Company</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['About Us', 'Sustainability', 'Journal', 'Shipping Policy', 'Contact Support'].map(item => (
              <li key={item}>
                <Link to="#" style={{ fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = 'var(--primary-color)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1rem', fontWeight: '800' }}>Visit Us</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--primary-color)', marginTop: '0.2rem' }}><MapPin size={18} /></div>
              <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>123 Design District<br />Greater London, EC1V 4AD</span>
            </li>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ color: 'var(--primary-color)' }}><Mail size={18} /></div>
              <span style={{ fontSize: '0.9rem' }}>hello@hapyshopy.com</span>
            </li>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ color: 'var(--primary-color)' }}><Phone size={18} /></div>
              <span style={{ fontSize: '0.9rem' }}>+1 (555) 000-0000</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          &copy; {new Date().getFullYear()} HAPYSHOPY. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8' }}>
          <Link to="#" onMouseEnter={f => f.target.style.color='var(--primary-color)'} onMouseLeave={f => f.target.style.color='#94a3b8'}>Privacy Policy</Link>
          <Link to="#" onMouseEnter={f => f.target.style.color='var(--primary-color)'} onMouseLeave={f => f.target.style.color='#94a3b8'}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
