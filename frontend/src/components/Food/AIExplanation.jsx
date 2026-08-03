import { FiCpu } from 'react-icons/fi';

/**
 * AIExplanation Component
 * Modern AI insight card with gradient accent border
 */
const AIExplanation = ({ explanation }) => {
    if (!explanation) return null;

    return (
        <div className="card fade-in-up" style={{
            borderLeft: '4px solid #16a34a !important',
            overflow: 'hidden'
        }}>
            {/* Top accent bar */}
            <div style={{
                height: '4px',
                background: 'linear-gradient(90deg, #16a34a, #22c55e, #f97316)'
            }} />
            <div className="card-body p-4">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    {/* AI icon badge */}
                    <div style={{
                        width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg,#16a34a,#22c55e)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 14px rgba(22,163,74,0.35)'
                    }}>
                        <FiCpu style={{ fontSize: '1.5rem', color: '#fff' }} />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.4rem' }}>
                            <h6 style={{ fontWeight: 700, margin: 0, color: 'inherit' }}>
                                Why This Calorie Estimate?
                            </h6>
                            <span style={{
                                background: 'linear-gradient(135deg,#16a34a,#22c55e)',
                                color: '#fff', borderRadius: '9999px',
                                padding: '2px 8px', fontSize: '0.65rem', fontWeight: 700
                            }}>
                                AI INSIGHT
                            </span>
                        </div>
                        <p style={{ color: 'var(--gray-500, #64748b)', marginBottom: 0, fontSize: '0.9rem', lineHeight: 1.65 }}>
                            {explanation}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIExplanation;
