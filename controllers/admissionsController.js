// Import required frameworks
const {MongoClient}  = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

// MongoDB constants
const DB_URL = "mongodb+srv://Priyanka:PriyankaF21AO@clusterf21ao.0n6hd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(DB_URL, {useUnifiedTopology: true});
const DB_NAME = "patients";


class admissionsController {

  static async patientadmission(req, res) 
  {
    
    console.log("Post made - ADMIT");
    // Fetch query parameter
    var registeredby = req.body.registeredby; 
    var sessiontoken = req.body.sessiontoken;
    var patientid = req.body.patientid;
    var doctorid = req.body.doctorid;
    var wardid = req.body.wardid;
    var admittedon = req.body.admittedon;
    var discharged = req.body.discharged;
    var reason = req.body.reason;
    var deptid = req.body.deptid;

    console.log(req.body);

    // create response object with initial values
    var responseObject = {};
    responseObject['message'] = "None";
    responseObject['error'] = "None";

    async function run() {
	    try {
	        
            await client.connect();
	         console.log("Connected correctly to server");
	         const db = client.db(DB_NAME);
	
	         // Use the collection "patients", "users", "sessions", "admissions"
	         const colPatients = db.collection("patients");
             const colUsers = db.collection("users");
             const colSessions = db.collection("sessions");
             const colAdmissions = db.collection("admissions");

            // Find one document by userid and sessiontoken
            const sessionDocument = await colSessions.findOne({sessiontoken:{$eq: req.body.sessiontoken} });
            if(!sessionDocument)
            {
                // wrong session details
                responseObject['message'] = "Request denied. See error for details.";
                responseObject['error'] = "Invalid session.";
            }
            else if(new Date(Date.now()) > sessionDocument.expiry)
            {
                // session timed out
                responseObject['message'] = "Request denied. See error for details.";
                responseObject['error'] = "Session expired. Please log in again.";
            }
            else
            {
                // // session found 
                // // Check access level by userid
                // const accessDocument = await colUsers.findOne({_id:{ $eq: new ObjectID(req.body.userid) }});
                // if(!accessDocument)
                // {
                //     // wrong user details
                //     responseObject['message'] = "Request denied. See error for details.";
                //     responseObject['error'] = "Cannot find user.";
                // }
                // else
                // {
                    
                    // access allowed 
                    // Check for duplicate record
                    const existingDocument = await colAdmissions.findOne({patientid:{ $eq: req.body.patientid }});
                    if(existingDocument)
                    {
                        // email already in system
                        responseObject['message'] = "Request denied. See error for details.";
                        responseObject['error'] = "A record with this patientid already exists.";

                        // create patient object and push to response object

                        var aObject = {};
                        aObject['id'] = findAdmissionDetails._id;
                        aObject['registeredby'] = findAdmissionDetails.registeredby;
                        aObject['patientid'] = findAdmissionDetails.patientid;
                        aObject['doctorid'] = findAdmissionDetails.doctorid;
                        aObject['wardid'] = findAdmissionDetails.wardid;
                        aObject['admittedon'] = findAdmissionDetails.admittedon;
                        aObject['discharged'] = findAdmissionDetails.discharged;
                        aObject['reason'] = findAdmissionDetails.reason;
                        aObject['deptid'] = findAdmissionDetails.deptid;
                        responseObject['admission'] = aObject;
                    }
                    else
                    {
                        // create patient document
                        let admissionDocument = 
                        {
                            "registeredby":req.body.registeredby,
                            "patientid": req.body.patientid,
                            "doctorid": req.body.doctorid, 
                            "wardid": req.body.wardid,     
                            "admittedon": new Date(req.body.admittedon),
                            "discharged": req.body.discharged,
                            "reason": req.body.reason,
                            "deptid": req.body.deptid
                            // "registeredon": new Date(Date.now())                                                                                                                            
                        };

                        // Insert a single document, wait for promise so we can read it back
                        const insertAdmissionDetails = await colAdmissions.insertOne(admissionDocument);
                        // Find inserted document
                        const findAdmissionDetails = await colAdmissions.findOne({ patientid: { $eq: admissionDocument.patientid } });
                        // Print to the console
                        console.log(findAdmissionDetails);

                        if(!findAdmissionDetails)
                        {
                            // Admission could not be created 
                            responseObject['message'] = "Admission failed. See error for details.";
                            responseObject['error'] = "Unable to create admission record.";
                        }
                        else
                        {
                           // All good, admission record ready
                           responseObject['message'] = "Admiited to the ward succesfully";
                           responseObject['error'] = "None.";
                    
                           // create admission object and push to response object
                            var aObject = {};
                            aObject['id'] = findAdmissionDetails._id;
                            aObject['registeredby'] = findAdmissionDetails.registeredby;
                            aObject['patientid'] = findAdmissionDetails.patientid;
                            aObject['doctorid'] = findAdmissionDetails.doctorid;
                            aObject['wardid'] = findAdmissionDetails.wardid;
                            aObject['admittedon'] = findAdmissionDetails.admittedon;
                            aObject['discharged'] = findAdmissionDetails.discharged;
                            aObject['reason'] = findAdmissionDetails.reason;
                            aObject['deptid'] = findAdmissionDetails.deptid;
                            responseObject['admission'] = aObject;
                        
                        } 

                    }
                  
                }
            }

	 //   }
        catch (err) {
	         console.log(err.stack);
	    }
	    finally {
	        //await client.close();
            
	    }

        // send response object
        res.send(responseObject);
	}
	
	run().catch(console.dir);
  }

  static async admissionlookup(req, res) 
  {
    
    console.log("Get made - ADMISSION");
    // Fetch query parameter
    var userid = req.query.userid; 
    var sessiontoken = req.query.sessiontoken;
    var recordnumber = req.params.recordnumber; 
    console.log(req.query);

    // create response object with initial values
    var responseObject = {};
    responseObject['message'] = "None";
    responseObject['error'] = "None";


    async function run() {
	    try {
	        
            await client.connect();
	         console.log("Connected correctly to server");
	         const db = client.db(DB_NAME);
	
	         // Use the collection "patients", "sessions"
	         const colPatients = db.collection("patients");
             const colSessions = db.collection("sessions");
             const colAdmissions = db.collection("admissions");
             const colDepartment = db.collection("departments");
             const colWard = db.collection("wards");

            // Find one document by userid and sessiontoken
            const sessionDocument = await colSessions.findOne({ $and: [{userid:{ $eq: new ObjectID(req.query.userid) }}, {sessiontoken:{$eq: req.query.sessiontoken}}] });
            console.log(sessionDocument);
            if(!sessionDocument)
            {
                // wrong session details
                responseObject['message'] = "Request denied. See error for details.";
                responseObject['error'] = "Invalid session.";
            }
            else if(new Date(Date.now()) > sessionDocument.expiry)
            {
                // session timed out
                responseObject['message'] = "Request denied. See error for details.";
                responseObject['error'] = "Session expired. Please log in again.";
            }
            else
            {
                // session found 
                // Find document by recordnumber
                const patientDocument = await colPatients.findOne({_id:{ $eq: new ObjectID(req.params.recordnumber) }});
                if(!patientDocument)
                {
                    // record not found
                    responseObject['message'] = "Request failed. See error for details.";
                    responseObject['error'] = "A record with this number does not exist in the system.";
                }
                else
                {
                    // record found
                    responseObject['message'] = "Request successful.";
                    responseObject['error'] = "None.";

                    // create patient object and push to response object
                    var patientObject = {};
                    patientObject['recordnumber'] = patientDocument._id;
                    patientObject['email'] = patientDocument.email;
                    patientObject['name'] = patientDocument.name;
                    patientObject['gender'] = patientDocument.gender;
                    patientObject['birthdate'] = patientDocument.birthdate;
                    patientObject['diseases'] = patientDocument.diseases;
                    patientObject['allergies'] = patientDocument.allergies;
                    patientObject['deptid'] = colDepartment._id;
                    patientObject['deptname'] = colDepartment.deptname;
                    patientObject['wardid'] = colWard._id;
                    patientObject['wardname'] = colWard.name;
                    responseObject['patient'] = patientDocument;

                }    
                         
            }

	    }
        catch (err) {
	         console.log(err.stack);
	    }
	    finally {
	        //await client.close();
            
	    }
        // send response object
        res.send(responseObject);
	}
	
	run().catch(console.dir);
    
  }
}

module.exports = admissionsController;
