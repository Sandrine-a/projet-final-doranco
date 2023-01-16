const { Task } = require("../models/index");
// const Employe = require("../models/index").Task;

/**
 * Recupere la liste des employes en DB et ma retourne au client
 * @param {Req} req la requete provenant du client
 * @param {Res} res la reponse a construire et a envoyer au client
 */
exports.get_tasks = (req, res) => {
  Task.findAll()
    .then((data) => res.json({ data }))
    .catch((error) =>
      res.status(500).json({ message: "Erreur lister", error })
    );
};


/**
 * Permet la creation d'un nouvel employe en DB, si success retourne l'objet persiste
 * @param {Req} req la requete provenant du client
 * @param {Res} res la reponse a construire et a envoyer au client
 */
exports.create_task = (req, res) => {
  //Validation de la requete
  const title = req.body.title;
  const content = req.body.content;
  const day = req.body.day;
  const time = req.body.time;
  const taskColor = req.body.taskColor;

  if (!title || !day)
    return res.status(400).json({ message: "title or day missing" });

  // Creer employe a enregistrer
  const task = {
    title,
    content,
    day,
    time,
    taskColor,
  };
  Task.create(task)
    .then((data) => res.status(200).json({ data }))
    .catch((error) =>
      res.status(500).json({ message: "Erreur create in DB ", error })
    );
};

/**
 * Permet la creation d'un nouvel employe en DB, si success retourne l'objet persiste
 * @param {Req} req la requete provenant du client
 * @param {Res} res la reponse a construire et a envoyer au client
 */
exports.update_task = (req, res) => {
  const id = Number(req.params.id); //Recuperation du id du parametre url

  // Valider la requete
  if (!req.body.title || !req.body.day || !id)
    return res.status(400).json({ message: "Title, day or id invalid" });

  Task.update(req.body, { where: { id } })
    .then((number) => {
      if (number == 1) {
        res.json({ message: "Update success" });
      } else {
        res.json({
          message: `Failed to update taks with id = ${id}`,
        });
      }
    })
    .catch((error) =>
      res
        .status(500)
        .json({ message: `Erreur update employe avec id = ${id}`, error })
    );
}

/**
 * Permet la suppression d'un employe en DB
 * @param {Req} req la requete provenant du client
 * @param {Res} res la reponse a construire et a envoyer au clien
 */
exports.delete_task = (req, res) => {
  const id = Number(req.params.id); //Recuperation du id du parametre url

  if (!id) { 
    return res.status(400).json({ message: "Invalid id" });
  }

  Task.destroy({ where: { id } })
    .then((number) => {
      if (number == 1) {
        res.json({ message: "Delete success" });
      } else {
        console.log(number);
        res.json({ message: `Failed to find id = ${id} introuvable` });
      }
    })
    .catch((error) =>
      res
        .status(500)
        .json({ message: `Failed with task id = ${id}`, error })
    );
};
