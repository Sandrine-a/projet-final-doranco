const { User, Task } = require("../models/index");
//Import de bcrypt pour hash des mpd
const bcrypt = require("bcrypt");
//Importer jsonwebtoken pour générer des tokens d'authentification
const jwt = require("jsonwebtoken");
/**
 * Permet la creation d'un nouvel iser en DB, si success retourne l'objet persiste
 * @param {Req} req la requete provenant du client
 * @param {Res} res la reponse a construire et a envoyer au client
 */
exports.create_user = (req, res) => {
  //Validation de la requete
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  if (!email || !username || !password)
    return res.status(400).json({ message: "Data missing" });

  //Ajouter le findone pour voir si l'user exist
  //Ajouter le findone pour voir si l'user exist

  //Hash du mdp pour l'enregistrer en bdd
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      // Creer user a enregistrer
      console.log(hash);
      const user = {
        email: email,
        username: username,
        password: hash,
      };
      User.create(user)
        .then((user) =>
          res.status(201).json({ userId: user.id, email: user.email })
        )
        .catch((error) =>
          res.status(400).json({ message: `Erreur create in DB  ${error}` })
        );
    })
    .catch((error) =>
      res.status(500).json({ message: "Erreur create in DB ", error })
    );
};

/**
 * Permet de trouver un user
 * @param {Req} req la requete provenant du client
 * @param {Res} res la reponse a construire et a envoyer au clien
 */
exports.get_one_user = (req, res) => {
  //Recuperation du id du user dans parametre url
  const email = req.body.email;
  const password = req.body.password;

  // Valider la requete
  if (!email || !password)
    return res.status(400).json({ message: "Data missing!" });

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Bad credentials !" });
      } else {
        console.log("bcrypt go");
        bcrypt
          .compare(password, user.password)
          .then((valid) => {
            if (!valid) {
              console.log("not valide");
              return res.status(401).json({ error: "Bad credentials !" });
            } else {
              console.log("VALIDDD");
              res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                  { userId: user.id },
                  process.env.USER_SECRET_TOKEN,
                  { expiresIn: "24h" }
                ),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) =>
      res.status(500).json({ message: "Internal error", error })
    );
};

/**
 * Permet la MAJ d'un user en DB
 * @param {Req} req la requete provenant du client
 * @param {Res} res la reponse a construire et a envoyer au client
 */
exports.update_user = (req, res) => {
  //Recuperation du id du parametre url
  const id = Number(req.params.id);

  // Valider la requete
  if (!req.body.username || !req.body.password || !id)
    return res.status(400).json({ message: "Invalid, email, username or od" });

  User.update(req.body, { where: { id } })
    .then((number) => {
      if (number == 1) {
        res.json({ message: "Update successed !" });
      } else {
        res.json({
          message: `Failed to updated id = ${id}`,
        });
      }
    })
    .catch((error) =>
      res
        .status(500)
        .json({ message: `Error in updated user where id = ${id}`, error })
    );
};

/**
 * Permet la suppression d'un user en DB
 * @param {Req} req la requete provenant du client
 * @param {Res} res la reponse a construire et a envoyer au clien
 */
exports.delete_user = (req, res) => {
  const id = Number(req.params.id); //Recuperation du id du parametre url

  if (!id) {
    return res.status(400).json({ message: "Invalid user" });
  }

  User.destroy({ where: { id } })
    .then((number) => {
      if (number == 1) {
        res.json({ message: "User is deleted !" });
      } else {
        console.log(number);
        res.json({ message: `User id = ${id} not found !` });
      }
    })
    .catch((error) =>
      res.status(500).json({ message: `Failed to delete = ${id}`, error })
    );
};

/**
 * Recupere la liste de tous les users en DB et la retourne au client
 * @param {Req} req la requete provenant du client
 * @param {Res} res la reponse a construire et a envoyer au client
 */
exports.get_users = (req, res) => {
  User.findAll({})
    .then((data) => res.json({ data }))
    .catch((error) =>
      res.status(500).json({ message: "Internal error, error" })
    );
};

/**
 * Permet les tasks du User
 * -Connexion de la relation User et Tasks
 * @param {Req} req la requete provenant du client
 * @param {Res} res la reponse a construire et a envoyer au clien
 */
exports.get_user_tasks = (red, res) => {
  //Recuperation de l'id  de l'user a partir de la requete
  const id = Number(req.params.id);

  //Vérification des inputs obligatoires
  if (!id) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  //Nous recherchons les tasks du users
  User.findAll({
    include: [
      {
        model: Task,
        as: "task",
      },
    ],
    where: { id: 1 },
  })
    .then((data) => res.json({ data }))
    .catch((error) =>
      res.status(500).json({ message: "Internal error, error" })
    );
};
