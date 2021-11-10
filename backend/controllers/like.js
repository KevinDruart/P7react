//Récupération du module 'file system' de Node permettant de gérer les images
const fs = require('fs');

//modele post
const likeModel = require('../models/likeModel.js');

/*creer un like*/
exports.createLike = (req, res, next) => {
    let like = { ...req.body };
    console.log(like);
    //on recupere les like sur le post 
    likeModel.findOneLike(like)
      //promesse (j'ai un like sur ce post de ce membre)
      .then(response => {
        console.log(response);
        //si l'on a aucun like deja present sur ce post
        if (response.like === 0 && like.iLike === 1 || response.like === 0 && like.iLike === -1) {
          likeModel.likeOrDislike(like)
            //on a notre promesse
            .then(likes => {
              return res.status(200).json({ message: 'ok like' });
            })
            //erreur promesse
            .catch(error => {
              return res.status(401).json({
                message: error
              });
            });
        }
        //si un like est present mais different du like actuel
        else if (response.like === -1 && like.iLike === 1 || response.like === 1 && like.iLike === -1) {
          //il faut dabord retirer le jaime ou le jaime pas avant de pouvoir like ou dislike
        }
        else if (response.like === 1 && like.iLike === 1 || response.like === -1 && like.iLike === -1) {
          //alors on retire le like ou le dislike
        }
      })
      //erreur 
      .catch(error => {
        return res.status(400).json({ error: error })
      })
}


/*rechercher les like*/


/*modifier un like*/


/*supprimer un like*/