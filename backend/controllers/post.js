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
  console.log(req.body);
  const postId = req.params.id;
  const isAdmin = req.body.isAdmin;

  postModel.find(postId)
    .then(post => {
      console.log('je suis ici');
      console.log(post);
      let postObject = req.file ?
        { ...JSON.parse(req.body.post), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
        : { ...req.body };

      postObject = { ...postObject, userId: req.jwtToken.userId, postId };

      if (post.user_id === postObject.userId || isAdmin === true) {
        postModel.update(postObject)
          //on a une promesse
          .then(response => {
            return res.status(201).json({ message: 'post modifié' });
          })
          //on a une erreur
          .catch(error => {
            return res.status(400).json({ error: "le post ne peut pas etre modifier" });
          });
      }
      else {
        return res.status(401).json({message:"vous n'avez pas les droits de modifier ce post"});
      }
    })
    .catch(error => {
      return res.status(404).json({ error: "le post est introuvable" });
    });
}

/*------------------------------------DELETE POST------------------------------------- */
exports.deletePost = (req, res, next) => {
  console.log(req.body);
  const postId = req.params.id;
  const isAdmin = req.body.isAdmin;

  console.log(isAdmin);
  
  postModel.find(postId)
    .then(post => {
      console.log(post)
      console.log(post.user_id);
      console.log(req.jwtToken.userId);
      if (post.user_id === req.jwtToken.userId || isAdmin === true) {
        postModel.deletePostsById(post.id)
          //on a notre promesse
          .then(reponse => {
            return res.status(200).json({ message: 'post supprimer' });
          })
          //erreur promesse
          .catch(error => {
            return res.status(401).json({ message: error });
          });
      }
      else {
        return res.status(401).json({ message: "Vous n'êtes pas propriétaire du post et n'avez pas les autorisations de le modifier" });
      }

    })
    .catch(error => {
      return res.status(404).json({ message: "le post est introuvable" });
    })




};

