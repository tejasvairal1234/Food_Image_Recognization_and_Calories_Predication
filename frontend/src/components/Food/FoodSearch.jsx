import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { FiSearch, FiAlertTriangle } from 'react-icons/fi';
import { foodAPI } from '../../services/api';

/**
 * FoodSearch Component
 * Modern glass card search with gradient button
 */
const FoodSearch = ({ onSearchComplete }) => {
    const [foodName, setFoodName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!foodName.trim()) { setError('Please enter a food name'); return; }
        setLoading(true);
        setError('');
        try {
            const response = await foodAPI.searchFood({ foodName: foodName.trim() });
            if (response.data.success) {
                onSearchComplete(response.data.data);
                setFoodName('');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to search food. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="card-body p-4">
                <h5 style={{ fontWeight: 700, marginBottom: '1rem', color: 'inherit' }}>
                    <FiSearch style={{ marginRight: '8px', color: '#16a34a', verticalAlign: 'middle' }} />
                    Search Food by Name
                </h5>

                {error && (
                    <div className="alert alert-danger d-flex align-items-center gap-2 mb-3" role="alert">
                        <FiAlertTriangle style={{ flexShrink: 0 }} />{error}
                        <button type="button" className="btn-close ms-auto" onClick={() => setError('')} style={{ fontSize: '0.7rem' }} />
                    </div>
                )}

                <form onSubmit={handleSearch}>
                    <div className="mb-3">
                        <label className="form-label">Food Name</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="e.g. apple, pizza, chicken breast…"
                                value={foodName}
                                onChange={(e) => { setFoodName(e.target.value); setError(''); }}
                                disabled={loading}
                                style={{ paddingRight: '2.8rem' }}
                            />
                            <FiSearch style={{
                                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                                color: '#94a3b8', pointerEvents: 'none'
                            }} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading || !foodName.trim()}
                        style={{ padding: '0.7rem', fontSize: '1rem' }}
                    >
                        {loading ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Searching…
                            </>
                        ) : <><FiSearch style={{ marginRight: '6px', verticalAlign: 'middle' }} />Search Nutrition</>}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1rem', marginBottom: 0, color: '#94a3b8', fontSize: '0.8rem' }}>
                    Instant nutrition facts for any food worldwide
                </p>
            </div>
        </div>
    );
};

export default FoodSearch;
