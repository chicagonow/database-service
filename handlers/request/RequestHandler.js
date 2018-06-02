const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

/**
 * Inserts a new request to the database
 * @param {object} requestEntry 
 * @param {function} onDatabaseActionDone 
 */
exports.insertRequestEntry = (requestEntry, onDatabaseActionDone) => {
    let parameters = {};
    parameters.TableName = "request";
    parameters.Key
    parameters.Item = {
        "id": requestEntry.requestId,
        "object": JSON.stringify(requestEntry)
    };    

    dynamo.putItem(parameters, onDatabaseActionDone);
};