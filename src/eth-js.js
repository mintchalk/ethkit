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
    notes : "Pass in bytecode or serpent code to create a contract",
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
      "defaultValue": '{"sec": "", "xEndowment": "", "bCode": "", "xGas": "", "xGasPrice": "" }',
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