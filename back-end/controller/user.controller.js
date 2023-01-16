const { User } = require("../models/index");

/**
 * Permet la creation d'un nouvel iser en DB, si success retourne l'objet persiste
 * @param {Req} req la requete provenant du client
 * @param {Res} res la reponse a construire et a envoyer au client
 */
exports.create_user = (req, res) => {
  //Validation de la requete
  const email = req.body.email;
  const username  = req.body.username ;
  const password = req.body.password;

  if (!email || !username || !password )
    return res.status(400).json({ message: "data missing" });

  // Creer user a enregistrer
  const user = {
    email,
    username,
    password,
  };
  User.create(user)
    .then((data) => res.status(200).json({ data }))
    .catch((error) =>
      res.status(500).json({ message: "Erreur create in DB ", error })
    );
};

/**
 * Permet la MAJ d'un user en DB
 * @param {Req} req la requete provenant du client
 * @param {Res} res la reponse a construire et a envoyer au client
 */
exports.update_user = (req, res) => {
  const id = Number(req.params.id); //Recuperation du id du parametre url

  // Valider la requete
  if (!req.body.username || !req.body.password || !id)
    return res.status(400).json({ message: "Invalid, email, username or od" });

  User.update(req.body, { where: { id } })
    .then((number) => {
      if (number == 1) {
        res.json({ message: "Update avec succes" });
      } else {
        res.json({
          message: `Echec mise a jour cote BD user avec id = ${id}`,
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
        res.json({ message: "Delete success" });
      } else {
        console.log(number);
        res.json({ message: `Erreur delete bd user id = ${id} introuvable` });
      }
    })
    .catch((error) =>
      res
        .status(500)
        .json({ message: `Erreur delete user avec id = ${id}`, error })
    );
};
