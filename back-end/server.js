const express = require("express");
require("dotenv").config();

// console.log(process.env)

const app = express();

const logger = require("morgan"); // Import de morgan pour ajouter logs serveur
const cors = require("cors"); // Import du cors config

const db = require("./models/index");

// Configuration logs
app.use(logger("dev"));
// Configuration du CORS
app.use(cors());
// Configuration du parsin de la requete en json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * ETAPE 2 - Etablissement de la connexion a la DB
db.sequelize
  .sync() //Synchronise tous les models automatiquement
  .then(() => console.log("Connexion à la base de données avec succes"))
  .catch((error) => console.log("ERREUR - Échec connexion a la DB ", error));

// db.authenticate()
//   .then(() =>
//     console.log("Connection  to database has been established successfully.")
//   )
//   .catch((err) => console.error("Unable to connect to the database:", err));

// console.log(process.env);

app.get("/", function (req, res) {
  res.send("Hello Listing haha");
});

// app.listen(3000);

// Enregistrement des routes de l'API
app.use("/api/v1", require("./routes"));

// Demarrage sur le port
app.listen(process.env.SERVER_PORT, () =>
  console.log(`Serveur en execution sur le port ${process.env.SERVER_PORT}`)
);
