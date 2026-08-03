import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Spinner, Alert } from 'react-bootstrap';
import { FiUsers, FiFileText, FiShield, FiTrendingUp } from 'react-icons/fi';
import { adminAPI } from '../../services/api';

/**
 * AdminDashboard Component
 * Admin panel with statistics and management
 */
const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await adminAPI.getStats();
            if (response.data.success) {
                setStats(response.data.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load stats');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    const statCards = [
        {
            title: 'Total Users',
            value: stats?.totalUsers || 0,
            icon: <FiUsers size={32} />,
            color: 'primary'
        },
        {
            title: 'Total Food Logs',
            value: stats?.totalFoodLogs || 0,
            icon: <FiFileText size={32} />,
            color: 'success'
        },
        {
            title: 'Total Admins',
            value: stats?.totalAdmins || 0,
            icon: <FiShield size={32} />,
            color: 'warning'
        },
        {
            title: 'Recent Activity (7d)',
            value: stats?.recentLogs || 0,
            icon: <FiTrendingUp size={32} />,
            color: 'info'
        }
    ];

    return (
        <Container className="py-4">
            <h2 className="mb-4">Admin Dashboard</h2>

            <Row className="g-4 mb-4">
                {statCards.map((stat, index) => (
                    <Col key={index} xs={12} sm={6} lg={3}>
                        <Card className={`border-${stat.color} h-100`}>
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="text-muted mb-1">{stat.title}</h6>
                                        <h2 className="mb-0">{stat.value}</h2>
                                    </div>
                                    <div className={`text-${stat.color}`}>
                                        {stat.icon}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card>
                <Card.Body>
                    <h5 className="mb-3">System Overview</h5>
                    <p className="text-muted">
                        This is a basic admin dashboard. You can extend this with user management,
                        food log moderation, and advanced analytics.
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AdminDashboard;
