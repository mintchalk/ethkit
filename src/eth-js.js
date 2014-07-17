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


exports.sendTransactionSchema = {
  'spec': {
    description : "Send Transaction",
    path : "/eth/transact",
    notes : "Send messsage to contract. You must have the eth client running on the same server!",
    summary : "Send Transaction Summary",
    supportedContentTypes: ["application/json"],
    method: "POST",
    type : "Ethereum",
    parameters: [{
      "name": "body",
      "description": "send transaction",
      "required": true,
      "allowMultiple": false,
      "dataType": "Send Transaction",
      "paramType": "body",
      "defaultValue": '{ "data": 0x00, "sec": 123,"destination": 0x01,"value": 10000000,"gas": 10000, "gasPrice": 10000000000000 }',
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
          nickname : "SendTransaction"
    },
    action: eth_js.sendTransaction
};