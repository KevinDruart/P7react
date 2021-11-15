//modele post
const commentsModel = require('../models/commentsModel.js');
const userModel = require('../models/userModel');

//AJOUTER UN COMMENTAIRE
exports.create = (req, res, next) => {
    //console.log(req.body);

    let userId = req.body.userId;
    const comment = {
        userId: req.body.userId,
        postId: req.body.postId,
        comment: req.body.comment
    }
    //console.log(comment);
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

