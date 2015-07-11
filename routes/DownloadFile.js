var blockspring = require("blockspring");

exports.getInfo = function(req, res) {
	console.log(req.param("html"));
	
	blockspring.runParsed("html-to-pdf", { "html": req.param("html") }, function(res) {
		  console.log(res.params);
		  console.log(JSON.stringify(res));
		  console.log(req);
		});
};
