const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

//CREATE
router.post('/', auth, multer, postCtrl.addPost);

//READ ONE
router.get('/', auth, postCtrl.getAllPost);

//READ ALL
router.get('/post/:id', auth, postCtrl.getAllPostByIdMember);

//UPDATE
router.put('/:id', auth, multer, postCtrl.updatePost);

//DELETE
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;