// controllers/pageVisitController.js

const PageVisit = require('../models/PageVisit');

// Controller function to update page visits
exports.updatePageVisit = async (req, res) => {
  const { label } = req.body;
console.log(req.body)
  try {
    let pageVisit = await PageVisit.findOne({ label });

    if (!pageVisit) {
      // If page visit record doesn't exist, create a new one
      pageVisit = new PageVisit({ label });
    }

    // Increment the visit count
    pageVisit.count++;

    // Save/update the page visit record
    await pageVisit.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating page visit:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Controller function to get page visits
exports.getPageVisits = async (req, res) => {
  try {
    // Retrieve all page visit records
    const pageVisits = await PageVisit.find();

    res.json({ success: true, pageVisits });
  } catch (error) {
    console.error('Error getting page visits:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
