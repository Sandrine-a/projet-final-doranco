/**
 * Model sequelize pour la persistance de donnes
 * Permet de creer me model User utilise par sequelize pour generer la table et persister les donnees
 * @param {Sequilize} sequelize Instance de la DB
 * @param {DataTypes} datatypes Permet de specifier le type des attributs du model
 */
module.exports = (sequelize, datatypes) => {
  const User = sequelize.define("User", {
    //Attributs de la table "Task"
    email: {
      type: datatypes.STRING,
      allowNull: false,
    },
    username: {
      type: datatypes.STRING,
      allowNull: false,
    },
    password: {
      type: datatypes.STRING,
      allowNull: false,
    },
  });

  return User;
};
