// Récupération du module 'file system' de Node permettant de gérer les images
const fs = require('fs');

//connexion a la bdd
const db = require('../connect/dbConnect.js');
const userModel = require('../models/userModel.js');
//import postModel
const postModel = require('../models/postModel.js');

//requete sql
const mysql = require('mysql');

/*------------------------------------CREATE POST------------------------------------- */
exports.addPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);

  const post = {
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  }
  console.log(post);
  postModel.createPost(post)
    .then(() => res.status(201).json({ message: 'post enregistrée' }))
    .catch(error => {
      console.log(error);
      res.status(400).json({ error: "le post ne peut pas etre ajouter" })
    });

}


//exports.addPost2 = (req, res, next) => {
//  let userId = req.body.userId;
//  let title = req.body.title;
//  let content = req.body.content;
//  let image = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;
//  //recuperation de la date
//  let dateNow = new Date();
//  //transformation de la date actuel en date locale France
//  let dateSignup = dateNow.toLocaleString('fr-FR', {
//    weekday: 'long',
//    year: 'numeric',
//    month: 'long',
//    day: 'numeric',
//    hour: 'numeric',
//    minute: 'numeric',
//    second: 'numeric'
//  });

//  console.log(image);
//  console.log(title);
//  console.log(content);
//  console.log(userId);
//  console.log(dateSignup);

//  postModel.createPost(userId, title, content, image, dateSignup)
//    .then(response => {
//      console.log(response);
//      return res.status(201).json({ message: 'Post ajouté' })
//    })
//    .catch(error => {
//      console.log(error);
//      return res.status(400).json({ message: "impossible d'ajouté le post(catch)" })
//    })
//};


/*---------------------------------READ ALL POST--------------------------------- */
exports.getAllPost = (req, res, next) => {

  postModel.getPosts()
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


//post par membre
exports.getAllPostByIdMember = (req, res, next) => {
  let userId = req.params.id;
  console.log(userId);
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
exports.modifyPost = (req, res, next) => {
  res.status(200).json({ message: "route update post" });

}

/*------------------------------------DELETE POST------------------------------------- */
exports.deletePost = (req, res, next) => {
  res.status(200).json({ message: "route delete post" });



};


/*----------------------------------like and dislike post------------------------------------ */

exports.likeDislikePost = (req, res, next) => {
  res.status(200).json({ message: "route like post" })

};