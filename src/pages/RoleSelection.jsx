import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCog, User, ArrowRight } from 'lucide-react';

const RoleSelection = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const navigate = useNavigate();

    const roles = [
        { id: 'admin', label: 'Administrator', icon: ShieldCheck, desc: 'Central management and system controls' },
        { id: 'incharge', label: 'Bus Incharge', icon: UserCog, desc: 'Operations, attendance, and route monitoring' },
        { id: 'student', label: 'Student Portal', icon: User, desc: 'Personal transit details and boarding requests' }
    ];

    const handleContinue = () => {
        if (selectedRole) {
            navigate(`/login/${selectedRole}`);
        }
    };

    return (
        <div className="auth-container">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="auth-card"
                style={{ maxWidth: '540px' }}
            >
                <h2>Select User Role</h2>
                <p className="subtitle">Welcome to KPR Bus Management System</p>

                <div className="role-grid" style={{ marginTop: '1rem' }}>
                    {roles.map((role) => (
                        <motion.div
                            key={role.id}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.99 }}
                            className={`role-card ${selectedRole === role.id ? 'active' : ''}`}
                            onClick={() => setSelectedRole(role.id)}
                        >
                            <div className="stat-icon-wrapper" style={{
                                margin: 0,
                                background: selectedRole === role.id ? 'var(--white)' : 'var(--primary-soft)',
                                color: 'var(--primary)',
                                width: '3.5rem',
                                height: '3.5rem'
                            }}>
                                <role.icon size={24} />
                            </div>
                            <div style={{ textAlign: 'left', flex: 1 }}>
                                <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{role.label}</div>
                                <div style={{ fontSize: '0.8125rem', opacity: 0.7, fontWeight: 500 }}>{role.desc}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <button
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '2rem', padding: '1rem' }}
                    onClick={handleContinue}
                    disabled={!selectedRole}
                >
                    Continue
                    <ArrowRight size={18} />
                </button>
            </motion.div>
        </div>
    );
};

export default RoleSelection;
