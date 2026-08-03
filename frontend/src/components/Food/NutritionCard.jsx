import { FiZap, FiActivity, FiPackage, FiDroplet, FiHeart, FiFeather, FiThermometer } from 'react-icons/fi';

/**
 * NutritionCard Component
 * Gradient hero calories + color-coded stat mini-cards
 */
const NutritionCard = ({ foodData }) => {
    if (!foodData) return null;
    const { foodName, nutrition, portionSize } = foodData;

    const stats = [
        { label: 'Protein', value: nutrition.protein, unit: 'g', color: '#3b82f6', bg: '#eff6ff', Icon: FiActivity },
        { label: 'Carbs', value: nutrition.carbs, unit: 'g', color: '#f59e0b', bg: '#fffbeb', Icon: FiPackage },
        { label: 'Fat', value: nutrition.fat, unit: 'g', color: '#f97316', bg: '#fff7ed', Icon: FiDroplet },
        { label: 'Sugar', value: nutrition.sugar, unit: 'g', color: '#ec4899', bg: '#fdf2f8', Icon: FiHeart },
        { label: 'Fiber', value: nutrition.fiber, unit: 'g', color: '#22c55e', bg: '#f0fdf4', Icon: FiFeather },
        { label: 'Sodium', value: nutrition.sodium, unit: 'mg', color: '#6366f1', bg: '#eef2ff', Icon: FiThermometer },
    ];

    return (
        <div className="card fade-in-up">
            <div className="card-body p-4">
                {/* Food name header */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <span style={{
                        fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
                        color: '#16a34a', textTransform: 'uppercase'
                    }}>DETECTED FOOD ITEM</span>
                    <h3 style={{ fontWeight: 800, fontSize: '1.75rem', color: 'inherit', marginBottom: '0.25rem', textTransform: 'capitalize' }}>
                        {foodName}
                    </h3>
                    <span style={{
                        background: 'rgba(240,253,244,0.9)', border: '1.5px solid #bbf7d0',
                        borderRadius: '9999px', padding: '0.25rem 0.85rem',
                        fontSize: '0.78rem', fontWeight: 600, color: '#15803d'
                    }}>
                        Portion: {portionSize}x
                    </span>
                </div>

                {/* Calories hero */}
                <div style={{
                    background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                    border: '1.5px solid #bbf7d0',
                    borderLeft: '4px solid #16a34a',
                    borderRadius: '14px', padding: '1rem 1.25rem', marginBottom: '1.25rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                    <div>
                        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                            TOTAL CALORIES
                        </p>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <span style={{ fontSize: '2.75rem', fontWeight: 800, color: '#16a34a', lineHeight: 1.1 }}>
                                {nutrition.calories}
                            </span>
                            <span style={{ fontSize: '1rem', fontWeight: 600, color: '#16a34a' }}>kcal</span>
                        </div>
                    </div>
                    <FiZap style={{ fontSize: '2.5rem', color: '#f97316' }} />
                </div>

                {/* Nutrition breakdown */}
                <h6 style={{ fontWeight: 700, marginBottom: '0.85rem', color: 'inherit' }}>Nutritional Breakdown</h6>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.65rem' }}>
                    {stats.map((s) => (
                        <div key={s.label} className="nutrition-stat" style={{ background: s.bg, border: `1.5px solid ${s.color}22` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '0.3rem' }}>
                                <s.Icon style={{ fontSize: '0.95rem', color: s.color }} />
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-500, #64748b)' }}>{s.label}</span>
                            </div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>
                                {s.value}<span style={{ fontSize: '0.75rem', fontWeight: 600, marginLeft: '2px' }}>{s.unit}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NutritionCard;
