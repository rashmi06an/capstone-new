const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice
} = require('../controllers/invoiceController');

router.get('/', authenticateToken, getAllInvoices);
router.get('/:id', authenticateToken, getInvoiceById);
router.post('/', authenticateToken, createInvoice);
router.put('/:id', authenticateToken, updateInvoice);
router.delete('/:id', authenticateToken, deleteInvoice);

module.exports = router;

