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
  let userId = req.body.userId;
  let title = req.body.title;
  let content = req.body.content;
  let image = `${req.protocol}://${req.get('host')}/media/${req.file.filename}`;
  let dateSignup =  now();

  console.log(image);

  postModel.createPost(userId, title, content, image, dateSignup)
  .then(response => {
    console.log('post ajouter');
  })
  .catch(error => {
    console.log(error);
  })
};


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