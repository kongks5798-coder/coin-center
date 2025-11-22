import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Mock database
let tasks: any[] = [];

// GET /api/tasks
router.get('/', (req, res) => {
  const { status, priority, team } = req.query;
  
  let filteredTasks = [...tasks];
  
  if (status) {
    filteredTasks = filteredTasks.filter(t => t.status === status);
  }
  if (priority) {
    filteredTasks = filteredTasks.filter(t => t.priority === priority);
  }
  if (team) {
    filteredTasks = filteredTasks.filter(t => t.team === team);
  }
  
  res.json({ tasks: filteredTasks });
});

// GET /api/tasks/:id
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  res.json({ task });
});

// POST /api/tasks
router.post('/',
  body('title').notEmpty(),
  body('description').notEmpty(),
  body('status').isIn(['pending', 'in-progress', 'review', 'completed', 'blocked']),
  body('priority').isIn(['urgent', 'high', 'medium', 'low']),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = {
      id: `task-${Date.now()}`,
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    tasks.push(task);
    
    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  }
);

// PUT /api/tasks/:id
router.put('/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks[index] = {
    ...tasks[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json({
    message: 'Task updated successfully',
    task: tasks[index]
  });
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks.splice(index, 1);
  
  res.json({ message: 'Task deleted successfully' });
});

export default router;
