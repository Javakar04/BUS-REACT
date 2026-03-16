import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart3,
    Bus,
    Users,
    CalendarCheck,
    ClipboardList,
    MessageSquare,
    Route,
    ShieldCheck,
    TrendingUp,
    Plus,
    Edit,
    Trash2,
    X,
    Clock,
    Zap,
    UserPlus,
    Bell,
    Map
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Separate Modal Component for stability
const CRUDModal = ({ isOpen, onClose, onSave, type, data, setData }) => {
    if (!isOpen || !data) return null;

    const isEdit = !!data.id;

    return (
        <div className="modal-overlay">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="modal-content"
            >
                <div className="modal-header">
                    <h3 style={{ margin: 0 }}>{isEdit ? 'Edit' : 'Add New'} {type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
                    <div className="modal-body">
                        {type === 'student' ? (
                            <>
                                <div className="form-group">
                                    <label className="form-label">Name</label>
                                    <input className="form-input" value={data.name || ''} onChange={e => setData({ ...data, name: e.target.value })} required autoFocus />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Student ID</label>
                                    <input className="form-input" value={data.studentId || ''} onChange={e => setData({ ...data, studentId: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Route</label>
                                    <input className="form-input" value={data.route || ''} onChange={e => setData({ ...data, route: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Contact</label>
                                    <input className="form-input" value={data.contact || ''} onChange={e => setData({ ...data, contact: e.target.value })} required />
                                </div>
                            </>
                        ) : type === 'bus' ? (
                            <>
                                <div className="form-group">
                                    <label className="form-label">Bus Number</label>
                                    <input className="form-input" value={data.number || ''} onChange={e => setData({ ...data, number: e.target.value })} required autoFocus />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Driver Name</label>
                                    <input className="form-input" value={data.driver || ''} onChange={e => setData({ ...data, driver: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Capacity</label>
                                    <input className="form-input" type="number" value={data.capacity || ''} onChange={e => setData({ ...data, capacity: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Status</label>
                                    <select className="form-input" value={data.status || 'Active'} onChange={e => setData({ ...data, status: e.target.value })}>
                                        <option value="Active">Active</option>
                                        <option value="In Repair">In Repair</option>
                                        <option value="Standby">Standby</option>
                                    </select>
                                </div>
                            </>
                        ) : type === 'incharge' ? (
                            <>
                                <div className="form-group">
                                    <label className="form-label">Name</label>
                                    <input className="form-input" value={data.name || ''} onChange={e => setData({ ...data, name: e.target.value })} required autoFocus />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Department</label>
                                    <input className="form-input" value={data.department || ''} onChange={e => setData({ ...data, department: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Contact</label>
                                    <input className="form-input" value={data.contact || ''} onChange={e => setData({ ...data, contact: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Assigned Bus</label>
                                    <input className="form-input" value={data.assignedBus || ''} onChange={e => setData({ ...data, assignedBus: e.target.value })} required />
                                </div>
                            </>
                        ) : type === 'route' ? (
                            <>
                                <div className="form-group">
                                    <label className="form-label">Route Name</label>
                                    <input className="form-input" value={data.name || ''} onChange={e => setData({ ...data, name: e.target.value })} required autoFocus />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Path</label>
                                    <input className="form-input" value={data.path || ''} onChange={e => setData({ ...data, path: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Stops</label>
                                    <input className="form-input" type="number" value={data.stops || ''} onChange={e => setData({ ...data, stops: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Timing</label>
                                    <input className="form-input" placeholder="e.g. 07:30 AM" value={data.timing || ''} onChange={e => setData({ ...data, timing: e.target.value })} required />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="form-group">
                                    <label className="form-label">Broadcast Title</label>
                                    <input className="form-input" value={data.title || ''} onChange={e => setData({ ...data, title: e.target.value })} required autoFocus />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Message Content</label>
                                    <textarea className="form-input" style={{ minHeight: '100px', resize: 'vertical' }} value={data.content || ''} onChange={e => setData({ ...data, content: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Date</label>
                                    <input className="form-input" type="date" value={data.date || new Date().toISOString().split('T')[0]} onChange={e => setData({ ...data, date: e.target.value })} required />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">{isEdit ? 'Save Changes' : 'Create Entry'}</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = React.useState('dashboard');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState(null);
    const [modalType, setModalType] = React.useState(''); // 'student' or 'bus'
    const [searchTerm, setSearchTerm] = React.useState('');

    // Persistent initial data state
    const [students, setStudents] = useLocalStorage('bus_students', [
        { id: '1', name: 'Rahul Sharma', studentId: 'KPR-24-CS-042', route: 'Route #12', contact: '+91 98765 43210' },
        { id: '2', name: 'Priya Mani', studentId: 'KPR-24-EC-015', route: 'Route #05', contact: '+91 98765 43215' },
        { id: '3', name: 'Arjun Das', studentId: 'KPR-24-ME-089', route: 'Route #12', contact: '+91 98765 43212' },
    ]);

    const [buses, setBuses] = useLocalStorage('bus_vehicles', [
        { id: '1', number: 'TN-37-AZ-1234', driver: 'S. Rajesh', status: 'Active', capacity: '52' },
        { id: '2', number: 'TN-37-BY-5678', driver: 'M. Kumar', status: 'In Repair', capacity: '40' },
        { id: '3', number: 'TN-37-CK-9012', driver: 'K. Balaji', status: 'Active', capacity: '52' },
    ]);

    const [incharges, setIncharges] = useLocalStorage('bus_incharges', [
        { id: '1', name: 'Prof. Kumar', department: 'CSE', contact: '+91 94432 10001', assignedBus: 'TN-37-AZ-1234' },
        { id: '2', name: 'Dr. Sarah', department: 'ECE', contact: '+91 94432 10002', assignedBus: 'TN-37-BY-5678' },
    ]);

    const [routes, setRoutes] = useLocalStorage('bus_routes', [
        { id: '1', name: 'Route #12', path: 'Saravanampatty -> Gandhipuram', stops: '8', timing: '07:30 AM' },
        { id: '2', name: 'Route #05', path: 'Peelamedu -> Hope College', stops: '12', timing: '07:15 AM' },
    ]);

    const [broadcasts, setBroadcasts] = useLocalStorage('bus_broadcasts', [
        { id: 1, title: 'Exam Special Bus', content: 'Special buses will run at 5 PM for exam students.', date: '2026-02-23' },
        { id: 2, title: 'Route #05 Delayed', content: 'Due to traffic, Route 5 is running 15 mins late.', date: '2026-02-22' },
    ]);

    const handleAdd = (type) => {
        setModalType(type);
        if (type === 'student') setModalData({ name: '', studentId: '', route: '', contact: '' });
        else if (type === 'bus') setModalData({ number: '', driver: '', status: 'Active', capacity: '' });
        else if (type === 'incharge') setModalData({ name: '', department: '', contact: '', assignedBus: '' });
        else if (type === 'route') setModalData({ name: '', path: '', stops: '', timing: '' });
        else if (type === 'broadcast') setModalData({ title: '', content: '', date: new Date().toISOString().split('T')[0] });
        setIsModalOpen(true);
    };

    const handleEdit = (type, data) => {
        setModalType(type);
        setModalData({ ...data });
        setIsModalOpen(true);
    };

    const handleDelete = (type, id) => {
        if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
            if (type === 'student') setStudents(students.filter(s => s.id !== id));
            else if (type === 'bus') setBuses(buses.filter(b => b.id !== id));
            else if (type === 'incharge') setIncharges(incharges.filter(i => i.id !== id));
            else if (type === 'route') setRoutes(routes.filter(r => r.id !== id));
        }
    };

    const handleSave = () => {
        const data = modalData;
        if (modalType === 'student') {
            if (data.id) setStudents(prev => prev.map(s => s.id === data.id ? data : s));
            else setStudents(prev => [...prev, { ...data, id: Date.now().toString() }]);
        } else if (modalType === 'bus') {
            if (data.id) setBuses(prev => prev.map(b => b.id === data.id ? data : b));
            else setBuses(prev => [...prev, { ...data, id: Date.now().toString() }]);
        } else if (modalType === 'incharge') {
            if (data.id) setIncharges(prev => prev.map(i => i.id === data.id ? data : i));
            else setIncharges(prev => [...prev, { ...data, id: Date.now().toString() }]);
        } else if (modalType === 'route') {
            if (data.id) setRoutes(prev => prev.map(r => r.id === data.id ? data : r));
            else setRoutes(prev => [...prev, { ...data, id: Date.now().toString() }]);
        } else if (modalType === 'broadcast') {
            setBroadcasts(prev => [{ ...data, id: Date.now() }, ...prev]);
        }
        setIsModalOpen(false);
    };

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'buses', label: 'Bus Management', icon: Bus },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
        { id: 'incharges', label: 'Incharges', icon: ShieldCheck },
        { id: 'routes', label: 'Routes', icon: Route },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
    ];

    const renderContent = () => {
        const stats = [
            { label: 'Total Buses', value: buses.length, icon: Bus },
            { label: 'Active Students', value: students.length, icon: Users },
            { label: 'Incharges', value: incharges.length, icon: ShieldCheck },
            { label: 'Active Routes', value: routes.length, icon: Map },
        ];

        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="animate-fade-in" style={{ display: 'grid', gap: '2rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="stats-card"
                                >
                                    <div className="stats-icon"><stat.icon size={24} /></div>
                                    <div className="stats-info">
                                        <div className="stats-value">{stat.value}</div>
                                        <div className="stats-label">{stat.label}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {/* Quick Actions */}
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="section-card">
                                <h3 className="section-title"><Zap size={20} className="text-primary" /> Management Quick Actions</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                    <button className="btn btn-outline" style={{ height: '80px', flexDirection: 'column', gap: '0.5rem' }} onClick={() => handleAdd('student')}>
                                        <UserPlus size={20} /> Add Student
                                    </button>
                                    <button className="btn btn-outline" style={{ height: '80px', flexDirection: 'column', gap: '0.5rem' }} onClick={() => handleAdd('bus')}>
                                        <Bus size={20} /> Add Vehicle
                                    </button>
                                    <button className="btn btn-outline" style={{ height: '80px', flexDirection: 'column', gap: '0.5rem' }} onClick={() => handleAdd('broadcast')}>
                                        <Bell size={20} /> New Broadcast
                                    </button>
                                    <button className="btn btn-outline" style={{ height: '80px', flexDirection: 'column', gap: '0.5rem' }} onClick={() => setActiveTab('routes')}>
                                        <Map size={20} /> Manage Routes
                                    </button>
                                </div>
                            </motion.div>

                            {/* System Health */}
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="section-card">
                                <h3 className="section-title"><ShieldCheck size={20} className="text-primary" /> System Capacity</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                            <span style={{ fontWeight: 600 }}>Total Seat Occupancy</span>
                                            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>84%</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: 'var(--bg-main)', borderRadius: '4px', overflow: 'hidden' }}>
                                            <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} transition={{ duration: 1, ease: 'easeOut' }} style={{ height: '100%', background: 'var(--primary)' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                            <span style={{ fontWeight: 600 }}>Incharge Report Status</span>
                                            <span style={{ color: 'hsl(142, 76%, 36%)', fontWeight: 700 }}>100% OK</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: 'var(--bg-main)', borderRadius: '4px', overflow: 'hidden' }}>
                                            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, delay: 0.5 }} style={{ height: '100%', background: 'hsl(142, 76%, 36%)' }} />
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.5rem' }}>
                                        All systems are functioning normally. No critical issues reported today.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                );
            case 'attendance':
                return (
                    <div className="section-card animate-fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 className="section-title" style={{ marginBottom: 0 }}><CalendarCheck size={20} className="text-primary" /> Transport Attendance Logs</h3>
                        </div>
                        <div className="data-table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Total Strength</th>
                                        <th>Present</th>
                                        <th>Absent</th>
                                        <th>Route Compliance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { date: '2026-02-23', total: 450, present: 432, absent: 18, compliance: '98%' },
                                        { date: '2026-02-22', total: 450, present: 435, absent: 15, compliance: '99%' },
                                        { date: '2026-02-21', total: 450, present: 420, absent: 30, compliance: '96%' },
                                    ].map((log, i) => (
                                        <tr key={i}>
                                            <td style={{ fontWeight: 600 }}>{log.date}</td>
                                            <td>{log.total} Students</td>
                                            <td className="text-success">{log.present}</td>
                                            <td className="text-danger">{log.absent}</td>
                                            <td><span className="badge badge-primary">{log.compliance}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'buses':
                const filteredBuses = buses.filter(b =>
                    b.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    b.driver.toLowerCase().includes(searchTerm.toLowerCase())
                );
                return (
                    <div className="section-card animate-fade-in" key="buses-tab">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                            <h3 className="section-title" style={{ marginBottom: 0 }}><Bus size={20} className="text-primary" /> Bus Fleet</h3>
                            <div style={{ display: 'flex', gap: '0.75rem', flex: 1, maxWidth: '400px' }}>
                                <input
                                    className="form-input"
                                    placeholder="Search buses..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ margin: 0 }}
                                />
                                <button className="btn btn-primary" onClick={() => handleAdd('bus')} style={{ whiteSpace: 'nowrap' }}><Plus size={18} /> Add Bus</button>
                            </div>
                        </div>
                        <div className="data-table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Bus Number</th>
                                        <th>Driver</th>
                                        <th>Status</th>
                                        <th>Capacity</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBuses.map((bus) => (
                                        <tr key={bus.id}>
                                            <td style={{ fontWeight: 800 }}>{bus.number}</td>
                                            <td>{bus.driver}</td>
                                            <td>
                                                <span className={`badge badge-${bus.status === 'Active' ? 'success' : bus.status === 'In Repair' ? 'danger' : 'warning'}`}>
                                                    {bus.status}
                                                </span>
                                            </td>
                                            <td>{bus.capacity} Seats</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="btn-icon" onClick={() => handleEdit('bus', bus)}><Edit size={16} /></button>
                                                    <button className="btn-icon delete" onClick={() => handleDelete('bus', bus.id)}><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'students':
                const filteredStudents = students.filter(s =>
                    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    s.studentId.toLowerCase().includes(searchTerm.toLowerCase())
                );
                return (
                    <div className="section-card animate-fade-in" key="students-tab">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                            <h3 className="section-title" style={{ marginBottom: 0 }}><Users size={20} className="text-primary" /> Student Directory</h3>
                            <div style={{ display: 'flex', gap: '0.75rem', flex: 1, maxWidth: '400px' }}>
                                <input
                                    className="form-input"
                                    placeholder="Search students..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ margin: 0 }}
                                />
                                <button className="btn btn-primary" onClick={() => handleAdd('student')} style={{ whiteSpace: 'nowrap' }}><Plus size={18} /> Add Student</button>
                            </div>
                        </div>
                        <div className="data-table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>ID</th>
                                        <th>Route</th>
                                        <th>Contact</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map((student) => (
                                        <tr key={student.id}>
                                            <td style={{ fontWeight: 600 }}>{student.name}</td>
                                            <td><code>{student.studentId}</code></td>
                                            <td>{student.route}</td>
                                            <td>{student.contact}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="btn-icon" onClick={() => handleEdit('student', student)}><Edit size={16} /></button>
                                                    <button className="btn-icon delete" onClick={() => handleDelete('student', student.id)}><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'incharges':
                return (
                    <div className="section-card animate-fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 className="section-title" style={{ marginBottom: 0 }}><ShieldCheck size={20} className="text-primary" /> Bus Incharges</h3>
                            <button className="btn btn-primary" onClick={() => handleAdd('incharge')}><Plus size={18} /> Add Incharge</button>
                        </div>
                        <div className="data-table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Dept</th>
                                        <th>Contact</th>
                                        <th>Assigned Bus</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {incharges.map((inc) => (
                                        <tr key={inc.id}>
                                            <td style={{ fontWeight: 600 }}>{inc.name}</td>
                                            <td>{inc.department}</td>
                                            <td>{inc.contact}</td>
                                            <td><code style={{ background: 'var(--bg-main)', padding: '2px 6px', borderRadius: '4px' }}>{inc.assignedBus}</code></td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="btn-icon" onClick={() => handleEdit('incharge', inc)}><Edit size={16} /></button>
                                                    <button className="btn-icon delete" onClick={() => handleDelete('incharge', inc.id)}><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'routes':
                return (
                    <div className="section-card animate-fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 className="section-title" style={{ marginBottom: 0 }}><Map size={20} className="text-primary" /> Route Optimization</h3>
                            <button className="btn btn-primary" onClick={() => handleAdd('route')}><Plus size={18} /> New Route</button>
                        </div>
                        <div className="data-table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Route Name</th>
                                        <th>Path</th>
                                        <th>Stops</th>
                                        <th>Timing</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {routes.map((route) => (
                                        <tr key={route.id}>
                                            <td style={{ fontWeight: 700 }}>{route.name}</td>
                                            <td style={{ fontSize: '0.85rem' }}>{route.path}</td>
                                            <td><span className="badge badge-primary">{route.stops} Stops</span></td>
                                            <td style={{ fontWeight: 600 }}>{route.timing}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="btn-icon" onClick={() => handleEdit('route', route)}><Edit size={16} /></button>
                                                    <button className="btn-icon delete" onClick={() => handleDelete('route', route.id)}><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'messages':
                return (
                    <div className="section-card animate-fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 className="section-title" style={{ marginBottom: 0 }}><MessageSquare size={20} className="text-primary" /> Broadcast Center</h3>
                            <button className="btn btn-primary" onClick={() => handleAdd('broadcast')}><Plus size={18} /> New Broadcast</button>
                        </div>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {broadcasts.map(msg => (
                                <div key={msg.id} className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xl)', borderLeft: '4px solid var(--primary)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <h4 style={{ fontWeight: 700, color: 'var(--text-main)' }}>{msg.title}</h4>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{msg.date}</span>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{msg.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="section-card animate-fade-in">
                        <h3 className="section-title">Field: {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Advanced management tools for {activeTab} are currently being configured.</p>
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
            <AnimatePresence>
                {isModalOpen && (
                    <CRUDModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSave}
                        type={modalType}
                        data={modalData}
                        setData={setModalData}
                    />
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
};

// Internal Import helper
const LayoutDashboard = BarChart3;

export default AdminDashboard;
