const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentsCtrl = require('../controllers/comments');

//CREATE
router.post('/post/:id', auth, commentsCtrl.create);

//READ
router.get('/post/:id', auth,  commentsCtrl.getAll);

//UPDATE
router.put('/:id', auth, commentsCtrl.update);

//DELETE
router.delete('/:id', auth, commentsCtrl.delete);

module.exports = router;