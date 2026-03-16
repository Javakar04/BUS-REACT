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
    FileText,
    AlertTriangle,
    Search,
    CircleAlert
} from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const DashboardLayout = ({ children, role, title, navItems, activeItem, onItemClick }) => {
    const navigate = useNavigate();

    const [broadcasts] = useLocalStorage('bus_broadcasts', []);
    const [showNotifications, setShowNotifications] = React.useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user_role');
        window.location.href = '/';
    };

    const handleSOS = () => {
        const confirmSOS = window.confirm("EMERGENCY ALERT: Are you sure you want to trigger SOS? This will alert all administrators immediately.");
        if (confirmSOS) {
            alert("SOS ALERT SENT! Help is on the way.");
            // In a real app, this would hit an API and push a notification
        }
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
                        style={{ width: '100%', marginBottom: '0.75rem' }}
                    >
                        <LogOut className="nav-icon" />
                        Logout
                    </button>

                    {(role === 'student' || role === 'incharge') && (
                        <button
                            className="btn btn-sos"
                            onClick={handleSOS}
                            style={{
                                width: '100%',
                                background: 'hsl(0, 84%, 60%)',
                                color: 'white',
                                boxShadow: '0 4px 12px hsla(0, 84%, 60%, 0.3)'
                            }}
                        >
                            <AlertTriangle className="nav-icon" />
                            EMERGENCY SOS
                        </button>
                    )}
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

                        <div style={{ position: 'relative' }}>
                            <div
                                className="glass"
                                onClick={() => setShowNotifications(!showNotifications)}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                            >
                                <Bell size={20} />
                                {broadcasts.length > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-2px',
                                        right: '-2px',
                                        background: 'hsl(0, 84%, 60%)',
                                        color: 'white',
                                        fontSize: '0.65rem',
                                        fontWeight: 800,
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid var(--white)'
                                    }}>
                                        {broadcasts.length}
                                    </span>
                                )}
                            </div>

                            <AnimatePresence>
                                {showNotifications && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="glass"
                                        style={{
                                            position: 'absolute',
                                            top: '120%',
                                            right: 0,
                                            width: '320px',
                                            borderRadius: 'var(--radius-xl)',
                                            boxShadow: 'var(--shadow-lg)',
                                            zIndex: 100,
                                            padding: '1.25rem',
                                            maxHeight: '400px',
                                            overflowY: 'auto'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                            <h4 style={{ margin: 0, fontWeight: 700 }}>Notifications</h4>
                                            <button
                                                onClick={() => setShowNotifications(false)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                                            >
                                                <CircleAlert size={16} />
                                            </button>
                                        </div>
                                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                                            {broadcasts.length > 0 ? broadcasts.slice(0, 5).map(b => (
                                                <div key={b.id} style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>{b.title}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{b.content}</div>
                                                    <div style={{ fontSize: '0.65rem', color: 'var(--primary)', marginTop: '0.25rem', fontWeight: 600 }}>{b.date}</div>
                                                </div>
                                            )) : (
                                                <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No new notifications</div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="glass" style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
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
