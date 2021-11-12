const db = require('../connect/dbConnect.js');

//CREER UN COMMENTAIRE
exports.createComment = (comment) => {
    console.log(comment);
    const sql = 'INSERT INTO `comment`(`user_id`, `comment`, `time_comment`, `post_id`) VALUES (?,?,NOW(),?)';
    return new Promise((resolve, reject) => {
        try {
            console.log('execution dbquery');
            db.query(sql, [comment.userId, comment.comment,  comment.postId], (error, result, fields) => {
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

//RECUPERER TOUT LES POSTS
exports.getAllComment = (postId) => {
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