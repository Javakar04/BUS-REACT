import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Bus,
    Users,
    CalendarCheck,
    ClipboardList,
    MessageSquare,
    Route,
    ShieldCheck,
    TrendingUp
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = React.useState('dashboard');

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'buses', label: 'Bus Management', icon: Bus },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
        { id: 'incharges', label: 'Incharges', icon: ShieldCheck },
        { id: 'routes', label: 'Routes', icon: Route },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
    ];

    const stats = [
        { label: 'Total Buses', value: '12', icon: Bus, color: 'blue' },
        { label: 'Active Buses', value: '8', icon: TrendingUp, color: 'green' },
        { label: 'Total Students', value: '450', icon: Users, color: 'purple' },
        { label: 'Today\'s Attendance', value: '98%', icon: CalendarCheck, color: 'indigo' },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemAnim = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <>
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="stats-grid"
                        >
                            {stats.map((stat, index) => (
                                <motion.div key={index} variants={itemAnim} className="stat-card">
                                    <div className="stat-icon-wrapper" style={{
                                        background: `hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1)`,
                                        color: 'var(--primary)'
                                    }}>
                                        <stat.icon size={24} />
                                    </div>
                                    <div className="stat-value">{stat.value}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="section-card"
                        >
                            <h3 className="section-title">
                                <ClipboardList size={20} className="text-primary" />
                                System Activity Overview
                            </h3>
                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                {[
                                    { text: 'Bus 12 route optimized for peak hours', time: '12 mins ago', type: 'update' },
                                    { text: 'New batch of 15 students registered for Route B', time: '1 hour ago', type: 'add' },
                                    { text: 'Maintenance alert: Bus 04 scheduled for engine check', time: '3 hours ago', type: 'alert' },
                                    { text: 'Emergency broadcast sent to all Incharges', time: '5 hours ago', type: 'message' },
                                ].map((activity, idx) => (
                                    <div key={idx} className="recent-activity-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>{activity.text}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{activity.time}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                );
            case 'students':
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title"><Users size={20} className="text-primary" /> Student Directory</h3>
                        <p className="subtitle">Manage and track student registrations and bus assignments.</p>
                        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px dashed var(--border)' }}>
                            <Users size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }} />
                            <p style={{ color: 'var(--text-muted)' }}>Student data will be listed here.</p>
                            <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Add New Student</button>
                        </div>
                    </div>
                );
            case 'attendance':
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title"><CalendarCheck size={20} className="text-primary" /> Attendance Records</h3>
                        <p className="subtitle">Daily bus boarding logs and school attendance sync.</p>
                        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px dashed var(--border)' }}>
                            <CalendarCheck size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }} />
                            <p style={{ color: 'var(--text-muted)' }}>Select a date to view attendance logs.</p>
                        </div>
                    </div>
                );
            case 'buses':
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title"><Bus size={20} className="text-primary" /> Fleet Management</h3>
                        <p className="subtitle">Monitor bus health, fuel levels, and maintenance schedules.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            {[1, 2, 3, 4].map(id => (
                                <div key={id} className="glass" style={{ padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                                    <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Bus #{id}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Status: Active</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Driver: S. Rajesh</div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title">Section: {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>This field is currently being developed for the {activeTab} module.</p>
                    </div>
                );
        }
    };

    return (
        <DashboardLayout
            role="admin"
            title={activeTab === 'dashboard' ? 'Admin Control Center' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            navItems={navItems}
            activeItem={activeTab}
            onItemClick={setActiveTab}
        >
            {renderContent()}
        </DashboardLayout>
    );
};

// Internal Import helper
const LayoutDashboard = BarChart3;

export default AdminDashboard;
