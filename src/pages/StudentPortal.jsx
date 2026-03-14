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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 className="section-title" style={{ marginBottom: 0 }}><BusFront size={20} className="text-primary" /> Bus Details</h3>
                            <div className="glass" style={{ padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600 }}>
                                <motion.div
                                    animate={{ opacity: [1, 0.4, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff3b30' }}
                                />
                                LIVE TRACKING ACTIVE
                            </div>
                        </div>
                        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                            <div className="info-item"><span className="info-key">Bus Route</span><span className="info-val">Route #12 (Saravanampatty)</span></div>
                            <div className="info-item"><span className="info-key">Boarding Point</span><span className="info-val">Signal Junction</span></div>
                            <div className="info-item"><span className="info-key">Pick-up Time</span><span className="info-val">07:45 AM</span></div>
                            <div className="info-item"><span className="info-key">Current Status</span><span className="info-val" style={{ color: 'var(--primary)' }}>In Transit - Near Peelamedu</span></div>
                        </div>
                    </div>
                );
            case 'requests':
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title"><Target size={20} className="text-primary" /> Service Request Submission</h3>
                        <form className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }} onSubmit={(e) => { e.preventDefault(); alert('Request submitted successfully!'); }}>
                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Request Type</label>
                                    <select className="form-input">
                                        <option>Route Change</option>
                                        <option>Boarding Point Update</option>
                                        <option>Maintenance Issue</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Urgency</label>
                                    <select className="form-input">
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High (Immediate attention)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Detailed Description</label>
                                <textarea className="form-input" style={{ minHeight: '120px', resize: 'vertical' }} placeholder="Specify your request details..."></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Submit Request</button>
                        </form>
                    </div>
                );
            case 'support':
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title"><AlertCircle size={20} className="text-primary" /> Frequently Asked Questions</h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {[
                                { q: 'How do I track my bus in real-time?', a: 'You can use the Live Tracking feature in the Transport Details tab.' },
                                { q: 'What happens if I forget my ID card?', a: 'Contact your Bus Incharge immediately. They can manually verify your details.' },
                                { q: 'How can I change my route?', a: 'Submit a Route Change request through the Service Requests tab. Admin approval takes 24-48 hours.' },
                            ].map((faq, i) => (
                                <div key={i} className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                                    <div style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                        <span className="text-primary">Q:</span> {faq.q}
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{faq.a}</p>
                                </div>
                            ))}
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
