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
	}
};