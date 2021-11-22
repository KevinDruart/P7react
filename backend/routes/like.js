const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const likeCtrl = require('../controllers/like');

//ajout like ou dislike d'un post
router.post('/:id', auth, likeCtrl.createLike);

//compter les like et dislike sur un post
router.get('/:id', auth, likeCtrl.countNb);

//voir qui a like
router.get('/post/:id', auth, likeCtrl.whoLike);

module.exports = router;