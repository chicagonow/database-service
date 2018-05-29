const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
const uuid = require('uuid/v1');


/**
 * Adds or updates to the User table
 * @param {object} locationEntry
 * @param {function} onDatabaseActionDone 
 */
exports.insertLocationEntry = (locationEntry, onDatabaseActionDone) => {
    let locationEntryParameters = {};
    locationEntryParameters.TableName = "location";
    locationEntryParameters.Item = {
        "id": uuid(),
        "requestId": locationEntry.requestId,
        "deviceId": locationEntry.deviceId,
        "latitude": locationEntry.latitude,
        "longitude": locationEntry.longitude
    };

    dynamo.putItem(locationEntryParameters, onDatabaseActionDone)
};