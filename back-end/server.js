const express = require("express");
require("dotenv").config();

// console.log(process.env)

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
    console.log("Connexion à la base de données avec succes. Sync done!")
  )
  .catch((error) => console.log("ERREUR - Échec connexion a la DB ", error));

// db.authenticate()
//   .then(() =>
//     console.log("Connection  to database has been established successfully.")
//   )
//   .catch((err) => console.error("Unable to connect to the database:", err));

// // Testing de l'API
// app.get("/", function (req, res) {
//   res.send("Hello Listing, send me your requests!");
// });

// - ROUTER

// Enregistrement des routes de l'API
app.use("/api/v1", require("./routes"));

// - PORT
const PORT = process.env.SERVER_PORT || 8080;

// - SERVER
app.listen(PORT, () =>
  console.log(`Serveur en execution sur le port ${process.env.SERVER_PORT}`)
);
