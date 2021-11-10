
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

