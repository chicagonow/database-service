const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
const uuid = require('uuid/v1');
const logger = require('../../logging/Logger');


/**
 * Adds or updates to the User table
 * @param {object} locationEntry
 * @param {function} onDatabaseActionDone 
 */
exports.insertLocationEntry = (locationEntry, onDatabaseActionDone) => {
    logger.info("start location creations");

    let locationEntryParameters = {};
    locationEntryParameters.TableName = "location";
    locationEntryParameters.Item = {
        "id": uuid(),
        "requestId": locationEntry.requestId,
        "deviceId": locationEntry.deviceId,
        "latitude": locationEntry.latitude,
        "longitude": locationEntry.longitude
    };

    logger.info("attempting to put location obj: " + JSON.stringify(locationEntryParameters));
    dynamo.putItem(locationEntryParameters, onDatabaseActionDone)
};