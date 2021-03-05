module.exports = function (app) {

  // Import required frameworks and files
  const bodyParser = require('body-parser');
  const apiController = require("./../controllers/apiController");
  const usersController = require("./../controllers/usersController");
  const patientsController = require("./../controllers/patientsController");
  const admissionsController = require("./../controllers/admissionsController");
  const authenticateUser = require("./../middleware/authenticateUser");

  // Setup parser for POST requests
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get("/", apiController.index);
  app.post("/users/login", usersController.userlogin);

  //Authenticate users to access the below routes
  app.use(authenticateUser.isAuthorized);
  app.get("/patients/register", patientsController.patientsignup);
  app.get("/patients/:recordnumber", patientsController.patientlookup);
  app.get("/wards/admit", admissionsController.patientadmission);
  app.put("/patients/refer/:recordnumber", patientsController.patientreferals);

};
