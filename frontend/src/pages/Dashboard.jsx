import { Container } from 'react-bootstrap';
import History from '../components/Dashboard/History';

/**
 * Dashboard Page
 * Shows user's food history with modern styling
 */
const Dashboard = () => {
    return (
        <div className="page-wrapper">
            <Container>
                <History />
            </Container>
        </div>
    );
};

export default Dashboard;
