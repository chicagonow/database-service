const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
const logger = require('./logging/Logger');

// Handlers
const UserHandler = require('./handlers/user/UserHandler');
const LocationHandler = require('./handlers/location/LocationHandler');
const RequestHandler = require('./handlers/request/RequestHandler');

/**
 * Function that returns the HTTP response
 * @param {object} err 
 * @param {object} res 
 * @param {function} callback 
 */
const done = (err, res, callback) => {
    callback(null, {
        statusCode: err ? 400 : 200,
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Needed for lambdas to talk to each other
            'Access-Control-Allow-Credentials': true // Needed for HTTPS cookie stuff
        }
    });
};

/**
 * Returns the proper body as an object
 * @param {object | string} event 
 */
const getBody = (event) => {
    return typeof event.body === "string" ? JSON.parse(event.body) : event.body;
};

module.exports = {

    /**
     * GET /users
     */
    getUsers: (event, context, callback) => {
        logger.info('Received event for getUsers: ' + JSON.stringify(event));
        UserHandler.getUsers((err, res) => done(err, res, callback));        
    },

    /**
     * POST /users
     */
    updateUser: (event, context, callback) => {
        logger.info('Received event for updateUser: ' + JSON.stringify(event));
        let body = getBody(event);
        UserHandler.updateUser(body.userID, (err, res) => done(err, res, callback));
    },

    /**
     * GET /locations
     */
    getLocations: (event, context, callback) => {
        logger.info('Received event for getLocations: ' + JSON.stringify(event));
        LocationHandler.getLocations((err, res) => done(err, res, callback));
    },

    /**
     * POST /locations
     */
    updateLocation: (event, context, callback) => {
        logger.info('Received event for updateLocation: ' + JSON.stringify(event));
        let body = getBody(event);
        LocationHandler.insertLocationEntry(body.locationEntry, (err, res) => done(err, res, callback));
    },

    /**
     * GET /requests
     */
    getRequests: (event, context, callback) => {
        logger.info('Received event for getRequests: ' + JSON.stringify(event));
        RequestHandler.getRequests((err, res) => done(err, res, callback));
    },

    /**
     * POST /requests
     */
    updateRequest: (event, context, callback) => {
        logger.info('Received event for updateRequests: ' + JSON.stringify(event));
        let body = getBody(event);
        RequestHandler.insertRequestEntry(body.requestEntry, (err, res) => done(err, res, callback));
    }
}