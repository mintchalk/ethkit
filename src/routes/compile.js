var mongoose = require('mongoose'),
    winston = require('winston');
var SerpentCode = mongoose.model('SerpentCode');
var exec = require('child_process').exec;

var headers = {
    "Content-Type": "application/json", 
    "Access-Control-Allow-Origin": "*"
}

exports.compileSerpent = function (req, res) {

    winston.log('POST: ' + req.body);
    winston.log(req.body);
    if (!req.body.code){
        res.writeHead(405, headers);
        res.end(JSON.stringify({'error': 'code value is missing'}))
    }
    
    res.writeHead(200, headers);
    serpent_results = {};
    if (req.body.debug || true)
        serpent_results['code'] = req.body.code;
    // run serpent commands
    var setSerpentResults = function(k, e, o, err){
        if (err){
            if (!serpent_results['errors']){
                serpent_results['errors'] = {}
            }
            serpent_results['errors'][k] = err.trim();
        }else{
            serpent_results[k] = o.trim();
        }
    }

    exec(serpentCommand("compile", req.body.code), 
    function(e,o,err){
        setSerpentResults('bytecode', e,o,err);
        exec(serpentCommand("compile_to_lll", req.body.code), 
        function(e,o,err){
            setSerpentResults('lll', e,o,err);
            exec(serpentCommand("pretty_compile", req.body.code), 
            function(e,o,err){
                setSerpentResults('assembly', e,o,err);
                res.write(JSON.stringify(serpent_results));
                res.end();
            });
        });
     });

    
    //var compile = new SerpentCode();
    //bindReqParams(req, compile);
};


var bindReqParams = function (req, compile) {
    compile.code = req.body.code;
};

var serpentCommand = function(action, code){
    return "serpent " + action + " " + '"' + code + '"';
}


String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, "");
};