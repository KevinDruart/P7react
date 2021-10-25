
const db = require('../connect/dbConnect.js');

//creer un post
exports.createPost = (userId, title, content, image, datePost) => {
    const sql = `INSERT INTO post(user_id, title, content, image, time_post) VALUES(?,?,?,?,?)`;
    return new Promise((resolve, reject) => {
        try {
            console.log('execution dbquery');
            db.query(sql, [userId, title, content, image, datePost], (error, result, fields) => {

                if (result === undefined) {
                    reject(`Impossible de créer un nouveau post.`);
                    console.log(result);
                    console.log('probleme requete sql');
                } else {
                    resolve(result);
                    console.log('requete sql OK')
                };
            });
        } catch (error) {
            reject(error);
            console.log('erreur promesse requete sql');
        };
    });
};

//modifier un post
exports.updatePost = () => {
  console.log("route modif post")
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

//post par id membre
exports.getPostsByIdMember = (id) => {
    const sql = 'SELECT numPost, title, content, image, time_post, firstname, name, id FROM post INNER JOIN user ON post.user_id = user.id WHERE user.id = ? ORDER BY time_post DESC ';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql,[id], (error, result, fields) => {
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