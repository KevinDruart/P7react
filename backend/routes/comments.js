const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const commentsCtrl = require('../controllers/comments');


//ajout d'un commentaire
router.post('/', auth, commentsCtrl.create);

//recuperer les commentaires d'un post
router.get('/:id', auth, commentsCtrl.getAll);


module.exports = router;