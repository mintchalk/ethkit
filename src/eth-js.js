/*
      	"params": {
"sec": "", 
"xEndowment": "", 
"bCode": "", 
"xGas": "", 
"xGasPrice": "" 
}
*/


eth_js = require('./routes/eth-js.js');

exports.createContractSchema = {
  'spec': {
    description : "Create Contract",
    path : "/eth/create",
    notes : "Pass in bytecode or serpent code to create a contract. You must have the eth client running on the same server!",
    summary : "Compile Create Contract Summary",
    supportedContentTypes: ["application/json"],
    method: "POST",
    type : "Ethereum",
    parameters: [{
      "name": "body",
      "description": "create contract",
      "required": true,
      "allowMultiple": false,
      "dataType": "Create Contract",
      "paramType": "body",
      "defaultValue": '{ "code":"contract.storage[1] = 2", "sec": 123, "endowment": 10, "gas": 10000, "gasPrice": 10 }',
      "consumes": [
              "application/json",
              "application/xml"
          ]
    }],

    responseMessages: [
            {
              "code": 400,
              "message": "Invalid input",
              "responseModel": "Transaction"
            }
          ],
          nickname : "CreateContract"
    },
    action: eth_js.createContract
};