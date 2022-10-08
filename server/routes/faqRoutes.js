const express = require('express');
const router = express.Router();
const { getFAQs, setFAQs, updateFAQs, deleteFAQs, } = require('../controller/faqController')
const { protect } = require('../middleware/authMiddleWare')

router.route('/').get(protect, getFAQs).post(protect, setFAQs)
router.route('/:id').put(protect, updateFAQs).delete(protect, deleteFAQs)

module.exports = router