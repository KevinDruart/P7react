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
exports.modifyPost = (req, res, next) => {
  //Récupération et sauvegarde dans une variable de l'userId
  let user = req.userIdToken;
  console.log(user);

  let postObject = {};
  req.file ?
    (
      // Si la modification contient une image
      postModel.find({
        id: req.params.id
      }).then((post) => {
        // On supprime l'ancienne image du serveur
        const filename = post.imageUrl.split('/images/')[1]
        fs.unlinkSync(`images/${filename}`)
      }),
      postObject = {
        // On modifie les données et on ajoute la nouvelle image
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      }
    ) : (
      // Si la modification ne contient pas de nouvelle image
      postObject = {
        ...req.body
      }
    )
  if (req.userIdToken === postObject.userId) {
    postModel.update(
      // On applique les paramètre de sauceObject
      {
        id: req.params.id
      }, {
      ...postObject,
      id: req.params.id
    }
    )
      .then(() => res.status(200).json({ message: 'Post modifiée !' })
      )
      .catch((error) => res.status(400).json({ error: 'le Post est introuvable' })
      )
  }
  else {
    res.status(401).json({ error: "Vous ne disposez pas des droits pour modifier ce Post !" });
  }
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

