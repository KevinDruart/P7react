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
  const userId = req.userId;
  postModel.createPost({
    UserId: userId,
    title: req.body.title,
    content: req.body.message,
    image: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null,
  })
    .then(() => res.status(201).json({ message: "Post enregistré !" }))
    .catch((error) => {
      console.log(error.message);
      return res.status(400).json({ error });
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