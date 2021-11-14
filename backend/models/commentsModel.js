const db = require('../connect/dbConnect.js');

//CREER UN COMMENTAIRE
exports.createComment = (comment) => {
    const sql = 'INSERT INTO `comment`(`user_id`, `comment`, `time_comment`, `post_id`) VALUES (?,?,NOW(),?)';
    return new Promise((resolve, reject) => {
        try {
            console.log('execution dbquery');
            db.query(sql, [comment.userId, comment.comment, comment.postId], (error, result, fields) => {
                if (result === undefined) {
                    reject(result);
                } else {
                    resolve(result);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
};

//RECUPERER TOUT LES COMMENTAIRES SUR UN POST
exports.getAllComment = (postId) => {
    console.log(postId);
    const sql = 'SELECT p.id AS postId, u.name, u.firstname,u.id AS userId, c.id, c.user_id AS commentUserId, c.time_comment, c.comment FROM comment AS c INNER JOIN post AS p ON c.post_id = p.id INNER JOIN user AS u ON c.user_id = u.id WHERE p.id = ? ORDER BY time_comment DESC';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [postId], (error, result, fields) => {

                if (result === undefined) {
                    reject(`Affichage des commentaires impossible.`);
                } else {
                    resolve(result);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
};

//RECUPERER LE NOMBRE DE COMMENTAIRES SUR UN POST
exports.getAllNb= (postId) => {
    console.log(postId);
    const sql = 'SELECT COUNT(*) AS nB FROM `comment`WHERE post_id=?';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [postId], (error, result, fields) => {
                if (result === undefined || result === "") {
                    reject("Erreur Sql");
                } else {
                    resolve(result[0]);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
};

