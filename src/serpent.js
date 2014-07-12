compile = require('./routes/compile.js');

exports.compileSerpentSchema = {
  'spec': {
    description : "Compile Serpent Code",
    path : "/serpent/compile",
    notes : "Send security code and serpent CLI will be used to get bytecode, LLL and assembly values ",
    summary : "Compile Serpent Code Summary",
    supportedContentTypes: ["application/json"],
    method: "POST",
    type : "Serpent",
    parameters: [
      {
      "name": "body",
      "description": "code",
      "required": true,
      "allowMultiple": false,
      "dataType": "Serpent Code",
      "paramType": "body",
      "defaultValue": '{"code": "contract.storage[1] = msg.data[10000]"}',
      "consumes": [
              "application/json",
              "application/xml"
          ]
    }],

    responseMessages: [
            {
              "code": 400,
              "message": "Invalid input",
              "responseModel": "SerpentCode"
            }
          ],
          nickname : "compileSerpent"
    },
   action: compile.compileSerpent
};