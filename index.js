const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
const logger = require('./logging/Logger');

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

module.exports = {

    /**
     * Get all users
     */
    getUsers: (event, context, callback) => {
        logger.info('Received event for getUsers: ' + JSON.stringify(event));
        dynamo.scan({TableName: "User"}, (err, res) => done(err, res, callback));
    },

    /**
     * Add/Update user
     */
    updateUser: (event, context, callback) => {
        logger.info('Received event for updateUser: ');
        logger.info(event);
        let body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
        let params = {};
        params.TableName = "User";
        params.Key = {id: body.userID};        
        dynamo.updateItem(params, (err, res) => done(err, res, callback));
    }
}