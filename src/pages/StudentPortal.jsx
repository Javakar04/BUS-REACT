import React from 'react';
import { motion } from 'framer-motion';
import {
    UserCircle,
    CalendarDays,
    BusFront,
    Target,
    AlertCircle,
    Mail,
    Phone,
    GraduationCap
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const StudentPortal = () => {
    const [activeTab, setActiveTab] = React.useState('profile');

    const navItems = [
        { id: 'profile', label: 'My Profile', icon: UserCircle },
        { id: 'attendance', label: 'Attendance', icon: CalendarDays },
        { id: 'transport', label: 'Transport Details', icon: BusFront },
        { id: 'requests', label: 'Service Requests', icon: Target },
        { id: 'support', label: 'Help & Support', icon: AlertCircle },
    ];

    const profile = {
        personal: [
            { label: 'Full Name', value: 'Rahul Sharma' },
            { label: 'Department', value: 'Computer Science & Engineering' },
            { label: 'Batch/Year', value: '2024 - 2027 (II year)' },
            { label: 'College ID', value: 'KPR-24-CS-042' },
        ],
        contact: [
            { label: 'Student Mobile', value: '+91 98765 43210' },
            { label: 'Guardian Name', value: 'Suresh Kumar' },
            { label: 'Emergency Contact', value: '+91 98765 43211' },
            { label: 'Academic Advisor', value: 'Dr. Nithya R.' },
            { label: 'Advisor Office', value: 'CSE Lab - 4' },
        ]
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="profile-container animate-fade-in">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="info-card"
                        >
                            <h3 style={{ borderBottom: '2px solid var(--primary-soft)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                <UserCircle className="text-primary" size={20} /> Personal Information
                            </h3>
                            <div className="info-box">
                                {profile.personal.map((item, index) => (
                                    <div key={index} className="info-row" style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                                        <span className="info-label" style={{ minWidth: '140px' }}>{item.label}</span>
                                        <span className="info-value">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="info-card"
                        >
                            <h3 style={{ borderBottom: '2px solid var(--primary-soft)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                <Phone className="text-primary" size={20} /> Contact & Support
                            </h3>
                            <div className="info-box">
                                {profile.contact.map((item, index) => (
                                    <div key={index} className="info-row" style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                                        <span className="info-label" style={{ minWidth: '160px' }}>{item.label}</span>
                                        <span className="info-value">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                );
            case 'attendance':
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title"><CalendarDays size={20} className="text-primary" /> Transport Attendance</h3>
                        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', textAlign: 'center' }}>
                                <div><div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>92%</div><div className="stat-label">This Month</div></div>
                                <div><div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>156</div><div className="stat-label">Total Days</div></div>
                            </div>
                        </div>
                    </div>
                );
            case 'transport':
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title"><BusFront size={20} className="text-primary" /> Bus Details</h3>
                        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                            <div className="info-item"><span className="info-key">Bus Route</span><span className="info-val">Route #12 (Saravanampatty)</span></div>
                            <div className="info-item"><span className="info-key">Boarding Point</span><span className="info-val">Signal Junction</span></div>
                            <div className="info-item"><span className="info-key">Pick-up Time</span><span className="info-val">07:45 AM</span></div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
                        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-muted)' }}>This section ({activeTab}) is being prepared.</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <DashboardLayout
            role="student"
            title={activeTab === 'profile' ? 'Student Transport Hub' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            navItems={navItems}
            activeItem={activeTab}
            onItemClick={setActiveTab}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 500 }}
            >
                <GraduationCap size={18} />
                Manage your transport profile and track transit updates.
            </motion.div>

            {renderContent()}
        </DashboardLayout>
    );
};

export default StudentPortal;
