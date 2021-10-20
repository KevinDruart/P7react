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
  let id = req.body.userId;
  userModel.isExistId(id)
    .then(resultat => {
      if (resultat.nb = 0) {
        return res.status(400).json({
          error: "Vous devez etre connecter pour poster"
        });
      }
      postModel.createPost(userId, dateTime, title, message, image)

        .then(resultat => {
          return res.status(200).json({
            message: resultat
          });
        })
        .catch(error => {
          return res.status(400).json({
            message: error
          });
        });
    })
    .catch(error => {
      console.log(error);
      return res.status(400).json({ error: "Une erreur est survenue." });
    });
};


/*---------------------------------READ ALL POST--------------------------------- */
exports.getAllPost = (req, res, next) => {

  postModel.getPosts(req.body.id)
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