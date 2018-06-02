const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

/**
 * Adds or updates to the User table
 * @param {string} userID 
 * @param {function} onDatabaseActionDone 
 */
exports.addUser = (userID, onDatabaseActionDone) => {
    let params = {};
    params.TableName = "User";
    params.Key = {id: userID};
    dynamo.updateItem(params, onDatabaseActionDone)
};