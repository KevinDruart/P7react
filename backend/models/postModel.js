
const db = require('../connect/dbConnect.js');

//CREER UN POST
exports.createPost = (message) => {
    const sql = `INSERT INTO post(user_id, title, content, image, time_post) VALUES(?,?,?,?,NOW())`;
    return new Promise((resolve, reject) => {
        try {
            console.log('execution dbquery');
            db.query(sql, [message.userId, message.title, message.content, message.imageUrl], (error, result, fields) => {

                if (result === undefined) {
                    reject(result);

                } else {
                    resolve(result);

                    console.log('requete sql OK')
                };
            });
        } catch (error) {
            reject(error);
            console.log(error, 'erreur promesse requete sql');
        };
    });
};

//MODIFIER UN POST
exports.updatePost = () => {
    console.log("route modif post")
};

//RECUPERER TOUT LES POSTS
exports.getPosts = () => {
    const sql = 'SELECT post.id, title, content, image, time_post, firstname, name, user.id as userId FROM post INNER JOIN user ON post.user_id = user.id ORDER BY time_post DESC';
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
};

//RECUPERER UN MEMBRE PAR SON ID
exports.getPostsByIdMember = (id) => {
    const sql = 'SELECT post.id, title, content, image, time_post, firstname, name, user.id as userId FROM post INNER JOIN user ON post.user_id = user.id WHERE user.id = ? ORDER BY time_post DESC ';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [id], (error, result, fields) => {
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
};

//SUPPRIMER UN POST
exports.deletePostsById = (id) => {
    const sql = 'DELETE  FROM `post` WHERE id = ? ';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [id], (error, result, fields) => {
                if (result === undefined) {
                    reject(`suppression du post impossible.`);
                } else {
                    resolve(result);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
};

//LIKE OU DISLIKE UN POST
exports.likeOrDislike = (like) => {
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

//RECUPERER LES LIKES D'UN POST AVEC SON ID
exports.getOneLikeById = (postId) => {
    const sql = 'SELECT u.name , u.firstname ,u.id AS userId ,p.id AS postId , p.title , p.content ,p.image AS postImage ,l.like ,l.id FROM likes AS l INNER JOIN post AS p ON l.post_id = p.id INNER JOIN user AS u ON l.user_id = u.id WHERE p.id=? ';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [postId], (error, result, fields) => {
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