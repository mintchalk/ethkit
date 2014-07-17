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

    exec('serpent compile ' + '"' + code + '"', 
    function(e,o,err){

		if (err){
   	 	    res.write(JSON.stringify({'errors': {'serpent': err.trim()} }));
		    res.end();
            return;
        }

    	createEthContract(o, req, res);
	});
}

createEthContract = function(o, req, res){
	var eth_results = {}
	var compiled_code = o;
	var contract_params = {
            method: "create",
            params: {
			  'xEndowment': parseInt(req.body.endowment) ||  0,
			  'bCode': compiled_code,
			  'sec': req.body.sec,
			  'xGas': parseInt(req.body.gas) || 0,
			  'xGasPrice': parseInt(req.body.gasPrice) || 0
			},
            jsonrpc: "2.0",
            id: "1"
     }
    console.log('creating contract')
    console.log(contract_params)
	unirest.post(ethKitClient(req))
	.type('json')
	.send(JSON.stringify(contract_params))
	.end(function (response) {

	  eth_results['response'] = response.body;
	  res.write(JSON.stringify(eth_results));
	  res.end();
	})
}

ethKitClient = function(req){
	var ethkit_client = req.protocol + '://' + req.get('host').split(':')[0] + ':' + ETH_PORT;
	return ethkit_client;
}


exports.sendTransaction = function (req, res) {

    winston.log('POST: ' + req.body);
    winston.log(req.body);

    req_args = ['data','sec','destination', 'value'];
    for (i=0; i<req_args.length; i++){
    	if (req.body[req_args[i]] === undefined){
        res.writeHead(400, headers);
        res.end(JSON.stringify({'error': req_args[i] + ' value is missing'}))
    	}
    }

    res.writeHead(200, headers);
    
    sendEthTransaction(req, res);

}

sendEthTransaction = function(req, res){
	// TODO: compile message data
	var msg_data = req.body.data;

	var eth_results = {}

	var tranx_params = {
            method: "transact",
            params: {
                "aDest": req.body.destination,
                "bData": msg_data,
                "sec": req.body.sec,
                "xGas": req.body.gas || 0,
                "xGasPrice": req.body.gasPrice || 0,
                "xValue": req.body.value || 0
			},
            jsonrpc: "2.0",
            id: "1"
     }
    console.log('sending transaction')
    console.log(tranx_params)
	unirest.post(ethKitClient(req))
	.type('json')
	.send(JSON.stringify(tranx_params))
	.end(function (response) {

	  eth_results['response'] = response.body;
	  res.write(JSON.stringify(eth_results));
	  res.end();
	})
}
