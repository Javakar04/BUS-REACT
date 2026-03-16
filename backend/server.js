import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Load mock data
const dataPath = path.join(__dirname, 'data.json');
let db = { users: [], studentData: {}, adminData: {}, inchargeData: {} };

try {
  const fileData = fs.readFileSync(dataPath, 'utf-8');
  db = JSON.parse(fileData);
  console.log('✅ Mock Database Mock loaded successfully.');
} catch (err) {
  console.error('❌ Failed to load data.json:', err);
}

// ---------------------------
// REST API ENDPOINTS
// ---------------------------

// 1. Login Endpoint
app.post('/api/login', (req, res) => {
  const { username, password, role } = req.body;
  const user = db.users.find(u => u.username === username && u.password === password && u.role === role);
  
  if (user) {
    // Exclude password from response
    const { password, ...userData } = user;
    res.json({ success: true, user: userData, token: `mock-token-${user.id}` });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials or role' });
  }
});

// 2. Student Dashboard Data
app.get('/api/student/:id', (req, res) => {
  const { id } = req.params;
  const data = db.studentData[id];
  if (data) {
    // Find basic user info to merge
    const user = db.users.find(u => u.id === id);
    res.json({ success: true, profile: user, dashboard: data });
  } else {
    res.status(404).json({ success: false, message: 'Student data not found' });
  }
});

// 3. Admin Dashboard Data
app.get('/api/admin', (req, res) => {
  res.json({ success: true, data: db.adminData });
});

// 4. Incharge Dashboard Data
app.get('/api/incharge', (req, res) => {
  res.json({ success: true, data: db.inchargeData });
});

// 5. Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'College Bus System API is running.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Express Backend Server running on http://localhost:${PORT}`);
});
