import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/Common/ProtectedRoute';

// Layout
import NavBar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Prediction from './pages/Prediction';
import NotFound from './pages/NotFound';

// Auth
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

// Admin
import AdminDashboard from './components/Admin/AdminDashboard';

/**
 * Main App Component
 * Sets up routing, contexts, and layout
 */
function App() {
    return (
        <Router>
            <ThemeProvider>
                <AuthProvider>
                    <div className="d-flex flex-column min-vh-100">
                        <NavBar />

                        <main className="flex-grow-1">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />

                                {/* Home - accessible to everyone */}
                                <Route path="/" element={<Home />} />

                                {/* Protected Routes */}
                                <Route
                                    path="/predict"
                                    element={
                                        <ProtectedRoute>
                                            <Prediction />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/dashboard"
                                    element={
                                        <ProtectedRoute>
                                            <Dashboard />
                                        </ProtectedRoute>
                                    }
                                />

                                {/* Admin Routes */}
                                <Route
                                    path="/admin"
                                    element={
                                        <ProtectedRoute adminOnly={true}>
                                            <AdminDashboard />
                                        </ProtectedRoute>
                                    }
                                />

                                {/* 404 */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </main>

                        <Footer />
                    </div>
                </AuthProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;
