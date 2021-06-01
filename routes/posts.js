const express = require('express');
const Post = require('../models/Post')
const libraryController = require('../controllers/libraryController')
const authenticate = require('../middleware/authenticate')

const router = express.Router();

router.get('/', libraryController.index)
router.get('/get-books', authenticate, libraryController.getList)
router.post('/create-new-book', authenticate, libraryController.createData)
router.patch('/update-book/:postId', authenticate, libraryController.updateData)
router.delete('/delete-book/:postId', authenticate, libraryController.deleteData)
router.get('/search/:postId', authenticate, libraryController.search)

module.exports = router;
