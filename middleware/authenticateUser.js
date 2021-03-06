const authenticationController = require("./../controllers/authenticationController");

module.exports.isAuthorized = async (req, res, next) => {
    responseObject = {};
    
    //fetch header parameters
    userid = req.headers.userid;
    sessiontoken = req.headers.sessiontoken;

    try {
        var sessionDocument = await authenticationController.lookUpSession(userid, sessiontoken);
        console.log(sessionDocument);
        if(!sessionDocument)
        {
            // wrong session details
            responseObject['message'] = "Request denied. See error for details.";
            responseObject['error'] = "Invalid session.";
            res.status(403);
            res.send(responseObject);
        }
        else if(new Date(Date.now()) > sessionDocument.expiry)
        {
            // session timed out
            responseObject['message'] = "Request denied. See error for details.";
            responseObject['error'] = "Session expired. Please log in again.";
            res.status(403);
            res.send(responseObject);
        }
        else
        {
            // session found
            next();
        }
    } catch {
        console.log(err.stack);
        responseObject['message'] = "Request denied. See error for details.";
        responseObject['error'] = "Error occured. Please log in again.";
        res.status(403);
        res.send(responseObject);
    }
}