import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    UserCircle,
    CalendarDays,
    BusFront,
    Target,
    AlertCircle,
    Phone,
    GraduationCap,
    Clock,
    Bus,
    MapPin,
    ShieldAlert,
    CheckCircle2,
    XCircle,
    History,
    Shield,
    QrCode
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useLocalStorage } from '../hooks/useLocalStorage';

const StudentPortal = () => {
    const [activeTab, setActiveTab] = useState('profile-tab');
    const [isLoading, setIsLoading] = useState(true);
    const [studentData, setStudentData] = useState(null);
    const [attendanceStats, setAttendanceStats] = useState(null);
    const [routeStops, setRouteStops] = useState([]);
    const [requestHistory, setRequestHistory] = useState([]);
    const [tripActive, setTripActive] = useState(false);
    const [currentLocation, setCurrentLocation] = useState('Campus Depot');

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('user_data'));
                if (!userData || !userData.id) {
                    window.location.href = '/';
                    return;
                }

                const response = await fetch(`http://localhost:5000/api/student/${userData.id}`);
                const data = await response.json();

                if (data.success) {
                    setStudentData(data.profile);
                    setAttendanceStats(data.dashboard.attendance);
                    setRouteStops(data.dashboard.route.stops);
                    setTripActive(data.dashboard.route.active);
                    setCurrentLocation(data.dashboard.route.currentLocation);
                    setRequestHistory(data.dashboard.requests);
                } else {
                    console.error('Failed to load student data:', data.message);
                }
            } catch (error) {
                console.error('Error fetching student portal data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStudentData();
    }, []);

    const navItems = [
        { id: 'profile-tab', label: 'My Profile', icon: UserCircle },
        { id: 'attendance-tab', label: 'Attendance', icon: CalendarDays },
        { id: 'transport-tab', label: 'Transport Details', icon: BusFront },
        { id: 'requests-tab', label: 'Service Requests', icon: Target },
        { id: 'support-tab', label: 'Help & Support', icon: AlertCircle },
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning,';
        if (hour < 18) return 'Good Afternoon,';
        return 'Good Evening,';
    };

    const fadeProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile-tab':
                return (
                    <motion.div key="profile" {...fadeProps} style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
                        
                        {/* Virtual ID Card */}
                        <div
                            className="glass"
                            style={{ 
                                padding: '2rem', 
                                borderRadius: 'var(--radius-2xl)', 
                                borderTop: '4px solid var(--primary)',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-lg)'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', opacity: 0.05, transform: 'rotate(15deg)' }}>
                                <Shield size={200} />
                            </div>
                            
                            <div style={{ 
                                width: '120px', height: '120px', margin: '0 auto 1.5rem', 
                                borderRadius: '50%', background: 'var(--primary-soft)', border: '4px solid white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: 'var(--shadow-md)'
                            }}>
                                <UserCircle size={64} style={{ color: 'var(--primary)' }} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--text-main)' }}>{studentData.name}</h2>
                            <p style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '1px', marginBottom: '1rem' }}>{studentData.id}</p>
                            
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <span className="badge badge-primary">{studentData.dept}</span>
                            </div>

                            <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Blood Group:</span>
                                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{studentData.bloodGroup}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Valid Upto:</span>
                                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>May 2027</span>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                <QrCode size={16} /> Digital Access
                            </div>
                        </div>

                        {/* Details Panel */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="section-card">
                                <h3 className="section-title"><GraduationCap size={20} className="text-primary" /> Academic & Transport Info</h3>
                                <div className="info-box">
                                    <div className="info-item"><span className="info-key">Batch/Year</span><span className="info-val">{studentData.batch}</span></div>
                                    <div className="info-item"><span className="info-key">Assigned Route</span><span className="info-val" style={{ color: 'var(--primary)' }}>{studentData.busRoute}</span></div>
                                    <div className="info-item"><span className="info-key">Boarding Point</span><span className="info-val">{studentData.boardingPoint}</span></div>
                                </div>
                            </div>

                            <div className="section-card">
                                <h3 className="section-title"><Phone size={20} className="text-primary" /> Contact Information</h3>
                                <div className="info-box">
                                    <div className="info-item"><span className="info-key">Student Mobile</span><span className="info-val">{studentData.phone}</span></div>
                                    <div className="info-item"><span className="info-key">Emergency Contact</span><span className="info-val">{studentData.emergencyContact}</span></div>
                                    <div className="info-item"><span className="info-key">College Email</span><span className="info-val" style={{ textTransform: 'lowercase' }}>{studentData.id.toLowerCase()}@kpr.edu.in</span></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );

            case 'attendance-tab':
                return (
                    <motion.div key="attendance" {...fadeProps} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                        <div className="section-card">
                            <h3 className="section-title" style={{ marginBottom: '2rem' }}><CalendarDays size={20} className="text-primary" /> Transport Attendance Summary</h3>
                            
                            {/* Progress Ring Stats */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: `conic-gradient(var(--primary) ${attendanceStats.percentage}%, var(--primary-soft) 0)` }}>
                                        <div style={{ width: '100px', height: '100px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>{attendanceStats.percentage}%</span>
                                        </div>
                                    </div>
                                    <div className="stat-label">Overall Attendance</div>
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'hsl(142, 76%, 96%)', borderRadius: 'var(--radius-lg)', color: 'hsl(142, 76%, 36%)', fontWeight: 700 }}>
                                        <CheckCircle2 size={24} /> 
                                        <div style={{ flex: 1 }}>Days Present</div>
                                        <div style={{ fontSize: '1.25rem' }}>{attendanceStats.present}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'hsl(0, 84%, 96%)', borderRadius: 'var(--radius-lg)', color: 'hsl(0, 84%, 40%)', fontWeight: 700 }}>
                                        <XCircle size={24} /> 
                                        <div style={{ flex: 1 }}>Days Absent</div>
                                        <div style={{ fontSize: '1.25rem' }}>{attendanceStats.absent}</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-lg)' }}>
                                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><History size={16} className="text-muted" /> Recent Check-ins</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {[1, 2, 3].map((day) => (
                                        <div key={day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                                            <div>
                                                <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Today - Morning</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date().toLocaleDateString()} • {studentData.busRoute}</div>
                                            </div>
                                            <span className="badge badge-success">Present • 07:44 AM</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );

            case 'transport-tab':
                return (
                    <motion.div key="transport" {...fadeProps} style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
                        <div className="section-card flex flex-col">
                            <h3 className="section-title"><BusFront size={20} className="text-primary" /> Live Tracking</h3>
                            
                            {tripActive ? (
                                <div style={{ padding: '1.5rem', background: 'hsl(142, 76%, 96%)', borderRadius: 'var(--radius-lg)', border: '1px solid hsl(142, 76%, 80%)', flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(142, 76%, 36%)', fontWeight: 800, marginBottom: '1rem', fontSize: '1.1rem' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'hsl(142, 76%, 36%)' }}/>
                                        TRIP IN PROGRESS
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Current Location:</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem' }}>{currentLocation}</div>
                                    
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Estimated Arrival to College:</div>
                                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>08:45 AM</div>
                                </div>
                            ) : (
                                <div style={{ padding: '2rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Clock size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }} />
                                    <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '1.1rem' }}>Bus currently at Depot</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Next trip starts at 07:30 AM</div>
                                </div>
                            )}
                        </div>

                        <div className="section-card">
                            <h3 className="section-title"><MapPin size={20} className="text-primary" /> Route Timeline</h3>
                            <div style={{ padding: '1rem' }}>
                                {routeStops.map((stop, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '1.5rem', position: 'relative', paddingBottom: i !== routeStops.length - 1 ? '2rem' : '0' }}>
                                        {/* Timeline Line */}
                                        {i !== routeStops.length - 1 && (
                                            <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: 0, width: '2px', background: stop.status === 'completed' ? 'var(--primary)' : 'var(--border)' }} />
                                        )}
                                        
                                        {/* Timeline Dot */}
                                        <div style={{ 
                                            width: '24px', height: '24px', borderRadius: '50%', zIndex: 1,
                                            background: stop.status === 'completed' ? 'var(--primary)' : stop.status === 'current' ? 'var(--white)' : 'var(--bg-main)',
                                            border: `2px solid ${stop.status === 'pending' ? 'var(--border)' : 'var(--primary)'}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: stop.status === 'current' ? '0 0 0 4px hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.2)' : 'none'
                                        }}>
                                            {stop.status === 'completed' && <CheckCircle2 size={14} color="white" />}
                                            {stop.status === 'current' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}/>}
                                        </div>

                                        {/* Content */}
                                        <div style={{ flex: 1, marginTop: '2px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: stop.status === 'pending' ? 'var(--text-muted)' : 'var(--text-main)' }}>{stop.name}</h4>
                                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{stop.time}</span>
                                            </div>
                                            {stop.name === studentData.boardingPoint && (
                                                <span className="badge badge-primary" style={{ marginTop: '0.5rem' }}>Your Boarding Point</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                );

            case 'requests-tab':
                return (
                    <motion.div key="requests" {...fadeProps} style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 1fr', gap: '2rem' }}>
                        <div className="section-card">
                            <h3 className="section-title"><Target size={20} className="text-primary" /> New Service Request</h3>
                            <form className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-main)' }} onSubmit={(e) => { e.preventDefault(); alert('Request submitted successfully!'); }}>
                                <div className="form-group" style={{ marginBottom: '1rem' }}>
                                    <label className="form-label">Request Type</label>
                                    <select className="form-input">
                                        <option>Route Change</option>
                                        <option>Boarding Point Update</option>
                                        <option>Transport Fee Query</option>
                                        <option>Report Issue</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ marginBottom: '1rem' }}>
                                    <label className="form-label">Urgency</label>
                                    <select className="form-input">
                                        <option>Normal (Response: 48 hours)</option>
                                        <option>High (Response: 24 hours)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Detailed Description</label>
                                    <textarea className="form-input" style={{ minHeight: '120px', resize: 'vertical' }} placeholder="Specify your request details..."></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Submit Request</button>
                            </form>
                        </div>
                        
                        <div className="section-card">
                            <h3 className="section-title"><History size={20} className="text-primary" /> Request History</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {requestHistory.map((req, i) => (
                                    <div key={i} className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{req.type}</span>
                                            <span className={`badge ${req.status === 'Resolved' ? 'badge-success' : 'badge-warning'}`}>{req.status}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                            <span>ID: {req.id}</span>
                                            <span>Submitted: {req.date}</span>
                                        </div>
                                    </div>
                                ))}
                                <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                                    Displaying last 5 requests
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );

            case 'support-tab':
                return (
                    <motion.div key="support" {...fadeProps} style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '2rem' }}>
                        {/* Emergency Contact Card */}
                        <div className="section-card" style={{ background: 'var(--text-main)', color: 'white' }}>
                            <h3 className="section-title" style={{ color: 'white' }}><ShieldAlert size={20} color="hsl(0, 84%, 60%)" /> Emergency Contacts</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '2rem' }}>For immediate assistance during transit or on campus.</p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginBottom: '0.25rem' }}>Transport Supervisor</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        +91 99887 76655
                                        <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', background: 'hsl(0, 84%, 60%)' }}>Call</button>
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginBottom: '0.25rem' }}>Campus Security Office</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        +91 91234 56789
                                        <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', background: 'hsl(0, 84%, 60%)' }}>Call</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="section-card">
                            <h3 className="section-title"><AlertCircle size={20} className="text-primary" /> Frequently Asked Questions</h3>
                            <div style={{ display: 'grid', gap: '1rem', alignContent: 'start' }}>
                                {[
                                    { q: 'How do I track my bus in real-time?', a: 'Go to the "Transport Details" tab. If your bus is on a trip, you will see a live "Timeline" and ETA.' },
                                    { q: 'What happens if I forget my physical ID card?', a: 'You can show your Virtual ID Card from the "My Profile" tab to the Bus Incharge for digital verification.' },
                                    { q: 'How can I request a permanent route change?', a: 'Submit a "Route Change" request through the "Service Requests" tab. Approval takes 24-48 hours. You can track its status in the Request History.' },
                                    { q: 'Who do I contact if my bus is delayed?', a: 'Check the real-time tracker first. In extreme cases, check the Support tab for Transport Office contact numbers.' },
                                ].map((faq, i) => (
                                    <div key={i} className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
                                        <div style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', color: 'var(--text-main)' }}>
                                            <span style={{ color: 'var(--primary)' }}>Q:</span> {faq.q}
                                        </div>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                );

            default:
                return null;
        }
    };

    if (isLoading || !studentData) {
        return (
            <DashboardLayout
                role="student"
                title="Student Portal"
                navItems={navItems}
                activeItem={activeTab}
                onItemClick={setActiveTab}
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: 'var(--primary)' }}>
                    <h2>Loading dashboard data...</h2>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            role="student"
            title="Student Portal"
            navItems={navItems}
            activeItem={activeTab}
            onItemClick={setActiveTab}
        >
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.025em' }}>
                    {getGreeting()} <span style={{ color: 'var(--primary)' }}>{studentData.name.split(' ')[0]}</span> 👋
                </h1>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '0.5rem' }}>
                    <Bus size={16} /> Check your daily schedule and track your bus below.
                </p>
            </div>

            <AnimatePresence mode="wait">
                {renderContent()}
            </AnimatePresence>
        </DashboardLayout>
    );
};

export default StudentPortal;

