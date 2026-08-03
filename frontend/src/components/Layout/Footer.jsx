import { useState } from 'react';
import { FiMapPin, FiMail, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';

/**
 * Footer Component
 * Dark footer with Contact Info + Contact Form (matching reference design)
 */
const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSend = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSent(false), 4000);
    };

    const inputStyle = {
        width: '100%',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '6px',
        padding: '0.6rem 0.9rem',
        color: 'rgba(255,255,255,0.85)',
        fontSize: '0.9rem',
        outline: 'none',
        marginBottom: '0.75rem',
    };

    return (
        <footer style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 60%, #1a2e1a 100%)',
            padding: '3rem 0 0',
            marginTop: 'auto'
        }}>
            <div className="container">
                <div className="row g-5 pb-4">

                    {/* ── Left: Contact Info ── */}
                    <div className="col-md-5">
                        <h5 style={{
                            fontWeight: 800, letterSpacing: '0.12em',
                            color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase'
                        }}>
                            Contact Info
                        </h5>

                        {[
                            {
                                Icon: MdOutlineSchool,
                                content: (
                                    <>
                                        <span style={{ color: '#f97316', fontWeight: 600 }}>Sanjivani </span>
                                        <span style={{ color: '#ffffffff', fontWeight: 600 }}>College of </span>
                                        <span style={{ color: '#22c55e', fontWeight: 600 }}>Engineering</span>
                                    </>
                                )
                            },
                            { Icon: FiMapPin, content: <span style={{ color: 'rgba(255,255,255,0.75)' }}>Kopargaon, Maharashtra</span> },
                            {
                                Icon: FiMail,
                                content: (
                                    <span style={{ color: 'rgba(255,255,255,0.75)' }}>
                                        Email: <a href="mailto:tejasvairal7066@gmail.com" style={{ color: '#93c5fd', textDecoration: 'none' }}>
                                            tejasvairal7066@gmail.com
                                        </a>
                                    </span>
                                )
                            },
                            { Icon: FiPhone, content: <span style={{ color: 'rgba(255,255,255,0.75)' }}>Phone: +91 1234567890</span> },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', marginBottom: '0.9rem', fontSize: '0.92rem' }}>
                                <item.Icon style={{ flexShrink: 0, fontSize: '1rem', marginTop: '2px', color: '#4ade80' }} />
                                <span>{item.content}</span>
                            </div>
                        ))}
                    </div>

                    {/* ── Right: Contact Form ── */}
                    <div className="col-md-7">
                        <h5 style={{
                            fontWeight: 800, letterSpacing: '0.12em',
                            color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase'
                        }}>
                            Contact Form
                        </h5>

                        {sent ? (
                            <div style={{
                                background: 'rgba(22,163,74,0.15)', border: '1.5px solid #16a34a',
                                borderRadius: '10px', padding: '1.25rem', color: '#4ade80',
                                fontWeight: 600, textAlign: 'center',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                            }}>
                                <FiCheckCircle style={{ fontSize: '1.2rem' }} />
                                Message sent! We'll get back to you soon.
                            </div>
                        ) : (
                            <form onSubmit={handleSend}>
                                <input
                                    name="name" value={form.name} onChange={handleChange}
                                    placeholder="Name" required style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = 'rgba(34,197,94,0.5)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                                />
                                <input
                                    name="email" type="email" value={form.email} onChange={handleChange}
                                    placeholder="Email" required style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = 'rgba(34,197,94,0.5)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                                />
                                <input
                                    name="subject" value={form.subject} onChange={handleChange}
                                    placeholder="Subject" style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = 'rgba(34,197,94,0.5)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                                />
                                <textarea
                                    name="message" value={form.message} onChange={handleChange}
                                    placeholder="Message" required rows={4} style={{ ...inputStyle, resize: 'vertical', marginBottom: '1rem' }}
                                    onFocus={e => e.target.style.borderColor = 'rgba(34,197,94,0.5)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                                />
                                <button type="submit" style={{
                                    background: 'linear-gradient(135deg,#06b6d4,#0ea5e9)',
                                    color: '#fff', border: 'none', borderRadius: '6px',
                                    padding: '0.6rem 2rem', fontWeight: 700,
                                    fontSize: '0.9rem', cursor: 'pointer', letterSpacing: '0.08em',
                                    boxShadow: '0 4px 14px rgba(6,182,212,0.4)',
                                    transition: 'all 0.2s'
                                }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    SEND
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* ── Bottom copyright bar ── */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    padding: '1rem 0',
                    textAlign: 'center',
                    fontSize: '0.82rem',
                    color: 'rgba(255,255,255,0.5)'
                }}>
                    © {currentYear} .{' '}
                    <span style={{ color: '#f97316', fontWeight: 600 }}>All Rights Reserved</span>
                    {' '}| Design by Group no. 03 Batch of 2025
                </div>
            </div>
        </footer>
    );
};

export default Footer;
