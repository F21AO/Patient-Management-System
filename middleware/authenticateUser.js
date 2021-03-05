const authenticationController = require("./../controllers/authenticationController");

module.exports.isAuthorized = (req, res, next) => {
    try {
        const authResponse = authenticationController.lookUpSession(req).then(authResponse => {
            next();
            // if(!sessionDocument)
            // {
            //     // wrong session details
            //     responseObject['message'] = "Request denied. See error for details.";
            //     responseObject['error'] = "Invalid session.";
            //     res.status(403);
            //     res.send(responseObject);
            // }
            // else if(new Date(Date.now()) > sessionDocument.expiry)
            // {
            //     // session timed out
            //     responseObject['message'] = "Request denied. See error for details.";
            //     responseObject['error'] = "Session expired. Please log in again.";
            //     res.status(403);
            //     res.send(responseObject);
            // }
            // else
            // {
            //     // session found
            //     next();
            // }
        });
    } catch {
        //return 401 unauthorized user error
        res.status(401).json({
            error: new Error('Unauthorized!')
        });
    }
}