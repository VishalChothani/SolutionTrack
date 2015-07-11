var mysql = require("../DBhandler");

exports.guard_list = function(req, res){	
	mysql.guard_list(function(guard_list){
	  res.render('guard_list',{
		  guard_list: guard_list
	  });
	},req.session.property_id);
};
