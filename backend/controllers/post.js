//Récupération du module 'file system' de Node permettant de gérer les images
const fs = require('fs');

//modele post
const postModel = require('../models/postModel.js');

/*------------------------------CREATE POST------------------------------------- */
exports.addPost = (req, res, next) => {
  let postObject = req.file ?
    { ...JSON.parse(req.body.post), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
    : { ...req.body, imageUrl: null };

  postObject = { ...postObject, userId: req.jwtToken.userId };

  postModel.createPost(postObject)
    //on a une promesse
    .then(() => {
      return res.status(201).json({ message: 'post enregistrée' })
    })
    //on a une erreur
    .catch(error => {
      return res.status(400).json({ error: "le post ne peut pas etre ajouter" })
    });

}

/*---------------------------------READ ALL POST--------------------------------- */
exports.getAllPost = (req, res, next) => {

  postModel.getPosts()
    //on a notre promesse
    .then(posts => {
      return res.status(200).json(posts);
    })
    //erreur promesse
    .catch(error => {
      return res.status(401).json({
        message: error
      });
    });
}

//Récuperer les post d'un membre
exports.getAllPostByIdMember = (req, res, next) => {
  let userId = req.params.id;

  postModel.getPostsByIdMember(userId)
    //on a notre promesse
    .then(posts => {
      res.status(200).json(posts);
    })
    //erreur promesse
    .catch(error => {
      return res.status(401).json({
        message: error
      });
    });
}

/*------------------------------------UPDATE POST------------------------------------- */
exports.updatePost = (req, res, next) => {
  console.log('demande update')
  console.log(req.body)
  let postId = req.params.id;
  //console.log(postId);

  postModel.find(postId)
    .then(post => {
      console.log('il y a bien un post avec cet id');
      let postObject = req.file ?
        { ...JSON.parse(req.body.post), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
        : { ...req.body, imageUrl: null };

      postObject = { ...postObject, userId: req.jwtToken.userId, postId };

      if (post.user_id === postObject.userId) {
        console.log('userId === postUserId, je lance update');
        postModel.update(postObject)
          //on a une promesse
          .then(response => {
            console.log(postObject);
            console.log('update effectué');
            return res.status(201).json({ message: 'post modifié' });
          })
          //on a une erreur
          .catch(error => {
            console.log('erreur update');
            return res.status(400).json({ error: "le post ne peut pas etre modifier" });
          });
      }
      else {
        alert("vous n'avez pas les droits de modifier ce post");
      }
    })
    .catch(error => {
      console.log('erreur post introuvable');
    });
}

/*------------------------------------DELETE POST------------------------------------- */
exports.deletePost = (req, res, next) => {
  const postId = req.params.id;

  postModel.deletePostsById(postId)
    //on a notre promesse
    .then(post => {
      return res.status(200).json({ message: 'post supprimer' });
    })
    //erreur promesse
    .catch(error => {
      return res.status(401).json({
        message: error
      });
    });


};

