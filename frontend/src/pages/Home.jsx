import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { FiSearch, FiCalendar, FiCamera, FiCpu, FiBarChart2, FiZap } from 'react-icons/fi';
import { MdOutlineFoodBank } from 'react-icons/md';

/**
 * Home Page
 * – Guests    → landing page with Login / Register buttons
 * – Logged-in → same landing page with "Start Prediction" button
 *
 * The actual food analysis lives at /predict (Prediction.jsx)
 */
const Home = () => {
    const { isAuthenticated } = useAuth();
    const auth = isAuthenticated();

    return (
        <div>
            {/* ── Hero Section ── */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(21,128,61,0.92) 0%, rgba(22,163,74,0.85) 40%, rgba(249,115,22,0.80) 100%)',
                minHeight: '480px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', padding: '4rem 1.5rem',
                position: 'relative', overflow: 'hidden'
            }}>
                {/* Decorative blobs */}
                <div style={{
                    position: 'absolute', width: 420, height: 420, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)', top: -110, left: -110, pointerEvents: 'none'
                }} />
                <div style={{
                    position: 'absolute', width: 300, height: 300, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)', bottom: -80, right: -60, pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        fontSize: '3.5rem', marginBottom: '0.75rem', lineHeight: 1,
                        display: 'flex', justifyContent: 'center'
                    }}>
                        <MdOutlineFoodBank style={{ color: '#fff', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }} />
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800,
                        color: '#fff', marginBottom: '1rem', textShadow: '0 2px 12px rgba(0,0,0,0.15)'
                    }}>
                        FoodImgCalorie
                    </h1>
                    <p style={{
                        color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(1rem,2.5vw,1.2rem)',
                        maxWidth: 520, margin: '0 auto 2rem'
                    }}>
                        We Predict Calories From Food Image — Instant AI-powered nutrition analysis
                    </p>

                    {/* CTA buttons — different for guest vs logged-in */}
                    {auth ? (
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/predict" style={{
                                background: '#fff', color: '#16a34a', borderRadius: '9999px',
                                padding: '0.8rem 2.8rem', fontWeight: 800, fontSize: '1.05rem',
                                textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
                                transition: 'transform 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                            }}
                                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <FiSearch /> Start Prediction
                            </Link>
                            <Link to="/dashboard" style={{
                                background: 'transparent', color: '#fff',
                                border: '2px solid rgba(255,255,255,0.8)',
                                borderRadius: '9999px', padding: '0.8rem 2rem',
                                fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
                                transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                            }}
                                onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <FiCalendar /> View History
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/login" style={{
                                background: '#fff', color: '#16a34a', borderRadius: '9999px',
                                padding: '0.75rem 2.5rem', fontWeight: 800, fontSize: '1rem',
                                textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
                                transition: 'transform 0.2s', display: 'inline-block'
                            }}
                                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                LOGIN
                            </Link>
                            <Link to="/signup" style={{
                                background: 'transparent', color: '#fff',
                                border: '2px solid rgba(255,255,255,0.8)',
                                borderRadius: '9999px', padding: '0.75rem 2.5rem',
                                fontWeight: 800, fontSize: '1rem', textDecoration: 'none',
                                transition: 'all 0.2s', display: 'inline-block'
                            }}
                                onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                REGISTER
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* ── About Section ── */}
            <div className="home-about">
                <Container>
                    <Row className="align-items-center g-5">
                        <Col md={6}>
                            <h2 style={{ fontWeight: 800, color: 'inherit', marginBottom: '1rem' }}>
                                About Our Food Calorie Predictor
                            </h2>
                            <p style={{ color: 'var(--gray-500, #64748b)', lineHeight: 1.8, marginBottom: '1rem' }}>
                                Our application uses advanced AI technology to identify food items from images and
                                provide accurate nutritional information including calories, fat content, and energy value.
                                Simply upload an image of your food, and our system will do the rest!
                            </p>
                            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: 0 }}>
                                Whether you're tracking your daily calorie intake, following a diet plan, or just curious
                                about what you're eating, our tool makes it easy to stay informed about your nutrition.
                            </p>
                        </Col>
                        <Col md={6}>
                            <div style={{
                                borderRadius: '20px', overflow: 'hidden',
                                boxShadow: '0 20px 60px rgba(22,163,74,0.15)'
                            }}>
                                <img
                                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"
                                    alt="Healthy food"
                                    style={{ width: '100%', display: 'block', height: 280, objectFit: 'cover' }}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* ── How It Works ── */}
            <div className="home-howitworks">
                <Container>
                    <h2 style={{ textAlign: 'center', fontWeight: 800, marginBottom: '2.5rem', color: 'inherit' }}>
                        How It Works
                    </h2>
                    <Row className="g-4">
                        {[
                            { step: '1', Icon: FiCamera, title: 'Upload', desc: 'Take a photo of your food or upload an existing image.' },
                            { step: '2', Icon: FiCpu, title: 'Analyze', desc: 'Our AI system identifies the food and calculates nutritional information.' },
                            { step: '3', Icon: FiBarChart2, title: 'Results', desc: 'View detailed nutritional information for your food instantly.' },
                        ].map(item => (
                            <Col key={item.step} md={4}>
                                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', height: '100%' }}>
                                    <div style={{
                                        width: 64, height: 64, borderRadius: '50%',
                                        background: 'linear-gradient(135deg,#16a34a,#22c55e)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 1rem',
                                        boxShadow: '0 4px 16px rgba(22,163,74,0.3)'
                                    }}>
                                        <item.Icon style={{ fontSize: '1.8rem', color: '#fff' }} />
                                    </div>
                                    <h5 style={{ fontWeight: 700, color: 'inherit', marginBottom: '0.5rem' }}>
                                        {item.step}. {item.title}
                                    </h5>
                                    <p style={{ color: 'var(--gray-500, #64748b)', marginBottom: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>
                                        {item.desc}
                                    </p>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    {/* Bottom CTA */}
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        {auth ? (
                            <Link to="/predict" style={{
                                background: 'linear-gradient(135deg,#16a34a,#22c55e)',
                                color: '#fff', borderRadius: '9999px', padding: '0.9rem 3rem',
                                fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none',
                                boxShadow: '0 6px 20px rgba(22,163,74,0.4)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                            }}>
                                <FiZap /> Predict Now
                            </Link>
                        ) : (
                            <Link to="/signup" style={{
                                background: 'linear-gradient(135deg,#16a34a,#22c55e)',
                                color: '#fff', borderRadius: '9999px', padding: '0.9rem 3rem',
                                fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none',
                                boxShadow: '0 6px 20px rgba(22,163,74,0.4)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                            }}>
                                <FiZap /> Get Started Free
                            </Link>
                        )}
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Home;
