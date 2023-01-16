const { Task } = require("../models/index");
// const Employe = require("../models/index").Task;
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