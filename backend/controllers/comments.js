//modele post
const commentsModel = require('../models/commentsModel.js');
const userModel = require('../models/userModel');

//AJOUTER UN COMMENTAIRE
exports.create = (req, res, next) => {

    let userId = req.body.userId;
    const comment = {
        userId: req.body.userId,
        postId: req.params.id,
        comment: req.body.comment
    }
    userModel.isExistId(userId)
        .then(resultat => {
            if (resultat.nb > 0) {
                commentsModel.createComment(comment)
                    .then(response => {
                        return res.status(200).json({ response });
                    })
                    .catch(error => {
                        return res.status(400).json({ message: "erreur ajout de commentaire" })
                    })
            }
        })
        .catch(error => {
            return res.status(400).json({ message: "vous devez etre inscrit pour commenter un post" });
        })
}

//RECUPERER LES COMMENTAIRES SUR UN POST
exports.getAll = (req, res, next) => {
    let postId = req.params.id;
    commentsModel.getAllComment(postId)
        //on a notre promesse
        .then(comments => {
            return res.status(200).json(comments);
        })
        //erreur promesse
        .catch(error => {
            return res.status(401).json({
                message: error
            });
        });
}

//MODIFIER UN COMMENTAIRE
exports.update = (req, res, next) => {
    const commentId = req.params.id;
    commentsModel.getOneById(commentId)
        .then(resultat => {
            //console.log(resultat);
            if (resultat.nb > 0) {
                console.log('ok le commentaire existe');
                //on verifie si l'utilisateur et bien l'auteur du commentaire

                //si oui on modifie
                //si non on bloque
            }
            else {
                console.log('error commentaire inexistant');
            }

        })
        .catch(error => {
            console.log(error);
        })
}

//SUPPRIMER UN COMMENTAIRE
exports.delete = (req, res, next) => {
    const id = req.params.id;
//verifier si le commentaire existe
    commentsModel.deleteOne(id)
        //on a notre promesse
        .then(comment => {
            return res.status(200).json({ message: 'commentaire supprimer' });
        })
        //erreur promesse
        .catch(error => {
            return res.status(401).json({
                message: error
            });
        });
}

