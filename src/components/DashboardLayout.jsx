import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart3,
    Users,
    Bus,
    LogOut,
    LayoutDashboard,
    ClipboardList,
    MessageSquare,
    Map,
    Wrench,
    User,
    Bell,
    CheckCircle,
    FileText
} from 'lucide-react';

const DashboardLayout = ({ children, role, title, navItems, activeItem, onItemClick }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                className="sidebar"
            >
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        {role === 'student' ? 'Student Portal' : 'Bus Admin'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: '1.2' }}>
                        KPR COLLEGE OF ARTS SCIENCE & RESEARCH
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item, index) => {
                        const isSelected = activeItem === (item.id || item.label);

                        if (onItemClick) {
                            return (
                                <button
                                    key={index}
                                    onClick={() => onItemClick(item.id || item.label)}
                                    className={`nav-item ${isSelected ? 'active' : ''}`}
                                    style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
                                >
                                    {item.icon && <item.icon className="nav-icon" />}
                                    {item.label}
                                </button>
                            );
                        }

                        return (
                            <NavLink
                                key={index}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            >
                                {item.icon && <item.icon className="nav-icon" />}
                                {item.label}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <button
                        className="btn btn-danger btn-logout"
                        onClick={handleLogout}
                        style={{ width: '100%' }}
                    >
                        <LogOut className="nav-icon" />
                        Logout
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="main-content">
                <header className="top-bar">
                    <h1 className="top-bar-title">{title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {role === 'incharge' && (
                            <div className="glass" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', fontWeight: 600 }}>
                                Incharge: Prof. Kumar
                            </div>
                        )}
                        <div className="glass" style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', cursor: 'pointer' }}>
                            <User size={20} />
                        </div>
                    </div>
                </header>

                <main className="scroll-area">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
