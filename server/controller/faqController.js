const asyncHandler = require('express-async-handler')

const Faqs = require('../models/faqModel')
const User = require('../models/userModel')

//Get GET FAQs
//route GET /api/goals
// @access Private
const getFAQs = asyncHandler(async (req, res) => {
  const FAQs = await Faqs.find({ user: req.user.id })
  res.status(200).json(FAQs)
})

//Get SET FAQs
//route POST /api/goals
// @access Private
const setFAQs = asyncHandler(async (req, res) => {
  if (!req.body.data.category || !req.body.data.question || !req.body.data.answer) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const faq = await Faqs.create({
    category: req.body.data.category,
    question: req.body.data.question,
    answer: req.body.data.answer,
    user: req.user.id,
  })

  res.status(200).json(faq)
})

//Get UPDATe FAQs
//route PUT /api/goals/:id
// @access Private
const updateFAQs = asyncHandler(async (req, res) => {
  const faq = await Faqs.findById(req.params.id)

  if(!faq) {
    res.status(400)
    throw new Error('FAQ not found')
  }

  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (faq.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User  Not Authoraized')
  }

  const updateFAQ = await Faqs.findByIdAndUpdate(req.params.id, req.body, { new: true 
  })

  res.status(200).json(updateFAQ)
})

//Get Delete FAQs
//route DELETE /api/goals
// @access Private
const deleteFAQs = asyncHandler(async (req, res) => {
  const faq = await Faqs.findById(req.params.id)

  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (faq.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User  Not Authoraized')
  }

  if(!faq) {
    res.status(400)
    throw new Error('FAQ not found')
  }

  await faq.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getFAQs,
  setFAQs,
  updateFAQs,
  deleteFAQs,
}