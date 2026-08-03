import { useState, useEffect } from 'react';
import { FiTrash2, FiCalendar, FiClock, FiZap } from 'react-icons/fi';
import { MdOutlineFoodBank } from 'react-icons/md';
import { foodAPI } from '../../services/api';

/**
 * History Component
 * Modern glass history cards in responsive grid
 */
const History = () => {
    const [foodLogs, setFoodLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => { fetchHistory(); }, [page]);

    const fetchHistory = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await foodAPI.getHistory(page, 12);
            if (response.data.success) {
                setFoodLogs(response.data.data);
                setTotalPages(response.data.pagination.totalPages);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load history');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this entry?')) return;
        try {
            await foodAPI.deleteFoodLog(id);
            fetchHistory();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete entry');
        }
    };

    const formatDate = (dateString) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                <div className="spinner-border" role="status" style={{ width: 40, height: 40 }} />
                <p style={{ marginTop: '1rem', color: '#94a3b8', fontWeight: 500 }}>Loading your history…</p>
            </div>
        );
    }

    return (
        <div className="fade-in-up">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{display: 'inline'}}><FiCalendar style={{ verticalAlign: 'middle', color: '#16a34a' }} /></h3>
                    <h3 style={{ display: 'inline', fontWeight: 800, margin: 0, background: 'linear-gradient(135deg,#16a34a,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                         Food History
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>Your nutrition tracking record</p>
                </div>
                <span style={{
                    background: 'rgba(240,253,244,0.9)', border: '1.5px solid #bbf7d0',
                    borderRadius: '9999px', padding: '0.35rem 1rem',
                    fontSize: '0.8rem', fontWeight: 700, color: '#15803d'
                }}>
                    {foodLogs.length} entries
                </span>
            </div>

            {error && (
                <div className="alert alert-danger mb-4">{error}</div>
            )}

            {foodLogs.length === 0 ? (
                <div className="card text-center" style={{ padding: '4rem 2rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                        <MdOutlineFoodBank style={{ color: '#94a3b8' }} />
                    </div>
                    <h5 style={{ fontWeight: 700, color: 'inherit' }}>No food logs yet</h5>
                    <p style={{ color: '#94a3b8', marginBottom: 0 }}>Start by uploading or searching for food!</p>
                </div>
            ) : (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                        {foodLogs.map((log) => (
                            <div key={log._id} className="card h-100">
                                <div style={{ padding: '1.25rem' }}>
                                    {/* Header row */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <div>
                                            <h6 style={{ fontWeight: 700, textTransform: 'capitalize', margin: 0, color: 'inherit' }}>
                                                {log.foodName}
                                            </h6>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(log._id)}
                                            style={{
                                                background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.25)',
                                                borderRadius: '8px', color: '#ef4444',
                                                width: 32, height: 32, display: 'flex',
                                                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                                flexShrink: 0
                                            }}
                                            title="Delete entry"
                                        >
                                            <FiTrash2 size={14} />
                                        </button>
                                    </div>

                                    {/* Calorie highlight */}
                                    <div style={{
                                        background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)',
                                        borderRadius: '10px', padding: '0.6rem 0.85rem',
                                        marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px'
                                    }}>
                                        <FiZap style={{ fontSize: '1.1rem', color: '#f97316' }} />
                                        <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#16a34a' }}>
                                            {log.nutrition.calories}
                                        </span>
                                        <span style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 600 }}>kcal</span>
                                    </div>

                                    {/* Macro stats */}
                                    {[
                                        { label: 'Protein', val: `${log.nutrition.protein}g`, color: '#3b82f6' },
                                        { label: 'Carbs', val: `${log.nutrition.carbs}g`, color: '#f59e0b' },
                                        { label: 'Fat', val: `${log.nutrition.fat}g`, color: '#f97316' },
                                    ].map(m => (
                                        <div key={m.label} className="history-stat">
                                            <span style={{ color: 'var(--gray-500, #64748b)', fontSize: '0.85rem' }}>{m.label}</span>
                                            <span style={{ fontWeight: 700, color: m.color, fontSize: '0.85rem' }}>{m.val}</span>
                                        </div>
                                    ))}

                                    {/* Date */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '0.85rem', color: '#94a3b8', fontSize: '0.75rem' }}>
                                        <FiClock size={12} />
                                        {formatDate(log.createdAt)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginTop: '2rem' }}>
                            <button
                                className="btn btn-outline-primary btn-sm"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                ← Previous
                            </button>
                            <span style={{ color: 'var(--gray-500, #64748b)', fontWeight: 600, fontSize: '0.9rem' }}>
                                {page} / {totalPages}
                            </span>
                            <button
                                className="btn btn-outline-primary btn-sm"
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default History;
