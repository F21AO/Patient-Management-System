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

  //Pre-login Routes:
  app.get("/", apiController.index);
  app.post("/users/login", usersController.userlogin);

  //Authenticate users to access the below routes
  app.use(authenticateUser.isAuthorized);

  //Post-login Routes:
  app.post("/patients/register", patientsController.patientsignup);
  app.get("/patients/:recordnumber", patientsController.patientlookup);
  app.get("/patients", patientsController.allpatients);
  app.put("/patients/refer/:recordnumber", patientsController.patientreferals);
  app.post("/wards/admit", admissionsController.patientadmission);
  app.get("/wards/admissions/:recordnumber", admissionsController.admissionlookup);
  app.get("/wards/admissions", admissionsController.alladmissions);
  app.get("/wards", admissionsController.allwards);
  

  //EOF
  //FINAL FIXES
};
