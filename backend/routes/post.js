
const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');


/*------------------------------------------------ENDPOINTS----------------------------------------------------*/
/*******POST **********/
//Get all posts
router.get('/', auth, postCtrl.getAllPost);
//Get all post d'un membre
router.get('/post/:id', auth, postCtrl.getAllPostByIdMember);
//Create post
router.post('/', auth, multer, postCtrl.addPost);
//Modify post
router.put('/:id', auth, multer, postCtrl.modifyPost);
//delete post
router.delete('/:id', auth, postCtrl.deletePost);

/*******LIKE **********/
//ajout/annulation like ou dislike d'un post
router.post('/:id/like', auth, postCtrl.likeDislikePost);



module.exports = router;