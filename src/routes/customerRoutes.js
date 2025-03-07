const express = require('express');
const {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');

const router = express.Router();

// CRUD Routes
router.get('/', getCustomers);
router.get('/:id', getCustomerById);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.patch('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
