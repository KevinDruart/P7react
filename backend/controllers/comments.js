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

    const updateComments = {
        id: req.params.id,
        comment: req.body.comment,
    }

    userModel.findOneById(req.jwtToken.userId)
        .then(user => {
            commentsModel.getOneById(commentId)
                .then(comment => {
                    //on verifie si l'utilisateur est le proprietaire du commentaire ou si c'est un admin
                    if (comment[0].user_id === user[0].id || user[0].roles === "admin") {
                        commentsModel.updateOne(updateComments)
                            .then(reponse => {
                                return res.status(200).json({ message: "modification du commentaire reussie" });
                            })
                            .catch(error => {
                                return res.status(400).json({ message: "erreur l'update du commentaires n'a pas pu se faire" });
                            })
                    }
                    //si non on bloque
                    else {
                        return res.status(401).json({ message: "Vous n'avez pas l'autorisation de modifier" });
                    }
                })
                .catch(error => {
                    return res.status(400).json({ message: "Commentaires introuvable" });
                })
        })
        .catch(error => {
            return res.status(400).json({ message: "utilisateur introuvable" })
        })
    //on verifie si l'utilisateur et bien l'auteur du commentaire


}

//SUPPRIMER UN COMMENTAIRE
exports.delete = (req, res, next) => {
    const id = req.params.id;

    userModel.findOneById(req.jwtToken.userId)
        .then(user => {
            commentsModel.getOneById(id)
                .then(response => {
                    //on verifie si l'utilisateur est le proprietaire du commentaire ou si c'est un admin
                    if (response[0].user_id === user[0].id || user[0].roles === "admin") {
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
                    else {
                        return res.status(401).json({ message: "Ce n'est pas votre commentaire et vous n'avez pas les droit de supprimer ce commentaire." })
                    }
                })
                .catch(error => {
                    return res.status(400).json({ message: "commentaires introuvable" })
                })
        })
        .catch(error => {
            return res.status(400).json({ message: "utilisateur introuvable" })
        })


}

