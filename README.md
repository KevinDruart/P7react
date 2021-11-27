# Auteur

👤 &nbsp; **Druart Kevin** [Contactez moi](<k.druart2@gmail.com>)

* Github: [@Druart Kevin](https://github.com/KevinDruart)
* LinkedIn: [@Druart Kevin](https://www.linkedin.com/in/kevin-druart-430764201/)
* Visitez (prochainement) ==> 🏠 [Site Web]()

***

## Projet 7 - Construisez un reseau social d'entreprise

![100%](/BDD%20et%20image%20projet/indexGroupomania.jpg)
![100%](/BDD%20et%20image%20projet/loginGroupomania.jpg)
![100%](/BDD%20et%20image%20projet/signupGroupomania.jpg)
***

***Le but est de creer le frontend et le backend***

- Authentifier un utilisateur et maintenir sa session
- Personnaliser le contenu envoyé à un client web
- Gérer un stockage de données à l'aide de SQL
- Implémenter un stockage de données sécurisé en utilisant SQL


##### Contenus de ce repository et installation

* Ce repo contient les 2 dossiers `frontend` et `backend`.

### 1-Cloner le repository:

* Lien du repository: [@P7](https://github.com/KevinDruart/P7react.git)


### 2-Installation des serveurs et app

#### BACKEND
> Prérequis: vous aurez besoin d'avoir Node et npm installés localement sur votre machine.

```sh
cd backend
npm i
```


* Modifier le .env-dist en .env et modifier les informations comme indiquer :
```
dbConnectHost = "host"
dbConnectUser = "utilisateur"
dbConnectPassword = "password"
dbConnectPort = "port de la base de données"
dbConnectDb = "nom de la base de données"

TOKEN="clé de chiffrement aléatoire"

```


#### FRONTEND 
> Prérequis Vous aurez besoin d'avoir Node et npm installés localement sur votre machine.

```sh
cd frontend
npm i
```

> Un readme propre au frontend est disponible dans le dossier frontend.

### 3-Pour démarrer les serveurs
#### BACKEND
```sh
cd backend
nodemon server
```   
#### FRONTEND                   
```sh
cd frontend
npm start or yarn start
```  

> ***Veillez a bien démarrer le BACKEND avant le FRONTEND et veillez a démarrer la BDD avant le BACKEND.***

***


### Utilisé dans ce projet

| Frontend                 | Backend            |
|:------------------------:|:------------------:|
| React                    | Node.js            |
| Axios                    | Formik             |
| React-bootstrap          | ...                |
| React-router             | ...                |

***

***







