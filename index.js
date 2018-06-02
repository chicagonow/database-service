'use strict';
const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

const UserHandler = require('./handlers/Users/UserHandler');
const LocationHandler = require('./handlers/location/LocationHandler');
const RequestHandler = require('./handlers/request/RequestHandler');
const logger = require('./logging/Logger');

/**
 * Returns an HTTP 400 response with the error message
 * @param {*} errorMessage 
 * @param {*} httpCallback 
 */
let returnErrorResponse = (errorMessage, httpCallback) => {
    let httpResponse = {
        statusCode: 400,
        body: errorMessage,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    httpCallback(null, httpResponse);
};

module.exports = {

    /**
     * /users
     */
    getUsers: (event, context, callback) => {
        // TODO: Extract out for the future RESTful methods
        const done = (err, res) => callback(null, {
            statusCode: err ? 400 : 200,
            body: err ? err.message : JSON.stringify(res),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        dynamo.scan({TableName: "User"}, done);
    }    
}