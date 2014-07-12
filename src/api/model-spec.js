exports.models = {
	"SerpentCode" : {
		"id": "SerpentCode",
		"required" : [ "code" ],
		"type": "object",
		"properties" : {
			"code" : {
				"type" : "string",
				"description" : "Serpent code to compile"
			}
		}
	},
	"Transaction" : {
		"id": "Transaction",
		"required" : [ "xGas", "bCode" ],
		"type": "object",
		"properties" : {
			"xGas" : {
				"type" : "string",
				"description" : "gas"
			},
			"bCode" : {
				"type" : "string",
				"description" : "code"
			}	
		}
	}
};