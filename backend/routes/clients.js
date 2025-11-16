const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/clientController');

router.get('/', authenticateToken, getAllClients);
router.get('/:id', authenticateToken, getClientById);
router.post('/', authenticateToken, createClient);
router.put('/:id', authenticateToken, updateClient);
router.delete('/:id', authenticateToken, requireAdmin, deleteClient);

module.exports = router;

