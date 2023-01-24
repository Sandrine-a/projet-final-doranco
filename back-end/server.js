const express = require("express");
require("dotenv").config();

const app = express();
const logger = require("morgan"); // Import de morgan pour ajouter logs serveur
const cors = require("cors"); // Import du cors config

const db = require("./models/index");

// - MIDDLEWARE

// Configuration logs
app.use(logger("dev"));
// Configuration du CORS
app.use(cors());
// Configuration du parsin de la requete en json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * ETAPE 2 - Etablissement de la connexion a la DB
db.sequelize
  .sync() //Synchronise tous les models automatiquement
  .then(() =>
    console.log("Connected with database ok. Sync done!")
  )
  .catch((error) => console.log("ERROR - Cannot connect with Database ", error));

// - ROUTER

// Enregistrement des routes de l'API
app.use("/api/v1", require("./routes"));

// - PORT
const PORT = process.env.SERVER_PORT || 8080;

// - SERVER
app.listen(PORT, () =>
  console.log(`Serveur en execution sur le port ${process.env.SERVER_PORT}`)
);
