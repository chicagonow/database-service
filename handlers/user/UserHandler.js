const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

/**
 * Returns all of the users
 * @param {function} onDatabaseActionDone 
 */
exports.getUsers = (onDatabaseActionDone) => {
    dynamo.scan({TableName: "User"}, onDatabaseActionDone);
};

/**
 * Adds or updates to the User table
 * @param {string} userID 
 * @param {function} onDatabaseActionDone 
 */
exports.updateUser = (userID, onDatabaseActionDone) => {
    let params = {};
    params.TableName = "User";
    params.Key = {id: userID};
    dynamo.updateItem(params, onDatabaseActionDone)
};