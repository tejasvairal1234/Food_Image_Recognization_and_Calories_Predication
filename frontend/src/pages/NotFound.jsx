import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * Not Found Page
 * 404 error page
 */
const NotFound = () => {
    return (
        <Container className="py-5">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <h3 className="mb-3">Page Not Found</h3>
                <p className="text-muted mb-4">
                    The page you're looking for doesn't exist.
                </p>
                <Link to="/" className="btn btn-primary">
                    Go Back Home
                </Link>
            </div>
        </Container>
    );
};

export default NotFound;
