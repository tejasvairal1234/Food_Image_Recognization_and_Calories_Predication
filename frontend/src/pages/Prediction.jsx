import { useState } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { FiSearch, FiCamera, FiSliders, FiBarChart2, FiRefreshCw, FiInfo, FiImage, FiType, FiCpu } from 'react-icons/fi';
import { MdOutlineFoodBank } from 'react-icons/md';
import ImageUpload from '../components/Food/ImageUpload';
import FoodSearch from '../components/Food/FoodSearch';
import NutritionCard from '../components/Food/NutritionCard';
import PortionSlider from '../components/Food/PortionSlider';
import AIExplanation from '../components/Food/AIExplanation';

/**
 * Prediction Page
 * Full food analysis: upload or search → get nutrition results
 */
const Prediction = () => {
    const [currentFood, setCurrentFood] = useState(null);

    const handleAnalysisComplete = (data) => {
        setCurrentFood(data);
    };

    const handlePortionChange = (portionSize, adjustedNutrition) => {
        if (currentFood) {
            setCurrentFood({ ...currentFood, portionSize, nutrition: adjustedNutrition });
        }
    };

    return (
        <div className="page-wrapper">
            <Container>
                {/* Page Header */}
                <div className="fade-in-up" style={{ marginBottom: '2rem' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(22,163,74,0.08), rgba(249,115,22,0.06))',
                        border: '1.5px solid rgba(22,163,74,0.15)',
                        borderRadius: '20px',
                        padding: '2rem 2.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}>
                        <div>
                            <h2 style={{
                                fontWeight: 800,
                                margin: 0,
                                background: 'linear-gradient(135deg,#16a34a,#f97316)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                display: 'flex', alignItems: 'center', gap: '0.5rem'
                            }}>
                                <FiSearch style={{ WebkitTextFillColor: '#16a34a' }} /> Predict Food Calories
                            </h2>
                            <p style={{ color: 'var(--gray-500, #64748b)', marginTop: '0.4rem', marginBottom: 0, fontSize: '0.95rem' }}>
                                Upload a food image or search by name to get instant AI-powered nutrition analysis
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            {[
                                { Icon: FiCamera, label: 'Image AI' },
                                { Icon: FiSearch, label: 'Search' },
                                { Icon: FiSliders, label: 'Portion Control' },
                                { Icon: FiBarChart2, label: 'Nutrition Breakdown' },
                            ].map(({ Icon, label }) => (
                                <span key={label} style={{
                                    background: 'rgba(240,253,244,0.9)',
                                    border: '1.5px solid #bbf7d0',
                                    borderRadius: '9999px',
                                    padding: '0.3rem 0.85rem',
                                    fontSize: '0.75rem', fontWeight: 600, color: '#15803d',
                                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem'
                                }}>
                                    <Icon style={{ fontSize: '0.85rem' }} />{label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <Row className="g-4">
                    {/* Left – Input Panel */}
                    <Col lg={5}>
                        <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <Tabs defaultActiveKey="upload" className="mb-3">
                                <Tab eventKey="upload" title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><FiCamera />Upload Image</span>}>
                                    <ImageUpload onAnalysisComplete={handleAnalysisComplete} />
                                </Tab>
                                <Tab eventKey="search" title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><FiSearch />Search Food</span>}>
                                    <FoodSearch onSearchComplete={handleAnalysisComplete} />
                                </Tab>
                            </Tabs>

                            {/* Tips card */}
                            <div className="glass-card" style={{ padding: '1.25rem 1.5rem', marginTop: '1rem' }}>
                                <h6 style={{ fontWeight: 700, marginBottom: '0.85rem', color: '#15803d', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <FiInfo /> Tips for best results
                                </h6>
                                {[
                                    [FiCamera, 'Use clear, well-lit photos'],
                                    [FiImage, 'Include the whole dish in frame'],
                                    [FiType, 'For search, use specific names (e.g. "grilled chicken")'],
                                    [FiSliders, 'Adjust portion size after analysis'],
                                ].map(([Icon, tip]) => (
                                    <div key={tip} style={{
                                        display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                                        marginBottom: '0.55rem', fontSize: '0.85rem', color: 'var(--gray-500, #475569)'
                                    }}>
                                        <Icon style={{ flexShrink: 0, marginTop: '2px', color: '#16a34a' }} />
                                        {tip}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>

                    {/* Right – Results Panel */}
                    <Col lg={7}>
                        <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                            {currentFood ? (
                                <>
                                    <PortionSlider
                                        baseNutrition={currentFood.baseNutrition || currentFood.nutrition}
                                        onPortionChange={handlePortionChange}
                                    />
                                    <NutritionCard foodData={currentFood} />
                                    {currentFood.aiExplanation && (
                                        <div className="mt-4">
                                            <AIExplanation explanation={currentFood.aiExplanation} />
                                        </div>
                                    )}
                                    {/* Reset */}
                                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                                        <button
                                            onClick={() => setCurrentFood(null)}
                                            style={{
                                                background: 'transparent',
                                                border: '1.5px solid #e2e8f0',
                                                borderRadius: '9999px',
                                                padding: '0.55rem 1.75rem',
                                                color: 'var(--gray-500, #64748b)', fontWeight: 600,
                                                fontSize: '0.88rem', cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                display: 'inline-flex', alignItems: 'center', gap: '6px'
                                            }}
                                            onMouseOver={e => { e.currentTarget.style.borderColor = '#16a34a'; e.currentTarget.style.color = '#16a34a'; }}
                                            onMouseOut={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; }}
                                        >
                                            <FiRefreshCw /> Analyze Another Food
                                        </button>
                                    </div>
                                </>
                            ) : (
                                /* Empty state */
                                <div className="glass-card text-center" style={{ padding: '5rem 2rem' }}>
                                    <div style={{ fontSize: '5rem', marginBottom: '1rem', lineHeight: 1, display: 'flex', justifyContent: 'center' }}>
                                        <MdOutlineFoodBank style={{ color: '#22c55e', filter: 'drop-shadow(0 4px 12px rgba(22,163,74,0.2))' }} />
                                    </div>
                                    <h4 style={{ fontWeight: 700, color: 'inherit', marginBottom: '0.6rem' }}>
                                        Your results will appear here
                                    </h4>
                                    <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.95rem', maxWidth: 320, margin: '0 auto 1.5rem' }}>
                                        Upload a food image or search by name to get instant nutrition facts
                                    </p>
                                    {/* Mini step guide */}
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                                        {[
                                            ['1', FiCamera, 'Upload / Search'],
                                            ['2', FiCpu, 'AI Analyzes'],
                                            ['3', FiBarChart2, 'See Nutrition']
                                        ].map(([num, Icon, label]) => (
                                            <div key={num} style={{ textAlign: 'center' }}>
                                                <div style={{
                                                    width: 44, height: 44, borderRadius: '50%',
                                                    background: 'linear-gradient(135deg,#16a34a,#22c55e)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    margin: '0 auto 0.5rem',
                                                    boxShadow: '0 4px 12px rgba(22,163,74,0.3)'
                                                }}>
                                                    <Icon style={{ fontSize: '1.2rem', color: '#fff' }} />
                                                </div>
                                                <span style={{ fontSize: '0.78rem', color: 'var(--gray-500, #64748b)', fontWeight: 600 }}>{label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Prediction;
