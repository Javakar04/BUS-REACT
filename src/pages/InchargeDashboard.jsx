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
    ListFilter,
    ShieldCheck,
    X,
    Check,
    Send,
    Clock
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const AnimatedClock = ({ size = 24, className, style }) => (
    <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ display: 'inline-block', ...style }}
        className={className}
    >
        <Clock size={size} />
    </motion.span>
);

const InchargeDashboard = () => {
    const [activeTab, setActiveTab] = React.useState('overview');

    // Manageable State
    const [boardingList, setBoardingList] = React.useState([
        { id: 1, name: 'Rahul Sharma', idCard: 'KPR-24-CS-042', status: 'Pending' },
        { id: 2, name: 'Priya Mani', idCard: 'KPR-24-EC-015', status: 'Boarded' },
        { id: 3, name: 'Arjun Das', idCard: 'KPR-24-ME-089', status: 'Boarded' },
        { id: 4, name: 'Deepika R.', idCard: 'KPR-24-CS-012', status: 'Pending' },
    ]);

    const [requests, setRequests] = React.useState([
        { id: 1, student: 'Siddharth S.', type: 'Route Change', date: '2026-02-23', status: 'Pending' },
        { id: 2, student: 'Ananya P.', type: 'Maintenance', date: '2026-02-22', status: 'Pending' },
    ]);

    const [inspection, setInspection] = React.useState([
        { id: 1, item: 'Brake System', status: 'Good', icon: ShieldCheck },
        { id: 2, item: 'Tire Pressure', status: 'Good', icon: Settings2 },
        { id: 3, item: 'Headlights & Blinkers', status: 'Checked', icon: ClipboardCheck },
        { id: 4, item: 'Engine Oil Level', status: 'Good', icon: Settings2 },
        { id: 5, item: 'Interior Cleanliness', status: 'Pending', icon: Users },
    ]);

    const [inbox, setInbox] = React.useState([
        { id: 1, from: 'Transport Admin', subject: 'Exam Special Bus', msg: 'Special buses will run at 5 PM for exam students.', time: '09:00 AM', read: false },
        { id: 2, from: 'Rahul Sharma (Student)', subject: 'Leave Information', msg: 'I will not be using the bus today due to fever.', time: 'Yesterday', read: true },
    ]);

    const toggleBoarding = (id) => {
        setBoardingList(boardingList.map(s =>
            s.id === id ? { ...s, status: s.status === 'Boarded' ? 'Pending' : 'Boarded' } : s
        ));
    };

    const toggleInspection = (id) => {
        setInspection(inspection.map(item =>
            item.id === id ? { ...item, status: item.status === 'Good' || item.status === 'Checked' ? 'Pending' : 'Good' } : item
        ));
    };

    const handleRequest = (id, newStatus) => {
        setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
    };

    const navItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
        { id: 'requests', label: 'Requests', icon: ListFilter },
        { id: 'drivers', label: 'Driver Details', icon: UserSquare },
        { id: 'condition', label: 'Bus Condition', icon: Settings2 },
        { id: 'messages', label: 'Messages', icon: MessageCircle },
    ];

    const stats = [
        { label: 'Boarded', value: boardingList.filter(s => s.status === 'Boarded').length, icon: CheckCircle2, color: 'emerald' },
        { label: 'Pending', value: boardingList.filter(s => s.status === 'Pending').length, icon: AnimatedClock, color: 'blue' },
        { label: 'Open Requests', value: requests.filter(r => r.status === 'Pending').length, icon: ListFilter, color: 'amber' },
        { label: 'Condition', value: `${inspection.filter(i => i.status === 'Good' || i.status === 'Checked').length}/${inspection.length}`, icon: ShieldCheck, color: 'green' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <>
                        <div className="stats-grid">
                            {stats.map((stat, index) => (
                                <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} className="stat-card" style={{ borderLeft: `4px solid var(--primary)` }}>
                                    <stat.icon className="text-primary" size={24} style={{ marginBottom: '0.75rem' }} />
                                    <div className="stat-value" style={{ color: 'var(--primary)' }}>{stat.value}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="section-card">
                            <h3 className="section-title">Operational Controls</h3>
                            <div className="quick-actions" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                                <button className="btn btn-primary" onClick={() => setActiveTab('attendance')}><ClipboardCheck size={18} /> Mark Attendance</button>
                                <button className="btn btn-danger"><AlertTriangle size={18} /> Broadcast Alert</button>
                                <button className="btn btn-outline" onClick={() => setActiveTab('requests')}><FileEdit size={18} /> Review Requests</button>
                            </div>
                        </motion.div>
                    </>
                );
            case 'attendance':
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title"><ClipboardCheck size={20} className="text-primary" /> Active Boarding List</h3>
                        <div className="data-table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>ID Card</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {boardingList.map((s) => (
                                        <tr key={s.id}>
                                            <td style={{ fontWeight: 600 }}>{s.name}</td>
                                            <td><code>{s.idCard}</code></td>
                                            <td>
                                                <span className={`badge badge-${s.status === 'Boarded' ? 'success' : 'warning'}`}>{s.status}</span>
                                            </td>
                                            <td>
                                                <button className={`btn ${s.status === 'Boarded' ? 'btn-outline' : 'btn-primary'}`} style={{ padding: '4px 12px' }} onClick={() => toggleBoarding(s.id)}>
                                                    {s.status === 'Boarded' ? 'Undo' : 'Board'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'requests':
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title"><ListFilter size={20} className="text-primary" /> Service & Route Requests</h3>
                        <div className="data-table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Request Type</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((r) => (
                                        <tr key={r.id}>
                                            <td style={{ fontWeight: 600 }}>{r.student}</td>
                                            <td>{r.type}</td>
                                            <td>{r.date}</td>
                                            <td><span className={`badge badge-${r.status === 'Approved' ? 'success' : r.status === 'Rejected' ? 'danger' : 'warning'}`}>{r.status}</span></td>
                                            <td>
                                                {r.status === 'Pending' ? (
                                                    <div className="action-buttons">
                                                        <button className="btn-icon" style={{ borderColor: 'hsl(142, 76%, 36%)', color: 'hsl(142, 76%, 36%)' }} onClick={() => handleRequest(r.id, 'Approved')}><Check size={16} /></button>
                                                        <button className="btn-icon delete" onClick={() => handleRequest(r.id, 'Rejected')}><X size={16} /></button>
                                                    </div>
                                                ) : <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Processed</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'drivers':
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title"><UserSquare size={20} className="text-primary" /> Personnel Details</h3>
                        <div className="info-box">
                            <div className="info-item"><span className="info-key">Main Driver</span><span className="info-val">S. Rajesh (Exp: 12 yrs)</span></div>
                            <div className="info-item"><span className="info-key">Contact</span><span className="info-val">+91 94432 10293</span></div>
                            <div className="info-item"><span className="info-key">License Info</span><span className="info-val">HMV-KA-05-2012XXXX</span></div>
                        </div>
                        <button className="btn btn-primary"><MessageCircle size={18} /> Message Driver</button>
                    </div>
                );
            case 'condition':
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title"><Settings2 size={20} className="text-primary" /> Daily Inspection Checklist</h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {inspection.map(check => (
                                <div key={check.id} className="glass" style={{ padding: '1rem 1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <check.icon className="text-primary" size={20} />
                                        <span style={{ fontWeight: 600 }}>{check.item}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span className={`badge badge-${check.status === 'Good' || check.status === 'Checked' ? 'success' : 'warning'}`}>{check.status}</span>
                                        <button className={`btn ${check.status === 'Good' || check.status === 'Checked' ? 'btn-outline' : 'btn-primary'}`} style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={() => toggleInspection(check.id)}>
                                            {check.status === 'Good' || check.status === 'Checked' ? 'Reset' : 'Mark OK'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'messages':
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title"><MessageCircle size={20} className="text-primary" /> Communication Portal</h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <input className="form-input" placeholder="Type a message..." style={{ margin: 0 }} />
                                <button className="btn btn-primary"><Send size={18} /></button>
                            </div>
                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                {inbox.map(m => (
                                    <div key={m.id} className="glass" style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', borderLeft: m.read ? 'none' : '3px solid var(--primary)', opacity: m.read ? 0.8 : 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                            <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{m.from}</span>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{m.time}</span>
                                        </div>
                                        <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{m.subject}</div>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{m.msg}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
                        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-muted)' }}>Management module for {activeTab} is ready for integration.</p>
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

export default InchargeDashboard;
