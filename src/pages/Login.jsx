import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ArrowLeft, LogIn } from 'lucide-react';

const Login = () => {
    const { role } = useParams();
    const navigate = useNavigate();

    const getTitle = () => {
        switch (role) {
            case 'admin': return 'Admin Access';
            case 'incharge': return 'Incharge Portal';
            case 'student': return 'Student Login';
            default: return 'Secure Login';
        }
    };

    const [error, setError] = React.useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;

        // Simple Mock Auth Logic
        if (role === 'admin' && username === 'admin' && password === 'admin') {
            localStorage.setItem('user_role', 'admin');
            navigate('/admin/dashboard');
        } else if (role === 'incharge' && username === 'incharge' && password === 'incharge') {
            localStorage.setItem('user_role', 'incharge');
            navigate('/incharge/dashboard');
        } else if (role === 'student' && username === 'student' && password === 'student') {
            localStorage.setItem('user_role', 'student');
            navigate('/student/dashboard');
        } else {
            setError('Invalid username or password. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="auth-card"
            >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'var(--primary-soft)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Lock size={32} />
                    </div>
                </div>

                <h2>{getTitle()}</h2>
                <p className="subtitle">Please enter your credentials to proceed</p>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'hsla(0, 84%, 60%, 0.1)',
                            color: 'hsl(0, 84%, 60%)',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            marginBottom: '1rem'
                        }}
                    >
                        {error}
                    </motion.div>
                )}

                <form style={{ marginTop: '1rem' }} onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter your username"
                                style={{ paddingLeft: '40px' }}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Enter your password"
                                style={{ paddingLeft: '40px' }}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                        <LogIn size={18} />
                        Sign In
                    </button>

                    <Link to="/" className="btn btn-outline" style={{ width: '100%', marginTop: '1rem', textDecoration: 'none' }}>
                        <ArrowLeft size={16} />
                        Back to Selection
                    </Link>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
