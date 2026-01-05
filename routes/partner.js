const express = require('express');
const router = express.Router();
const {
  createPartner,
  getAllPartners,
  getPartnerById,
  updatePartnerStatus,
  deletePartner
} = require('../controllers/partnerController');

// Public routes
router.post('/', createPartner);

// Admin routes (add authentication middleware later)
router.get('/', getAllPartners);
router.get('/:id', getPartnerById);
router.patch('/:id/status', updatePartnerStatus);
router.delete('/:id', deletePartner);

module.exports = router;
