/**
 * Model sequelize pour la persistance de donnes
 * Permet de creer me model Employe utilise par sequelize pour generer la table et persister les donnees
 * @param {Sequilize} sequelize Instance de la DB
 * @param {DataTypes} datatypes Permet de specifier le type des attributs du model
 */
module.exports = (sequelize, datatypes) => {
  const Task = sequelize.define("Task", {
    //Attributs de la table "Task"
    title: {
      type: datatypes.STRING,
      allowNull: false,
    },
    content: {
      type: datatypes.STRING,
    },
    day: {
      type: datatypes.DATE,
      allowNull: false,
    },
    time: {
      type: datatypes.TIME,
    },
    taskColor: {
      type: datatypes.STRING,
    },
  });

  return Task;
};
