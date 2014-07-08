require('./src/db');

var express = require('express'),
    bodyParser = require('body-parser'),
    url = require('url'),
    swagger = require('swagger-node-express'),
    param = require("./node_modules/swagger-node-express/lib/paramTypes.js"),
    winston = require("winston"),
    modelspec = require('./src/api/model-spec.js');
    compile = require('./src/routes/compile'),
    app = express();

winston.handleExceptions(new winston.transports.Console);

// parse application/json
app.use(bodyParser.json());
//Couple the application to the Swagger module.
swagger.setAppHandler(app);
swagger.addModels(modelspec);
//set api info
swagger.setApiInfo({
  swaggerVersion: "2.1",
  title : "'feature no' >No API Documentation"
});
swagger.configureDeclaration("Serpent", {
  description : "Serpent Operations",
  authorizations : [],// "oauth2" ],
  produces : [ "application/json" ]
});
app.get("/", function (req, res) {
    //res.writeHead(200, {"Content-Type": "text/plain"});
    //res.end("ethkit");
  res.statusCode = 302; 
    res.setHeader("Location", "/docs");
    res.end();
});


app.post('/serpent/compile', compile.compileSerpent);
var compileSerpent = {
  'spec': {
    description : "Compile Serpent Code",
    path : "/serpent/compile",
    notes : "ethkit offers a simple HTTP API for compiling Ethereum contract code. ",
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
              "code": 405,
              "message": "Invalid input",
              "responseModel": "SerpentCode"
            }
          ],
          nickname : "compileSerpent"
    },
   'action': compile.compileSerpent
};
swagger.addPost(compileSerpent);

//Configures the app's base path and api version.
swagger.configureSwaggerPaths("", "api-docs", "");
swagger.configure("/", "1.0.0");
swagger.configureDeclaration('compile', {
  description: 'Compile Serpent'
});
// Serve up swagger ui at /docs via static route
var docs_handler = express.static('./swagger-ui/');
app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
  if (req.url === '/docs') { // express static bars on root url w/o trailing
    // slash
    res.writeHead(302, {
      'Location' : req.url + '/'
    });
    res.end();
    return;
  }
  // take off leading /docs so that connect locates file correctly
  req.url = req.url.substr('/docs'.length);
  return docs_handler(req, res, next);
});

var port = Number(process.env.PORT || 3000);

app.listen(port);
winston.log('info', 'Listening on port ' + port + '...');
