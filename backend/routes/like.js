const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const likeCtrl = require('../controllers/like');


//ajout like ou dislike d'un post
router.post('/:id', auth, likeCtrl.createLike);



module.exports = router;