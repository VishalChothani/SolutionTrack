var mysql = require("../DBhandler");


exports.LogInUser = function(req, res) {	
	mysql.LogInUser(function(flag, email, userType, userNo, property){
		console.log("email: "+email);
		console.log("userNo: "+userNo);
		console.log("userType: "+userType);
		
		req.session.userNo = userNo;
		req.session.userType = userType;		
		req.session.email = email;
		
		
		if (flag === true) {
			if(userType=='S')
			{
				res.render('property_list_amit.ejs', {
					email : email,
					property : property
				});
			}
			else
			{
				res.render('property_list.ejs', {
					email : email,
					property : property,				
				});
			}
		} else {
			res.render('login.ejs', {
				error: "Wrong Credential"
			});
		}
	}, req.param("email"), req.param("password"));

};
