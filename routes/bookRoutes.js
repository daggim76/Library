const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

// router.param('id', bookController.checkID);

// router
//   .route('/top-5-books')
//   .get(bookController.aliasTopBooks, bookController.getAllBooks);

router.route('/book-stats').get(bookController.getBookStats);
// router.route('/monthly-plan/:year').get(bookController.getMonthlyPlan);

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

router
  .route('/:id')
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
