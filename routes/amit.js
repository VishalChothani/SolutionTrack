var mysql = require("../DBhandler");

exports.AddEmployeelist = function(req, res) {
	console.log("In Add Employee");
	console.log(req.param("employeetype"), req.param("name"),
			req.param("ssn"), req.param("address_1"), req.param("address_2"),
			req.param("phonenumber"), req.param("propertyno"),req.param("photo"));
	

	mysql.AddEmployee(function(flag, employee){    
		if (flag === true) {
			res.render('EmployeeDetails.ejs', {
				employee :employee,
				email : req.session.email
			});
		} else {
			res.render('EmployeeDetails.ejs', {
				title : "Error"
			});
		}
	},req.param("employeetype"), req.param("name"),
	req.param("ssn"), req.param("address_1"), req.param("address_2"),
	req.param("phonenumber"),req.param("propertyno"),req.param("photo"));
};


exports.AddPropertylist = function(req, res) {
	console.log("In Add Property");
	console.log(req.param("propertyname"), req.param("contactname"),
			req.param("contactno"), req.param("address"), req.param("comments"),
			req.param("propertydetails"), req.param("guardcount"));
	

	mysql.AddPropertyAmit(function(flag, property){    
		if (flag === true) {
			res.render('property_list_amit.ejs', {
				email : req.session.email,
				property : property
			});
		} else {
			res.render('property_list_amit.ejs', {
				title : "Error"
			});
		}
	},req.param("propertyname"), req.param("contactname"),
	req.param("contactno"), req.param("address"), req.param("comments"),
	req.param("propertydetails"), req.session.userNo, req.param("guardcount"),req.session.userNo);
};



exports.GetPropertylist = function(req, res) {
	mysql.GetPropertyAmit(function( property){    
		res.render('property_list_amit.ejs', {
			email : req.session.email,
			property : property
		});
	},req.session.userNo);
};

/**
 * New node file
 */

var mysql = require("../DBhandler");
exports.list = function(req, res) {
	console.log("In Add Property");
	console.log(req.param("propertyname"), req.param("contactname"),
			req.param("contactno"), req.param("address"), req.param("comments"),
			req.param("updatedate"), req.param("propertydetails"), req.param("clientid"), req.param("guardcount"));
	

	mysql.AddProperty(function(flag, property){    
		if (flag === true) {
			res.render('UserHome.ejs', {
				property :property
			});
		} else {
			res.render('UserHome.ejs', {
				title : "Error"
			});
		}
	},req.param("propertyname"), req.param("contactname"),
	req.param("contactno"), req.param("address"), req.param("comments"),
	req.param("updatedate"), req.param("propertydetails"), req.param("clientid"), req.param("guardcount"));
};

exports.EmployeeDetailslist = function(req, res) {
	console.log("Inside Employee det JS");	
	mysql.EmployeeDetails(function(flag, employee){  	
		console.log("Inside Employee Fun");	
		if (flag === true) {
			res.render('EmployeeDetails.ejs', {
				email: req.session.email,
				employee : employee
			});
		} else {
			res.render('EmployeeDetails.ejs', {
				email: req.session.email,
				employee : employee
			});
		}
	});

};

