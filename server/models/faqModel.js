const mongoose = require('mongoose')
const uniqid = require('uniqid');

const faqSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      id: uniqid(),
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      id: uniqid(),
    },
    question: {
      type: String,
      required: [true, 'Please add a question'],
      id: uniqid(),
    },
    answer: {
      type: String,
      required: [true, 'Please add a answer'],
      id: uniqid(),
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Faqs', faqSchema)