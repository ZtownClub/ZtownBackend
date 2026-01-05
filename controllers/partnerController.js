const Partner = require('../models/Partner');

// Create new partner application
exports.createPartner = async (req, res) => {
  try {
    const { name, email, brandName, contactNumber, website, storeAddress } = req.body;

    // Validation
    if (!name || !email || !brandName || !contactNumber || !storeAddress) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled'
      });
    }

    // Check if partner already exists
    const existingPartner = await Partner.findOne({ email });
    if (existingPartner) {
      return res.status(400).json({
        success: false,
        message: 'A partner application with this email already exists'
      });
    }

    // Create partner
    const partner = await Partner.create({
      name,
      email,
      brandName,
      contactNumber,
      website,
      storeAddress
    });

    res.status(201).json({
      success: true,
      message: 'Partner application submitted successfully! Our team will contact you within 24 hours.',
      data: partner
    });

  } catch (error) {
    console.error('Partner creation error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A partner with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit partner application. Please try again.',
      error: error.message
    });
  }
};

// Get all partners (Admin)
exports.getAllPartners = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    
    const partners = await Partner.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: partners.length,
      data: partners
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch partners',
      error: error.message
    });
  }
};

// Get single partner by ID
exports.getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    
    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found'
      });
    }

    res.status(200).json({
      success: true,
      data: partner
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch partner',
      error: error.message
    });
  }
};

// Update partner status
exports.updatePartnerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const partner = await Partner.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Partner application ${status} successfully`,
      data: partner
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update partner status',
      error: error.message
    });
  }
};

// Delete partner
exports.deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Partner deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete partner',
      error: error.message
    });
  }
};
