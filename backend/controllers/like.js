//modele post
const likeModel = require('../models/likeModel.js');

/*liker ou disliker*/
exports.createLike = (req, res, next) => {
    let UId = req.jwtToken.userId;
    let like = { ...req.body };
    //console.log(like);
    likeModel.findCountLike(like)
        .then(resultat => {
            //console.log(resultat);
            if (resultat.nb === 0) {
                likeModel.createNewLike(like, UId)
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
            else {
                //on recupere les like sur le post 
                likeModel.findOneLike(like)
                    //promesse (j'ai un like sur ce post de ce membre)
                    .then(response => {
                        //console.log(response.like);
                        //console.log(like.iLike);
                        //console.log(response.like !== like.iLike)
                        if (response.like !== like.iLike) {
                            //console.log("update");
                            let likeUser = response;
                            likeUser.like = like.iLike;
                            //console.log(likeUser);
                            //il faut dabord retirer le jaime ou le jaime pas avant de pouvoir like ou dislike
                            likeModel.updateLike(likeUser)
                                .then(result => {
                                    res.status(200).json({ result })
                                })
                                .catch(error => {
                                    return res.status(400).json({ error: error });
                                })
                        }
                        else {
                            return res.status(200).json({ message: "deja liké" });
                        }
                    })
            }
        })

        //erreur 
        .catch(error => {
            return res.status(400).json({ error: error })
        })
}

/*Connaitre le nombre de like ou dislike */
exports.countNb = (req, res, next) => {
    let postId = req.params.id;
    //console.log(postId);

    likeModel.countLikeAndDislike(postId)
        //on a notre promesse
        .then(nbLike => {
            res.status(200).json(nbLike);
        })
        //erreur promesse
        .catch(error => {
            return res.status(401).json({
                message: error
            });
        });
}

/*Afficher si j'ai like ou dislike*/
exports.whoLike = (req, res, next) => {
    let postId = req.params.id;
    //console.log('whoLike');
    //console.log(postId);

    likeModel.iLikedOrDisliked(postId, req.jwtToken.userId)
        //on a notre promesse
        .then(like => {
            res.status(200).json(like);
        })
        //erreur promesse
        .catch(error => {
            return res.status(401).json({
                message: error
            });
        });
}
