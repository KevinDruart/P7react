const db = require('../connect/dbConnect.js');

//creer un post
exports.createPost = (userId, title, message, image) => {
    const sql = 'INSERT INTO post(user_id, title, content, image) VALUES(?,?,?,?)';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [userId, title, message, image], (error, result, fields) => {
                console.log(db.query);
                if (result === undefined) {
                    reject(`Impossible de créer un nouveau post.`);
                } else {
                    resolve(`post ajouté`);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
};

//modifier un post
exports.updatePost = (title, message, image) => {
    const sql = 'UPDATE INTO post( title, content, image) VALUES(?,?,?)';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [title, message, image], (error, result, fields) => {
                if (result === undefined) {
                    reject(`Impossible de modifier le post.`);
                } else {
                    resolve(`post modifié`);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
};

//chercher les post
exports.getPosts = () => {
    const sql = 'SELECT numPost, title, content, image, time_post, firstname, name, id FROM post INNER JOIN user ON post.user_id = user.id ORDER BY time_post DESC';
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