import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Info, Package, Search, Menu, X, Sparkles, ChevronDown, Heart, ShoppingBag, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { logout } from '../redux/slices/userSlice';
import { LogOut } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // All products data for search (with images)
  const allProducts = [
    // Electronics
    { id: 'e1', name: 'Aura Pro Headphones', category: 'electronics', price: 299.99, rating: 5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80' },
    { id: 'e2', name: 'Quantum Smart Watch', category: 'electronics', price: 449.99, rating: 4, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80' },
    { id: 'e3', name: 'Prism 4K Camera', category: 'electronics', price: 899.99, rating: 5, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=200&q=80' },
    { id: 'e4', name: 'Vortex BT Speaker', category: 'electronics', price: 159.99, rating: 4, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=200&q=80' },
    { id: 'e5', name: 'NovaPad Pro Tablet', category: 'electronics', price: 649.99, rating: 5, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=200&q=80' },
    { id: 'e7', name: 'Zenith Wireless Earbuds', category: 'electronics', price: 129.99, rating: 5, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=200&q=80' },
    { id: 'e8', name: 'KeyMech RGB Keyboard', category: 'electronics', price: 149.99, rating: 4, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80' },
    // Fashion
    { id: 'f1', name: 'Luxe Trench Coat', category: 'fashion', price: 349.99, rating: 5, image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=200&q=80' },
    { id: 'f2', name: 'Silk Evening Dress', category: 'fashion', price: 229.99, rating: 5, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=200&q=80' },
    { id: 'f3', name: 'Classic Oxford Shirt', category: 'fashion', price: 89.99, rating: 4, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=200&q=80' },
    { id: 'f5', name: 'Cashmere Knit Sweater', category: 'fashion', price: 189.99, rating: 5, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=200&q=80' },
    { id: 'f6', name: 'Premium Leather Belt', category: 'fashion', price: 69.99, rating: 4, image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=200&q=80' },
    { id: 'f9', name: 'Chelsea Suede Boots', category: 'fashion', price: 159.99, rating: 5, image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=200&q=80' },
    // Kitchen
    { id: 'k1', name: 'Zenith Espresso Maker', category: 'kitchen', price: 899.99, rating: 5, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=200&q=80' },
    { id: 'k2', name: 'Cast Iron Dutch Oven', category: 'kitchen', price: 249.99, rating: 4, image: 'https://images.unsplash.com/photo-1585540083814-ea6ee8af9e4f?auto=format&fit=crop&w=200&q=80' },
    { id: 'k5', name: 'Smart Air Fryer XL', category: 'kitchen', price: 199.99, rating: 5, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=200&q=80' },
    // Beauty
    { id: 'b1', name: 'Glow Serum 30ml', category: 'beauty', price: 89.99, rating: 5, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=200&q=80' },
    { id: 'b2', name: 'Rose Gold Palette', category: 'beauty', price: 64.99, rating: 4, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=200&q=80' },
    { id: 'b5', name: 'Jade Face Roller', category: 'beauty', price: 39.99, rating: 5, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=200&q=80' },
    { id: 'b6', name: 'Luxury Perfume Set', category: 'beauty', price: 149.99, rating: 5, image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=200&q=80' },
    // Health
    { id: 'h1', name: 'Adjustable Dumbbells', category: 'health', price: 299.99, rating: 5, image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=200&q=80' },
    { id: 'h2', name: 'Yoga Pro Mat', category: 'health', price: 89.99, rating: 5, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=200&q=80' },
    { id: 'h3', name: 'Smart Fitness Band', category: 'health', price: 149.99, rating: 4, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=200&q=80' },
    // Sports
    { id: 's1', name: 'Pro Running Shoes', category: 'sports', price: 189.99, rating: 5, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80' },
    { id: 's2', name: 'Carbon Fibre Bike', category: 'sports', price: 2499.99, rating: 5, image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=200&q=80' },
    { id: 's7', name: 'Elite Tennis Racket', category: 'sports', price: 149.99, rating: 5, image: 'https://images.unsplash.com/photo-1595435064214-0dfdf28a694c?auto=format&fit=crop&w=200&q=80' },
    // Grocery
    { id: 'g1', name: 'Organic Honey 500g', category: 'grocery', price: 14.99, rating: 5, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=200&q=80' },
    { id: 'g2', name: 'Premium Arabica Coffee', category: 'grocery', price: 19.99, rating: 5, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=200&q=80' },
    // Decor
    { id: 'd1', name: 'Minimalist Floor Lamp', category: 'decor', price: 189.99, rating: 5, image: 'https://images.unsplash.com/photo-1507473885765-e6ed657f9971?auto=format&fit=crop&w=200&q=80' },
    { id: 'd3', name: 'Ceramic Vase Set', category: 'decor', price: 79.99, rating: 4, image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=200&q=80' },
    // Pets
    { id: 'p1', name: 'Orthopedic Dog Bed', category: 'pets', price: 129.99, rating: 5, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=200&q=80' },
    { id: 'p2', name: 'Interactive Cat Toy', category: 'pets', price: 34.99, rating: 4, image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=200&q=80' },
  ];

  const categoryEmojis = { electronics: '⚡', fashion: '👗', kitchen: '🍳', beauty: '✨', health: '💪', sports: '🏀', grocery: '🍎', decor: '🏠', pets: '🐾' };

  const handleAddFromSearch = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart({
      product: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: 1,
    }));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setShowDropdown(false);
    setSearchQuery('');
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length >= 1) {
      const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);
      setSearchResults(filtered);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleSearchSelect = (product) => {
    setShowDropdown(false);
    setSearchQuery('');
    navigate(`/category/${product.category}`);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      handleSearchSelect(searchResults[0]);
    }
    if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const categories = [
    { name: 'Electronics', emoji: '⚡' },
    { name: 'Fashion', emoji: '👗' },
    { name: 'Kitchen', emoji: '🍳' },
    { name: 'Beauty', emoji: '✨' },
    { name: 'Health', emoji: '💪' },
    { name: 'Sports', emoji: '🏀' },
    { name: 'Grocery', emoji: '🍎' },
    { name: 'Decor', emoji: '🏠' },
    { name: 'Pets', emoji: '🐾' },
  ];

  const navLinks = [
    { icon: <Info size={18} />, label: 'About', path: '/about' },
    { icon: <Package size={18} />, label: 'Orders', path: '/orders' },
  ];

  const { userInfo } = useSelector((state) => state.user);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Promo Banner */}
        <AnimatePresence>
          {!scrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'linear-gradient(90deg, #6366f1, #a855f7, #6366f1)',
                backgroundSize: '200% 100%',
                animation: 'shimmer-slide 5s linear infinite',
                overflow: 'hidden',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.5rem',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '0.03em',
              }}>
                <Sparkles size={14} />
                <span>FREE SHIPPING ON ORDERS OVER $99 — USE CODE: LUXE2026</span>
                <Sparkles size={14} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navbar */}
        <div style={{
          background: scrolled
            ? 'rgba(255, 255, 255, 0.75)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: scrolled
            ? '1px solid rgba(0, 0, 0, 0.06)'
            : '1px solid rgba(0, 0, 0, 0.04)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'
            : 'none',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}>
          <div className="container" style={{
            display: 'flex',
            alignItems: 'center',
            padding: scrolled ? '0.65rem 2rem' : '1rem 2rem',
            justifyContent: 'space-between',
            transition: 'padding 0.4s ease',
          }}>

            {/* Logo */}
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
            }}>
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{
                  width: '38px',
                  height: '38px',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: '900',
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.35)',
                }}
              >
                H
              </motion.div>
              <div>
                <span style={{
                  fontSize: '1.3rem',
                  fontWeight: '900',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #1a1a2e, #6366f1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  HAPYSHOPY
                </span>
                <div style={{
                  fontSize: '0.55rem',
                  fontWeight: '700',
                  letterSpacing: '0.15em',
                  color: '#a855f7',
                  marginTop: '-2px',
                }}>
                  PREMIUM STORE
                </div>
              </div>
            </Link>

            {/* Search Bar */}
            <motion.div
              ref={searchRef}
              animate={{ width: searchFocused ? '45%' : '35%' }}
              transition={{ duration: 0.3 }}
              style={{ position: 'relative', margin: '0 2rem' }}
            >
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <motion.div
                  animate={{ color: searchFocused ? '#6366f1' : '#94a3b8' }}
                  style={{ position: 'absolute', left: '1.25rem', zIndex: 2, display: 'flex' }}
                >
                  <Search size={18} />
                </motion.div>
                <input
                  type="text"
                  placeholder="Search products, categories..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => { setSearchFocused(true); if (searchQuery) setShowDropdown(true); }}
                  onKeyDown={handleSearchKeyDown}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem 0.85rem 3.25rem',
                    borderRadius: '1rem',
                    border: searchFocused ? '2px solid #6366f1' : '2px solid #f1f5f9',
                    backgroundColor: searchFocused ? '#fff' : '#f8fafc',
                    fontSize: '0.875rem',
                    color: '#0f172a',
                    outline: 'none',
                    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                    boxShadow: searchFocused ? '0 0 0 4px rgba(99, 102, 241, 0.1), 0 8px 24px rgba(99, 102, 241, 0.12)' : 'none',
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(''); setSearchResults([]); setShowDropdown(false); }}
                    style={{ position: 'absolute', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Dropdown Results */}
              <AnimatePresence>
                {showDropdown && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      left: 0,
                      right: 0,
                      background: '#fff',
                      borderRadius: '1.25rem',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                      border: '1px solid #e0e7ff',
                      overflow: 'hidden',
                      zIndex: 1000,
                      maxHeight: '480px',
                      overflowY: 'auto',
                    }}
                  >
                    <div style={{ padding: '0.6rem 1.25rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                      </span>
                    </div>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.85rem',
                          padding: '0.85rem 1.25rem',
                          borderBottom: '1px solid #f8fafc',
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#f5f3ff'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                        onMouseDown={() => handleSearchSelect(product)}
                      >
                        {/* Product Image */}
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: '52px', height: '52px', borderRadius: '0.75rem', objectFit: 'cover', flexShrink: 0, border: '1px solid #f1f5f9' }}
                          onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${product.id}/100/100`; }}
                        />
                        {/* Product Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '0.875rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '600', textTransform: 'capitalize' }}>{categoryEmojis[product.category]} {product.category}</span>
                            <span style={{ color: '#e2e8f0' }}>·</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                              {[...Array(product.rating)].map((_, i) => (
                                <Star key={i} size={10} fill="#f59e0b" color="#f59e0b" />
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Price */}
                        <span style={{ fontSize: '1rem', fontWeight: '900', color: '#6366f1', flexShrink: 0 }}>${product.price}</span>
                        {/* Add to Cart */}
                        <button
                          onMouseDown={(e) => { e.stopPropagation(); handleAddFromSearch(e, product); }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '0.3rem',
                            background: '#6366f1', color: '#fff', border: 'none',
                            borderRadius: '0.6rem', padding: '0.45rem 0.7rem',
                            fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer',
                            flexShrink: 0, transition: 'background 0.15s',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#4f46e5'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = '#6366f1'; }}
                        >
                          <ShoppingBag size={12} /> Add
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
                {showDropdown && searchResults.length === 0 && searchQuery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      left: 0, right: 0,
                      background: '#fff',
                      borderRadius: '1.25rem',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                      border: '1px solid #e0e7ff',
                      padding: '2rem 1.5rem',
                      textAlign: 'center',
                      zIndex: 1000,
                    }}
                  >
                    <Search size={28} color="#e2e8f0" style={{ marginBottom: '0.5rem' }} />
                    <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '700' }}>No products found for "{searchQuery}"</p>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>Try a different keyword or browse categories</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right Actions */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 1rem',
                    borderRadius: '0.75rem',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: isActive(item.path) ? '#6366f1' : '#64748b',
                    background: isActive(item.path) ? '#f5f3ff' : 'transparent',
                    transition: 'all 0.25s ease',
                    textDecoration: 'none',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.color = '#6366f1';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#64748b';
                    }
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Wishlist */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/wishlist"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '42px',
                    height: '42px',
                    borderRadius: '0.75rem',
                    color: '#64748b',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fff1f2';
                    e.currentTarget.style.color = '#f43f5e';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#64748b';
                  }}
                >
                  <Heart size={20} />
                </Link>
              </motion.div>

              {/* Cart */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/cart"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: '#f8fafc',
                    padding: '0.55rem 1.15rem',
                    borderRadius: '0.75rem',
                    color: '#0f172a',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    position: 'relative',
                    border: '1px solid #f1f5f9',
                    transition: 'all 0.25s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f5f3ff';
                    e.currentTarget.style.borderColor = '#e0e7ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.borderColor = '#f1f5f9';
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <ShoppingCart size={20} />
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-10px',
                        background: cartCount > 0 ? 'linear-gradient(135deg, #f43f5e, #ec4899)' : 'linear-gradient(135deg, #94a3b8, #64748b)',
                        color: '#fff',
                        fontSize: '0.6rem',
                        fontWeight: '800',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #fff',
                        boxShadow: '0 2px 8px rgba(244, 63, 94, 0.4)',
                      }}
                    >
                      {cartCount}
                    </motion.span>
                  </div>
                  <span>Cart</span>
                </Link>
              </motion.div>

              {/* User / Sign In */}
              {userInfo ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 1rem',
                    borderRadius: '0.75rem',
                    background: '#f1f5f9',
                    color: '#1a1a1a',
                    fontWeight: '700',
                    fontSize: '0.85rem'
                  }}>
                    <User size={16} color="#6366f1" />
                    {userInfo.name.split(' ')[0]}
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logoutHandler}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '42px',
                      height: '42px',
                      borderRadius: '0.75rem',
                      color: '#64748b',
                      transition: 'all 0.25s ease',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.color = '#ef4444'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; }}
                  >
                    <LogOut size={18} />
                  </motion.button>
                </div>
              ) : (
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/login"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      color: '#fff',
                      padding: '0.6rem 1.4rem',
                      borderRadius: '0.75rem',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      boxShadow: '0 4px 15px rgba(99, 102, 241, 0.35)',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                    }}
                  >
                    <User size={16} />
                    Sign In
                  </Link>
                </motion.div>
              )}
            </nav>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div style={{
          background: scrolled
            ? 'rgba(255,255,255,0.85)'
            : '#fff',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
          transition: 'all 0.3s ease',
        }}>
          <div className="container" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.5rem 2rem',
          }}>
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/category/${cat.name.toLowerCase()}`}
                onMouseEnter={() => setActiveCategory(cat.name)}
                onMouseLeave={() => setActiveCategory(null)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.55rem 1.1rem',
                  borderRadius: '0.6rem',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  color: activeCategory === cat.name ? '#6366f1' : '#64748b',
                  background: activeCategory === cat.name ? '#f5f3ff' : 'transparent',
                  transition: 'all 0.25s ease',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontSize: '0.9rem' }}>{cat.emoji}</span>
                {cat.name}
                {activeCategory === cat.name && (
                  <motion.div
                    layoutId="category-underline"
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '20px',
                      height: '2.5px',
                      borderRadius: '2px',
                      background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                    }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Inject shimmer-slide keyframes */}
      <style>{`
        @keyframes shimmer-slide {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </>
  );
};

export default Header;
