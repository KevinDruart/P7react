const db = require('../connect/dbConnect.js');

//LIKE OU DISLIKE UN POST
exports.createNewLike = (like, UId) => {
    const sql = 'INSERT INTO `likes`( `user_id`, `post_id`, `like`) VALUES(?,?,?)';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [UId, like.postId, like.iLike], (error, result, fields) => {
                if (result === undefined) {
                    reject(result);
                } 
                else {
                    resolve(result);
                };
            });
        } catch (error) {
            reject(error);
            return res.status(400).json({message:'erreur dans la requete SQL'})
        };
    });
}

//FIND LIKE SUR LE POST
exports.findOneLike = (like) => {
    const sql = 'SELECT * FROM likes WHERE post_id=? AND user_id=?';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [like.postId, like.userId], (error, result, fields) => {
                if (result === undefined || result === "") {
                    reject("aucun like sur ce post");
                } else {
                    resolve(result[0]);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
}

//VOIR SI LE MEMBRE A LIKER CE POST
exports.findCountLike = (like) => {
    const sql = 'SELECT count(*) AS nb FROM likes WHERE post_id=? AND user_id=?';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [like.postId, like.userId], (error, result, fields) => {
                if (result === undefined || result === "") {
                    reject("aucun like sur ce post");
                } else {
                    resolve(result[0]);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
}

//MODIFIER UN LIKE
exports.updateLike = (likeUser) => {
    const sql = 'UPDATE `likes` SET `like`=? WHERE user_id=? AND post_id=?';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [likeUser.like, likeUser.user_id, likeUser.post_id], (error, result, fields) => {
                if (result === undefined || result === "") {
                    reject("aucun like sur ce post");
                } else {
                    resolve(result[0]);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
}

//VOIR SI LE MEMBRE A LIKER CE POST
exports.findCountNbLike = (like) => {

    const sql = 'SELECT count(*) AS nb FROM likes WHERE post_id=? AND like=1';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [like.postId], (error, result, fields) => {
                if (result === undefined || result === "") {
                    reject("aucun like sur ce post");
                } else {
                    resolve(result[0]);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
}

exports.countLikeAndDislike = (postId) => {
    const sql = 'SELECT (SELECT COUNT(*) FROM `likes` WHERE post_id=? AND likes.like >0) as liked, (SELECT COUNT(*) FROM `likes` WHERE post_id=? AND likes.like <0) as disliked from DUAL';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [postId, postId], (error, result, fields) => {
                if (result === undefined || result === "") {
                    reject("aucun like sur ce post");
                } else {
                    resolve(result[0]);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
}

exports.iLikedOrDisliked = (postId, userId) => {
    const sql = 'SELECT user_id, post_id, likes.like FROM likes WHERE post_id=? and user_id = ?';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [postId, userId], (error, result, fields) => {
                if (result === undefined || result === "") {
                    reject("aucun like sur ce post");
                } else {
                    resolve(result);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
} 