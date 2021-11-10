const db = require('../connect/dbConnect.js');

//LIKE OU DISLIKE UN POST
exports.createNewLike = (like) => {
    const sql = 'INSERT INTO `likes`( `user_id`, `post_id`, `like`) VALUES(?,?,?)';
    return new Promise((resolve, reject) => {
        try {
            console.log('execution dbquery');
            db.query(sql, [like.userId, like.postId, like.iLike], (error, result, fields) => {
                if (result === undefined) {
                    reject(result);
                    console.log('erreur requete')
                } 
                else {
                    resolve(result);
                    console.log('requete sql like OK')
                };
            });
        } catch (error) {
            reject(error);
            console.log(error, 'erreur promesse requete sql like');
        };
    });
}

//RECUPERER TOUT LES LIKE OU DISLIKE 
exports.getLike = () => {
    const sql = 'SELECT u.name , u.firstname ,u.id AS userId ,p.id AS postId , p.title , p.content ,p.image AS postImage ,l.like ,l.id FROM likes AS l INNER JOIN post AS p ON l.post_id = p.id INNER JOIN user AS u ON l.user_id = u.id ';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, (error, result, fields) => {
                if (result === undefined) {
                    reject(`Affichage des posts impossible.`);
                } else {
                    resolve(result);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
}

//FIND LIKE SUR LE POST
exports.findOneLike = (like) => {
    console.log(like);
    const sql = 'SELECT  u.id AS userId ,p.id AS postId , l.user_id AS userLikeId, l.like ,l.id FROM likes AS l INNER JOIN post AS p ON l.post_id = p.id INNER JOIN user AS u ON l.user_id = u.id WHERE p.id=?';
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

//MODIFIER UN LIKE
exports.updateLike = (likeUser) => {
    const sql = 'UPDATE `likes` SET `like`=? WHERE user_id=? AND post_id=?';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [likeUser.like, likeUser.userId, likeUser.postId], (error, result, fields) => {
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