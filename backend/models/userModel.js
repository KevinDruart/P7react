const db = require('../connect/dbConnect.js');

//recherche si un membre existe avec un email
exports.isExist = (email) => {
    const sql = 'SELECT count(*) as nb FROM user WHERE email = ?';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [email], (error, result, fields) => {
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

//recherche si un membre existe avec un id
exports.isExistId = (userId) => {
    const sql = 'SELECT count(*) as nb FROM user WHERE id = ?';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [userId], (error, result, fields) => {
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

//trouve un membre avec son email
exports.findOneBy = (email) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [email], (error, result, fields) => {
                if (result === undefined || result === "") {
                    reject('Adresse email et ou mot de passe incorrect !');
                } else {
                    resolve(result[0]);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
};

//creer un nouveau membre
exports.create = (name, firstName, emailMasked, email, hash) => {
    const sql = 'INSERT INTO user(name, firstname, emailMasked, email, password) VALUES(?,?,?,?,?)';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [name, firstName, emailMasked, email, hash], (error, result, fields) => {
                if (result === undefined) {
                    reject(`Impossible de créer un nouvel utilisateur.`);
                } else {
                    resolve(`utilisateur ajouté`);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
};

//trouve un membre avec son id
exports.findOneById = (id) => {
    const sql = 'SELECT name, firstname, email, dateSignup FROM user WHERE id = ?';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [id], (error, result, fields) => {
                if (result === undefined || result === "") {
                    reject('Id introuvable !');
                } else {
                    resolve(result);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
};

//recuperer tout les membres
exports.findAll = () => {
    const sql = 'SELECT `id`, `name`, `firstname`, `emailMasked`, `dateSignup`, `roles` FROM `user`';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, (error, result, fields) => {
                if (result === undefined) {
                    reject(`Impossible de recuperer les utilisateurs.`);
                } else {
                    resolve(result);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
};

//modifier un membre
exports.updateOne = (name, firstName, emailMasked, email, hash) => {
    const sql = 'UPDATE INTO user(name, firstname, emailMasked, email, password) VALUES(?,?,?,?,?)';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [name, firstName, emailMasked, email, hash], (error, result, fields) => {
                if (result === undefined) {
                    reject(`Impossible de modifier utilisateur.`);
                } else {
                    resolve(`utilisateur modifié`);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
};

//supprimer un membre
exports.deleteOne = (id) => {
    const sql = 'DELETE  FROM `post` WHERE id = ?';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [id], (error, result, fields) => {
                if (result === undefined) {
                    reject(`Impossible de supprimer utilisateur.`);
                } else {
                    resolve(`utilisateur supprimé`);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
};