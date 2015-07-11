var mysql = require("../DBhandler");

exports.checkEmail = function(req, res) {
	console.log(req.param("email"));
	mysql.checkEmail(function(flag){    
		if (flag === true) {
			res.send({duplicateEmail :"Email Id already used"});			
		} else {
			res.send({duplicateEmail :""});
		}
	}, req.param("email"));
};


exports.Register_user = function(req,res,callback){
	console.log();
	console.log(req.param("first_name"));
	console.log(req.param("last_name"));
	console.log(req.param("email"));
	console.log(req.param("password"));
	console.log(req.param("password_confirmation"));
	
	mysql.createAccount(function(email,userNo,userType,property){    
		if (email === null) {
			res.render('create_account');			
		} else {
			req.session.userNo = userNo;
			req.session.userType = userType;
			req.session.email = email;
			res.render('property_list.ejs', {
				email : email,
				property : property
			});
		}
	}, req.param("first_name"), req.param("last_name"), req.param("email"), req.param("password"), req.param("user_type"));
};
