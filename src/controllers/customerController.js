const customers = require('../models/customerModel');

// Get all customers (with filtering and pagination)
const getCustomers = (req, res) => {
  const { name, email, location, page = 1, limit = 10 } = req.query;

  let filteredCustomers = customers;

  // Filter by attributes
  if (name) {
    filteredCustomers = filteredCustomers.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (email) {
    filteredCustomers = filteredCustomers.filter(c => c.email.toLowerCase().includes(email.toLowerCase()));
  }
  if (location) {
    filteredCustomers = filteredCustomers.filter(c => c.location.toLowerCase().includes(location.toLowerCase()));
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  res.status(200).json({
    total: filteredCustomers.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginatedCustomers,
  });
};

// Get a single customer by ID
const getCustomerById = (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  if (!customer) return res.status(404).json({ message: 'Customer not found' });
  res.status(200).json(customer);
};

// Create a new customer
const createCustomer = (req, res) => {
  const { name, email, location } = req.body;
  if (!name || !email || !location) {
    return res.status(400).json({ message: 'Name, email, and location are required' });
  }

  const newCustomer = { id: customers.length + 1, name, email, location };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
};

// Update a customer
const updateCustomer = (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  if (!customer) return res.status(404).json({ message: 'Customer not found' });

  const { name, email, location } = req.body;
  if (name) customer.name = name;
  if (email) customer.email = email;
  if (location) customer.location = location;

  res.status(200).json(customer);
};

// Delete a customer
const deleteCustomer = (req, res) => {
  const customerIndex = customers.findIndex(c => c.id === parseInt(req.params.id));
  if (customerIndex === -1) return res.status(404).json({ message: 'Customer not found' });

  customers.splice(customerIndex, 1);
  res.status(204).send();
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
