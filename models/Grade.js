const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  rollNumber: {
    type: String,
    trim: true,
    default: ''
  },
  subject: {
    type: String,
    required: [true, 'Subject name is required'],
    trim: true
  },
  grade: {
    type: Number,
    required: [true, 'Grade is required'],
    min: [0, 'Grade cannot be less than 0'],
    max: [100, 'Grade cannot exceed 100']
  },
  credits: {
    type: Number,
    default: 3,
    min: 1,
    max: 6
  },
  semester: {
    type: String,
    default: 'Fall 2025',
    trim: true
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Grade', gradeSchema);
