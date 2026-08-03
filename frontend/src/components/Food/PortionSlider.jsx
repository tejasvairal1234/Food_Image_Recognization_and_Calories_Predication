import { useState } from 'react';
import { FiSliders } from 'react-icons/fi';
import { PORTION_CONFIG } from '../../utils/constants';

/**
 * PortionSlider Component
 * Custom styled range slider with glass card
 */
const PortionSlider = ({ baseNutrition, onPortionChange }) => {
    const [portionSize, setPortionSize] = useState(PORTION_CONFIG.default);

    const handleSliderChange = (e) => {
        const newPortion = parseFloat(e.target.value);
        setPortionSize(newPortion);
        const adjusted = {
            calories: Math.round(baseNutrition.calories * newPortion),
            protein: Math.round(baseNutrition.protein * newPortion * 10) / 10,
            carbs: Math.round(baseNutrition.carbs * newPortion * 10) / 10,
            fat: Math.round(baseNutrition.fat * newPortion * 10) / 10,
            sugar: Math.round(baseNutrition.sugar * newPortion * 10) / 10,
            fiber: Math.round(baseNutrition.fiber * newPortion * 10) / 10,
            sodium: Math.round(baseNutrition.sodium * newPortion * 10) / 10,
        };
        onPortionChange(newPortion, adjusted);
    };

    const pct = ((portionSize - PORTION_CONFIG.min) / (PORTION_CONFIG.max - PORTION_CONFIG.min)) * 100;

    return (
        <div className="card mb-4">
            <div className="card-body p-4">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h6 style={{ fontWeight: 700, color: 'inherit', margin: 0 }}><FiSliders style={{ marginRight: '6px', verticalAlign: 'middle', color: '#16a34a' }} />Adjust Portion Size</h6>
                    <span className="portion-badge">{portionSize}x</span>
                </div>

                <input
                    type="range"
                    className="form-range w-100"
                    min={PORTION_CONFIG.min}
                    max={PORTION_CONFIG.max}
                    step={PORTION_CONFIG.step}
                    value={portionSize}
                    onChange={handleSliderChange}
                    style={{
                        background: `linear-gradient(to right, #22c55e ${pct}%, #e2e8f0 ${pct}%)`
                    }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>{PORTION_CONFIG.min}x</span>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Based on 100g serving</span>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>{PORTION_CONFIG.max}x</span>
                </div>
            </div>
        </div>
    );
};

export default PortionSlider;
