// Import required frameworks
const {MongoClient}  = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

// MongoDB constants
const DB_URL = "mongodb+srv://Priyanka:PriyankaF21AO@clusterf21ao.0n6hd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(DB_URL, {useUnifiedTopology: true});
const DB_NAME = "patients";


class authenticationController {

  static async lookUpSession(req, res) {
    var userid = req.body.userid; 
    var sessiontoken = req.body.sessiontoken;

    async function run() {
        const sessionDocument = {};
	    try {
            
            await client.connect();
            console.log("Connected correctly to server");
            const db = client.db(DB_NAME);

            const colSessions = db.collection("sessions");

            // Find one document by userid and sessiontoken
            const sessionDocument = await colSessions.findOne({ $and: [{userid:{ $eq: new ObjectID(userid) }}, {sessiontoken:{$eq: sessiontoken}}] });
	    }
        catch (err) {
	        console.log(err.stack);
	    }
	    finally {
	        //await client.close();
	    }
        return sessionDocument;
	}
	
	run().catch(console.dir);
  }

  
}

module.exports = authenticationController;
