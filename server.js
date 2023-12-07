const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb+srv://admin1:admin1@cluster0.uxxc0vl.mongodb.net/bd`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Aplicación de LIBRETA INTENGRAL DE SALUD" });
});

// routes
require("./app/routes/registro.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/rol.routes")(app);
require("./app/routes/mujer.routes")(app);
require("./app/routes/etmi.routes")(app);
require("./app/routes/etmi.routes")(app);
require("./app/routes/controlmujer.routes")(app);
require("./app/routes/vacunamujer.routes")(app);

require("./app/routes/niño.routes")(app);
require("./app/routes/rn.routes")(app);
require("./app/routes/control.routes")(app);
require("./app/routes/vacuna.routes")(app);
require("./app/routes/tamizaje.routes")(app);
require("./app/routes/anemia.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "usuario"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log(" Rol 'usuario' Se agrego a la colección rol");
      });

      new Role({
        name: "supervisor"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Rol 'supervisor' Se agrego a la colección rol");
      });


      new Role({
        name: "brigada"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Rol 'brigada' Se agrego a la colección rol");
      });





      new Role({
        name: "administrador"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Rol 'administrador' Se agrego a la colección rol");
      });
    }
  });
}
