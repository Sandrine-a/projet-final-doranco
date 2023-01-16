/**
 * FIchier qui permet de configurer l'acces a la BD et d'enregistrer les differents models
 */
const dbConfig = require("../config/db.config"); // Import de les config d'acces a la BDD
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  port: dbConfig.PORT,
});

const db = {
  sequelize,
  DataTypes,
  Task: require("./task.model")(sequelize, DataTypes) // Ajouter le model employe pour la synchronisation
};

module.exports = db;
