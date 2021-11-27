//connexion a la bdd
const userModel = require('../models/userModel.js');

//securisation authentification avec un TOKEN genéré
const jwt = require('jsonwebtoken');

//hashage MDP
const bcrypt = require('bcrypt');

//maskage email
const maskData = require('../node_modules/maskdata/index');

/*-----------------------------------------SIGNUP--------------------------------------------*/
exports.signup = (req, res, next) => {
  //configuration du masquage email
  const emailMask2Options = {
    //caractere de masquage
    maskWith: "*",
    //nombre de caractere sans masque avant @
    unmaskedStartCharactersBeforeAt: 2,
    //nombre de caractere sans masque apres @
    unmaskedEndCharactersAfterAt: 3,
    maskAtTheRate: false
  };

  //on recupére l'email présent dans le body
  let email = req.body.email;
  //on récupére le reste des données dans le body
  //nom
  let name = req.body.name;
  //prénom
  let firstName = req.body.firstName;
  //mot de passe
  let password = req.body.password;
  //masquage email 
  let emailMasked = maskData.maskEmail2(req.body.email, emailMask2Options);


  //On attribue un nombre de tour au hashage et ou salage
  const saltRounds = 10;

  // On appelle la méthode hash de bcrypt
  bcrypt.hash(password, saltRounds, (error, hash) => {

    //On vérifie si cet adresse email est deja enregistrer dans la BDD
    userModel.isExist(email)
      .then(resultat => {
        if (resultat.nb > 0) {
          return res.status(400).json({
            error: "adresse email deja enregistré"
          });
        }
        userModel.create(name, firstName, emailMasked, email, hash)
          .then(resultat => {

            return res.status(200).json({
              message: resultat
            });
          })
          .catch(error => {
            return res.status(400).json({
              message: error
            });
          });
      })
      .catch(error => {
        return res.status(400).json({
          error: "Une erreur est survenue."
        });
      });
  });
};

/*-----------------------------------------LOGIN--------------------------------------------*/
exports.login = (req, res, next) => {
  //on recupére l'email présent dans le body
  let email = req.body.email;

  userModel.findOneBy(email)
    .then(user => {

      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: 'Adresse email et ou mot de passe incorrect !'
            });
          }
          return res.status(200).json({
            userId: user.id,
            roles: user.roles,
            token: jwt.sign({
              userId: user.id
            },
              // Clé d'encodage du token
              process.env.TOKEN,
              // expiration au bout de 24h
              {
                expiresIn: '24h'
              }
            )
          });
        })
        .catch(error => res.status(400).json({
          error
        }));
    })
    .catch(error => {
      return res.status(401).json({
        message: error
      });
    });
};

/*-------------------------------------- GET USER -------------------------------------*/
exports.getUser = (req, res, next) => {
  let userId = req.params.id;

  userModel.findOneById(userId)
    //on a notre promesse
    .then(user => {
      return res.status(200).json(user);
    })
    //erreur promesse
    .catch(error => {
      return res.status(401).json({
        message: error
      });
    });
};

exports.getAllUser = (req, res, next) => {
  userModel.findAll()
    //on a notre promesse
    .then(user => {
      return res.status(200).json(user);
    })
    //erreur promesse
    .catch(error => {
      return res.status(401).json({
        message: error
      });
    });
};

/*------------------------------------UPDATE USER------------------------------------- */
exports.modifyUser = (req, res, next) => {
  const emailMask2Options = {
    //caractere de masquage
    maskWith: "*",
    //nombre de caractere sans masque avant @
    unmaskedStartCharactersBeforeAt: 3,
    //nombre de caractere sans masque apres @
    unmaskedEndCharactersAfterAt: 3,
    maskAtTheRate: false
  };
  //on récupére le reste des données dans le body et params
  let userId = req.params.id;
  //nom
  let name = req.body.name;
  //prénom
  let firstname = req.body.firstname;

  //email
  let email = req.body.email;

  //masquage email 
  let emailMasked = maskData.maskEmail2(req.body.email, emailMask2Options);
  userModel.isExistId(userId)
    .then(resultat => {
      if (resultat.nb === 1) {
        userModel.update(name, firstname, email, emailMasked, userId)
          .then(resultat => {
            return res.status(200).json({
              message: resultat
            });
          })
          .catch(error => {
            return res.status(400).json({
              message: error
            });
          });
      }
      else {
        return res.status(400).json({message: "utilisateur introuvable"});
      }
    })
    .catch(error => {
      return res.status(400).json({
        error: "Une erreur est survenue."
      });
    });

}

/*------------------------------------DELETE USER------------------------------------- */
exports.deleteUser = (req, res, next) => {

  let userId = req.params.id;

  userModel.isExistId(userId)
    //on a notre promesse
    .then((response) => {
      userModel.deleteOne(userId)
        .then((result) => {
          return res.status(200).json({ message: 'utilisateur supprimer' })
        })
        .catch((error) => {
          return res.status(400).json({ message: "impossible de supprimer" });
        })
    })
    //erreur promesse
    .catch(error => {
      return res.status(401).json({
        message: error
      });
    });


};
