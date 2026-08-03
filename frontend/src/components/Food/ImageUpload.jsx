import { useState, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import { FiUpload, FiX, FiCamera, FiAlertTriangle, FiCpu } from 'react-icons/fi';

import { foodAPI } from '../../services/api';
import { UPLOAD_CONFIG } from '../../utils/constants';

/**
 * ImageUpload Component
 * Modern glassmorphism upload zone with gradient button
 */
const ImageUpload = ({ onAnalysisComplete }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setError('');
        if (!file) return;

        if (!UPLOAD_CONFIG.allowedTypes.includes(file.type)) {
            setError('Please select a valid image file (JPG, PNG, or WEBP)');
            return;
        }
        if (file.size > UPLOAD_CONFIG.maxSize) {
            setError('File size must be less than 5MB');
            return;
        }

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleRemove = () => {
        setSelectedFile(null);
        setPreview(null);
        setError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleUpload = async () => {
        if (!selectedFile) { setError('Please select an image first'); return; }
        setLoading(true);
        setError('');
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('portionSize', '1.0');
            const response = await foodAPI.analyzeImage(formData);
            if (response.data.success) {
                onAnalysisComplete(response.data.data);
                handleRemove();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to analyze image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="card-body p-4">
                <h5 style={{ fontWeight: 700, marginBottom: '1rem', color: 'inherit' }}>
                    <FiCamera style={{ marginRight: '8px', color: '#16a34a', verticalAlign: 'middle' }} />
                    Upload Food Image
                </h5>

                {error && (
                    <div className="alert alert-danger d-flex align-items-center gap-2 mb-3" role="alert">
                        <FiAlertTriangle style={{ flexShrink: 0 }} />{error}
                        <button
                            type="button"
                            className="btn-close ms-auto"
                            onClick={() => setError('')}
                            style={{ fontSize: '0.7rem' }}
                        />
                    </div>
                )}

                {!preview ? (
                    <div
                        className="upload-zone"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div style={{
                            width: 64, height: 64, borderRadius: '50%',
                            background: 'linear-gradient(135deg,#16a34a,#22c55e)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 1rem',
                            boxShadow: '0 4px 16px rgba(22,163,74,0.35)'
                        }}>
                            <FiUpload size={28} color="#fff" />
                        </div>
                        <h6 style={{ fontWeight: 700, color: 'inherit', marginBottom: '0.4rem' }}>
                            Click to upload food image
                        </h6>
                        <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0 }}>
                            JPG, PNG or WEBP &nbsp;•&nbsp; Max 5MB
                        </p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                        />
                    </div>
                ) : (
                    <div>
                        <div style={{ position: 'relative', marginBottom: '1rem', borderRadius: '14px', overflow: 'hidden' }}>
                            <img src={preview} alt="Preview" style={{ width: '100%', display: 'block', maxHeight: '260px', objectFit: 'cover' }} />
                            <button
                                onClick={handleRemove}
                                style={{
                                    position: 'absolute', top: '10px', right: '10px',
                                    background: 'rgba(220,38,38,0.9)', color: '#fff',
                                    border: 'none', borderRadius: '50%', width: 32, height: 32,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <FiX size={16} />
                            </button>
                            <div style={{
                                position: 'absolute', top: '10px', left: '10px',
                                background: 'rgba(22,163,74,0.9)', color: '#fff',
                                borderRadius: '9999px', padding: '3px 10px',
                                fontSize: '0.72rem', fontWeight: 700
                            }}>AI READY</div>
                        </div>
                        <button
                            className="btn btn-primary w-100"
                            onClick={handleUpload}
                            disabled={loading}
                            style={{ padding: '0.7rem', fontSize: '1rem' }}
                        >
                            {loading ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Analyzing with AI...
                                </>
                            ) : <><FiCpu style={{ marginRight: '6px', verticalAlign: 'middle' }} />Analyze Food</>}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
