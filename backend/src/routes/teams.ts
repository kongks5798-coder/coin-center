import express from 'express';

const router = express.Router();

// Mock database
const teams = [
  { id: 'design', name: '디자인팀', icon: '🎨', color: 'purple', maxMembers: 7 },
  { id: 'mardmard', name: 'MARD MARD', icon: '🎬', color: 'pink', maxMembers: 8 },
  { id: 'production', name: '생산팀', icon: '🏭', color: 'blue', maxMembers: 3 },
  { id: 'online', name: '온라인팀', icon: '💻', color: 'cyan', maxMembers: 3 },
  { id: 'offline', name: '오프라인팀', icon: '🏪', color: 'fuchsia', maxMembers: 2 },
  { id: 'operations', name: '운영지원팀', icon: '⚙️', color: 'emerald', maxMembers: 7 }
];

// GET /api/teams
router.get('/', (req, res) => {
  res.json({ teams });
});

// GET /api/teams/:teamId
router.get('/:teamId', (req, res) => {
  const team = teams.find(t => t.id === req.params.teamId);
  
  if (!team) {
    return res.status(404).json({ error: 'Team not found' });
  }
  
  res.json({ team });
});

// GET /api/teams/:teamId/members
router.get('/:teamId/members', (req, res) => {
  // Mock members data
  const members = [
    { id: 'user-1', name: '김필드', role: 'manager', status: 'active' },
    { id: 'user-2', name: '이크리에이티브', role: 'staff', status: 'active' }
  ];
  
  res.json({ members });
});

// GET /api/teams/:teamId/tasks
router.get('/:teamId/tasks', (req, res) => {
  // Mock tasks data
  const tasks = [
    { 
      id: 'task-1', 
      title: 'NEXUS OS 대시보드 업데이트',
      status: 'in-progress',
      priority: 'high'
    }
  ];
  
  res.json({ tasks });
});

export default router;
