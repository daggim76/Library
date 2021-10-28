const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A book must have a name'],
    trim: true,
    maxlength: [40, 'A book name must have less or equal then 40 characters'],
    minlength: [2, 'A book name must have more or equal then 2 characters'],
    // validate: [validator.isAlpha, 'Book name must only contain characters']
  },
  slug: String,

  department: {
    type: String,
    required: [true, 'A book must have a department'],
    enum: {
      values: ['Computer Science', 'Marketing', 'Accounting', 'Managment'],
      message: 'Department is either: Marketing, Accounting, Managment',
    },
  },
  ISBN: {
    type: Number,
    min: [8, 'Rating must be above 1.0'],
    max: [15, 'Rating must be below 5.0'],
  },
  quantity: {
    type: Number,
    default: 1,
  },

  edition: {
    type: Number,
    default: 1,
  },

  summary: {
    type: String,
    trim: true,
    required: [true, 'A book must have a description'],
  },
  author: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
  },
  images: [String],
  year: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
bookSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// bookSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// bookSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// bookSchema.pre('find', function(next) {
// bookSchema.pre(/^find/, function (next) {
//   this.find({ secretBook: { $ne: true } });

//   this.start = Date.now();
//   next();
// });

bookSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
bookSchema.pre('aggregate', function (next) {
  this.pipeline().unshift();

  console.log(this.pipeline());
  next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
