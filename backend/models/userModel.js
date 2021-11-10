const db = require('../connect/dbConnect.js');

//RECHERCHER SI UN MEMBRE EXISTE AVEC SON EMAIL
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

//RECHERCHER SI UN MEMBRE EXISTE AVEC SON ID
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

//TROUVER UN MEMBRE AVEC SON EMAIL
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

//CREER UN NOUVEAU MEMBRE
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

//TROUVER UN MEMBRE AVEC SON ID
exports.findOneById = (id) => {
    const sql = 'SELECT name, firstname, emailMasked, dateSignup FROM user WHERE id = ?';
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

//RECUPERER TOUT LES MEMBRES
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

//MODIFIER UN MEMBRE
exports.update = (name, firstname, email, emailMasked, userId) => {
    const sql = 'UPDATE `user` SET `name`=?,`firstname`=?, `email`=?, `emailMasked`=? WHERE id=?';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [name, firstname, email, emailMasked, userId], (error, result, fields) => {
                if (result === undefined) {
                    reject(`Impossible de modifier utilisateur.`);
                } else {
                    resolve(result);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
};

//SUPPRIMER UN MEMBRE
exports.deleteOne = (id) => {
    const sql = 'DELETE  FROM `user` WHERE id = ? ';
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, [id], (error, result, fields) => {
                if (result === undefined) {
                    reject(`suppression du membre impossible.`);
                } else {
                    resolve(result);
                };
            });
        } catch (error) {
            reject(error);
        };
    });
};