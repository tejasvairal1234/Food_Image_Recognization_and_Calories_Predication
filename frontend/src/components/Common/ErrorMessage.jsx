import { Alert } from 'react-bootstrap';

/**
 * Error Message Component
 * Displays error messages
 */
const ErrorMessage = ({ message, variant = 'danger', onClose }) => {
    if (!message) return null;

    return (
        <Alert variant={variant} dismissible={!!onClose} onClose={onClose} className="mb-3">
            {message}
        </Alert>
    );
};

export default ErrorMessage;
