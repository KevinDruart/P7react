const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const commentsCtrl = require('../controllers/comments');

//ajout d'un commentaire
router.post('/post/:id', auth, commentsCtrl.create);

//recuperer les commentaires d'un post
router.get('/post/:id', auth, commentsCtrl.getAll);

//modifier un commentaire
router.put('/:id', auth, commentsCtrl.update);

//supprimer un commentaire
router.delete('/:id', auth, commentsCtrl.delete);

module.exports = router;