import { Link, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiLogOut, FiUser, FiShield, FiActivity, FiZap } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

/**
 * Navigation Bar Component
 * Glassmorphism sticky navbar
 * – Guest:     Home | Login | Sign Up
 * – Auth user: Home | Predict Calories | History | [user chip] | Logout
 */
const NavBar = () => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="app-navbar" style={{ padding: '0.75rem 0' }}>
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">

                    {/* Brand */}
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FiActivity style={{ fontSize: '1.6rem', lineHeight: 1, color: '#16a34a' }} />
                        <span className="navbar-brand-text">Food Calorie Predictor</span>
                    </Link>

                    {/* Nav links + actions */}
                    <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end">
                        {isAuthenticated() ? (
                            <>
                                {/* Nav links */}
                                <Link to="/" className="nav-link-custom d-none d-md-inline">Home</Link>
                                <Link
                                    to="/predict"
                                    className="d-none d-md-inline"
                                    style={{
                                        textDecoration: 'none',
                                        background: 'linear-gradient(135deg,#16a34a,#22c55e)',
                                        color: '#fff',
                                        borderRadius: '9999px',
                                        padding: '0.38rem 1.1rem',
                                        fontWeight: 700,
                                        fontSize: '0.85rem',
                                        boxShadow: '0 4px 14px rgba(22,163,74,0.35)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <FiZap style={{ marginRight: '5px', verticalAlign: 'middle' }} />Predict Calories
                                </Link>
                                <Link to="/dashboard" className="nav-link-custom d-none d-md-inline">History</Link>
                                {isAdmin() && (
                                    <Link to="/admin" className="nav-link-custom d-none d-md-inline">
                                        <FiShield style={{ marginRight: '4px', verticalAlign: 'middle' }} />Admin
                                    </Link>
                                )}

                                {/* User chip */}
                                <div style={{
                                    background: 'rgba(240,253,244,0.9)', border: '1.5px solid #bbf7d0',
                                    borderRadius: '9999px', padding: '0.3rem 0.85rem',
                                    fontSize: '0.82rem', fontWeight: 600, color: '#15803d',
                                    display: 'flex', alignItems: 'center', gap: '5px'
                                }}>
                                    <FiUser size={13} />{user?.name}
                                </div>

                                {/* Theme toggle */}
                                <button onClick={toggleTheme} style={{
                                    background: 'rgba(255,255,255,0.7)', border: '1.5px solid #e2e8f0',
                                    borderRadius: '9999px', padding: '0.35rem 0.65rem',
                                    color: '#64748b', cursor: 'pointer'
                                }} title="Toggle theme">
                                    {isDarkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
                                </button>

                                {/* Logout */}
                                <button onClick={handleLogout} style={{
                                    background: 'linear-gradient(135deg,#dc2626,#ef4444)',
                                    border: 'none', borderRadius: '9999px',
                                    padding: '0.38rem 1rem', color: '#fff',
                                    fontWeight: 600, fontSize: '0.82rem',
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px'
                                }}>
                                    <FiLogOut size={14} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="nav-link-custom d-none d-md-inline">Home</Link>

                                {/* Theme toggle */}
                                <button onClick={toggleTheme} style={{
                                    background: 'rgba(255,255,255,0.7)', border: '1.5px solid #e2e8f0',
                                    borderRadius: '9999px', padding: '0.35rem 0.65rem',
                                    color: '#64748b', cursor: 'pointer'
                                }}>
                                    {isDarkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
                                </button>

                                <Link to="/login" style={{
                                    textDecoration: 'none', background: 'rgba(255,255,255,0.85)',
                                    border: '1.5px solid #bbf7d0', borderRadius: '9999px',
                                    padding: '0.38rem 1.1rem', fontWeight: 600,
                                    fontSize: '0.85rem', color: '#16a34a'
                                }}>Login</Link>

                                <Link to="/signup" style={{
                                    textDecoration: 'none',
                                    background: 'linear-gradient(135deg,#16a34a,#22c55e)',
                                    borderRadius: '9999px', padding: '0.38rem 1.1rem',
                                    fontWeight: 600, fontSize: '0.85rem', color: '#fff',
                                    boxShadow: '0 4px 14px rgba(22,163,74,0.35)'
                                }}>Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
