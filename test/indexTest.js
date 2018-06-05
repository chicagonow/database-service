const expect = require('chai').expect;

const dbHandler = require('../index');
const logger = require('../logging/Logger');

describe('test harness to run index.js', () => {

    describe("handler(event, context, callback)", ()=> {

    it("IMPLEMENT TEST", () => {console.log("IMPLEMENT ME");});


    //     it('returns error when no event httpMethod', async function () {
    //
    //         let responseCode = 200;
    //         let event = {
    //             httpMethod: "NOTAREALMETHOD"
    //         };
    //
    //         let context = {};
    //         let callback = (dontKnowWhatThisIs, responseObject) => {
    //             logger.info(responseObject);
    //             responseCode = responseObject.statusCode;
    //         };
    //
    //         await dbHandler.handler(event, context, callback);
    //         expect(responseCode).to.not.equal(200);
    //     })
    //
    });

});