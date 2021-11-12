//modele post
const commentsModel = require('../models/commentsModel.js');
const userModel = require('../models/postModel');

//AJOUTER UN COMMENTAIRE
exports.create = (req, res, next) => {
    console.log("commenter");
    let userId = req.body.userId;
    console.log(userId);

    const comment = {
        userId: userId,
        postId: req.params.id,
        comment: req.body.comment
    }
    console.log(comment);
    userModel.isExistId(userId)
        .then(resultat => {
            if (resultat.nb > 0) {
                console.log("j'ai un user");
                commentsModel.createComment(comment)
                    .then(response => {
                        console.log("create");
                        console.log(response);
                        return res.status(200).json({ response });
                    })
                    .catch(error => {
                        console.log("erreur catch");
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