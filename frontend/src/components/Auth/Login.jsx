import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiActivity, FiAlertTriangle, FiLogIn } from 'react-icons/fi';

/**
 * Login Component
 * Glassmorphism login card on gradient background
 */
const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const result = await login(formData.email, formData.password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="auth-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="auth-card fade-in-up">
                            <div className="text-center mb-4">
                                <div className="auth-logo">
                                    <FiActivity style={{ fontSize: '2.5rem', color: '#16a34a' }} />
                                </div>
                                <h2 className="auth-title">Welcome back!</h2>
                                <p className="auth-subtitle">Sign in to track your nutrition</p>
                            </div>

                            {error && (
                                <div className="alert alert-danger d-flex align-items-center gap-2 mb-4" role="alert">
                                    <FiAlertTriangle style={{ flexShrink: 0 }} /> {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mb-3"
                                    style={{ padding: '0.75rem', fontSize: '1rem' }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Signing in...
                                        </span>
                                    ) : (
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                            <FiLogIn /> Sign In
                                        </span>
                                    )}
                                </button>

                                <div className="text-center">
                                    <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                                        Don't have an account?{' '}
                                        <Link to="/signup" style={{ color: '#16a34a', fontWeight: 700, textDecoration: 'none' }}>
                                            Sign up free →
                                        </Link>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
