var mongoose = require('mongoose'),
    winston = require('winston'),
    unirest = require('unirest');
var exec = require('child_process').exec;

var headers = {
    "Content-Type": "application/json", 
    "Access-Control-Allow-Origin": "*"
}

var ETH_PORT = 8080;

exports.createContract = function (req, res) {

    winston.log('POST: ' + req.body);
    winston.log(req.body);

    req_args = ['code','sec','gas'];
    for (i=0; i<req_args.length; i++){
    	if (req.body[req_args[i]] === undefined){
        res.writeHead(400, headers);
        res.end(JSON.stringify({'error': req_args[i] + ' value is missing'}))
    	}
    }

    res.writeHead(200, headers);
    
    getCompiledCode(req.body.code, req, res);


}

getCompiledCode = function(code, req, res){

    exec('serpent compile' + '"' + code + '"', 
    function(e,o,err){
    	// TODO: check for errors
    	createEthContract(o, req, res);
	});
}

createEthContract = function(o, req, res){
	var eth_results = {}
	var compiled_code = o;

	unirest.post(ethKitClient(req))
	.type('json')
	.send({
            method: "create",
            params: {
			  'xEndowment': req.body.endowment ||  0,
			  'bCode': compiled_code,
			  'sec': req.body.sec,
			  'xGas': req.body.gas,
			  'xGasPrice': req.body.gasPrice
			},
            jsonrpc: "2.0",
            id: "1"
     })
	.end(function (response) {

	  eth_results['response'] = response.body.toString();
	  res.write(JSON.stringify(eth_results));
	  res.end();
	})
}

ethKitClient = function(req){
	var ethkit_client = req.protocol + '://' + req.get('host').split(':')[0] + ':' + ETH_PORT;
	return ethkit_client;
}