//connexion a la bdd
//const db = require('../connect/dbConnect.js'); // PROMISE à virer
const userModel = require('../models/userModel.js');

//securisation authentification avec un TOKEN genéré
const jwt = require('jsonwebtoken');

//hashage MDP
const bcrypt = require('bcrypt');

//maskage email
const maskData = require('../node_modules/maskdata/index');

/*TEST */

exports.test = (req, res, next) => {
  console.log(req.body);
}

/*
exports.signup = (req, res, next) => {
  console.log(req.body);
}*/



/*-----------------------------------------SIGNUP--------------------------------------------*/
// INSCRIPTION D'UN UTILISATEUR avec hashage MDP (BCRYPT) et maskage email(maskdata)
// Promise
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

  console.log(req.body);

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

  console.log(req.body.name + 'test signup1');

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
  //Récupération et sauvegarde dans une variable de l'userId
  let user = req.userIdToken;
  console.log(user);
  //verification si userId = Sauce.userId (si l'utilisateur est propriètaire de la sauce)
  let userObject = { ...req.body };


  // Si la modification contient une image
  userModel.findOneById({
    _id: req.params.id
  }).then((user) => {

  }),

    sauceObject = {
      ...req.body
    }

  if (req.userIdToken === userObject.userId) {
    userModel.updateOne(
      // On applique les paramètre de sauceObject
      {
        _id: req.params.id
      }, {
      ...sauceObject,
      _id: req.params.id
    }
    )
      .then(() => res.status(200).json({ message: 'profil modifiée !' })
      )
      .catch((error) => res.status(400).json({ error: 'profil est introuvable' })
      )
  }
  else {
    res.status(401).json({ error: "Vous ne disposez pas des droits pour modifier ce profil !" });
  }
}


/*------------------------------------DELETE USER------------------------------------- */
exports.deleteUser = (req, res, next) => {
  userModel.findOneBy(req.body.id)
    //on a notre promesse
    .then(user => {
      //on verifie si l'id du body est identique au req.userIdToken
      if (req.body.id === req.userIdToken) {
        //on appel la view du profile et lui passe l'user
        createProfile(user);
      }
      //sinon
      else {
        //on retourne un message d'erreur
        res.status(400).json({ message: "Votre id est introuvable" });
      }

    })
    //erreur promesse
    .catch(error => {
      return res.status(401).json({
        message: error
      });
    });
};
