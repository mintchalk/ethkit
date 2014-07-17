var mongoose = require('mongoose'),
    winston = require('winston'),
    unirest = require('unirest'),
    RLP = require('rlp'); 
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
	var compiled_code = o.trim();
	var contract_params = {
            method: "create",
            params: {
			  'xEndowment': (req.body.endowment ||  0).toString(),
			  'bCode': compiled_code,
			  'sec': req.body.sec,
			  'xGas': (req.body.gas || 0).toString(),
			  'xGasPrice': (req.body.gasPrice || 0).toString()
			},
            jsonrpc: "2.0",
            id: "1"
     }
    console.log('params for creating contract', JSON.stringify(contract_params));
	unirest.post(ethKitClient(req))
	.type('json')
	.send(JSON.stringify(contract_params))
	.end(function (response) {
	  console.log('response from eth client for creating contract', response.body);
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

	var msg_data = RLP.encode(req.body.data);
	console.log('compiled message data', msg_data);

	var eth_results = {}

	var tranx_params = {
            method: "transact",
            params: {
                "aDest": req.body.destination.toString(),
                "bData": msg_data,
                "sec": req.body.sec,
                "xGas": (req.body.gas || 0).toString(),
                "xGasPrice": (req.body.gasPrice || 0).toString(),
                "xValue": (req.body.value || 0).toString()
			},
            jsonrpc: "2.0",
            id: "1"
     }
    console.log('params for sending transaction', JSON.stringify(tranx_params));
	unirest.post(ethKitClient(req))
	.type('json')
	.send(JSON.stringify(tranx_params))
	.end(function (response) {
	  console.log('response from eth client for sending transaction', response.body);
	  eth_results['response'] = response.body;
	  res.write(JSON.stringify(eth_results));
	  res.end();
	})
}


String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, "");
};
