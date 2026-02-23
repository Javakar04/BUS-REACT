import React from 'react';
import { motion } from 'framer-motion';
import {
    Bus,
    ClipboardCheck,
    Users,
    UserSquare,
    MessageCircle,
    Settings2,
    FileEdit,
    AlertTriangle,
    LayoutDashboard,
    CheckCircle2,
    ListFilter
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const InchargeDashboard = () => {
    const [activeTab, setActiveTab] = React.useState('overview');

    const navItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'buses', label: 'Bus Management', icon: Bus },
        { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
        { id: 'drivers', label: 'Driver Details', icon: UserSquare },
        { id: 'messages', label: 'Messages', icon: MessageCircle },
        { id: 'condition', label: 'Bus Condition', icon: Settings2 },
        { id: 'requests', label: 'Requests', icon: ListFilter },
    ];

    const stats = [
        { label: 'Attendance Rate', value: '98.4%', icon: CheckCircle2, color: 'emerald' },
        { label: 'Active Students', value: '245', icon: Users, color: 'blue' },
        { label: 'Open Requests', value: '3', icon: ListFilter, color: 'amber' },
        { label: 'Condition Status', value: 'Optimal', icon: ShieldCheck, color: 'green' },
    ];

    const quickActions = [
        { label: 'Mark Attendance', icon: ClipboardCheck, color: 'primary' },
        { label: 'Broadcast Alert', icon: AlertTriangle, color: 'danger' },
        { label: 'Inspect Vehicle', icon: Settings2, color: 'outline' },
        { label: 'Review Requests', icon: FileEdit, color: 'outline' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <>
                        <div className="stats-grid">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="stat-card"
                                    style={{ borderLeft: `4px solid var(--primary)` }}
                                >
                                    <stat.icon className="text-primary" size={24} style={{ marginBottom: '0.75rem' }} />
                                    <div className="stat-value" style={{ color: 'var(--primary)' }}>{stat.value}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="section-card"
                        >
                            <h3 className="section-title">Operational Controls</h3>
                            <div className="quick-actions" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
                                {quickActions.map((action, index) => (
                                    <button key={index} className={`btn btn-${action.color}`} style={{ padding: '1.25rem' }}>
                                        <action.icon size={18} />
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                );
            case 'attendance':
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title"><ClipboardCheck size={20} className="text-primary" /> Active Attendance Session</h3>
                        <p className="subtitle">Real-time boarding status for Morning/Evening shifts.</p>
                        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Shift: Morning Trip</div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
                                <div><div style={{ fontSize: '2rem', fontWeight: 800 }}>42</div><div className="stat-label">Boarded</div></div>
                                <div><div style={{ fontSize: '2rem', fontWeight: 800 }}>8</div><div className="stat-label">Pending</div></div>
                            </div>
                            <button className="btn btn-primary">Open Scanner</button>
                        </div>
                    </div>
                );
            case 'drivers':
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title"><UserSquare size={20} className="text-primary" /> Personnel Details</h3>
                        <div className="info-box" style={{ background: 'var(--bg-main)' }}>
                            <div className="info-item">
                                <span className="info-key">Main Driver</span>
                                <span className="info-val">S. Rajesh (Exp: 12 yrs)</span>
                            </div>
                            <div className="info-item">
                                <span className="info-key">Contact</span>
                                <span className="info-val">+91 94432 XXXXX</span>
                            </div>
                            <div className="info-item">
                                <span className="info-key">License Info</span>
                                <span className="info-val">HMV-KA-05-2012XXXX</span>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
                        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px dashed var(--border)' }}>
                            <p style={{ color: 'var(--text-muted)' }}>Management module for {activeTab} is currently being initialized.</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <DashboardLayout
            role="incharge"
            title={activeTab === 'overview' ? 'Bus Operations Management' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            navItems={navItems}
            activeItem={activeTab}
            onItemClick={setActiveTab}
        >
            {renderContent()}
        </DashboardLayout>
    );
};

const ShieldCheck = CheckCircle2;

export default InchargeDashboard;
