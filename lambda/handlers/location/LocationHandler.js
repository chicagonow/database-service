const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

/**
 * Adds or updates to the User table
 * @param {object} locationEntry
 * @param {function} onDatabaseActionDone 
 */
exports.insertLocationEntry = (locationEntry, onDatabaseActionDone) => {
    let putParameters = {};
    putParameters.TableName = "location";
    putParameters.Item = locationEntry;

    dynamo.putItem(putParameters, onDatabaseActionDone)
};