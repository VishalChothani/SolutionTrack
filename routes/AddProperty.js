/**
 * New node file
 */

var mysql = require("../DBhandler");

exports.AddPropertyManager = function(req, res) {
	console.log(req.param("property_name"), req.param("contact_name"), req.param("contact_number"),
			req.param("address"), req.param("comments"), req.param("property_details"));
	console.log(req.session.userNo);
	mysql.AddPropertyManager(function(flag, property){    
		if (flag === true) {
			res.render('property_list.ejs', {
				property : property,
				email: req.session.email
			});
		} else {
			res.render('property_list.ejs', {
				property : property,
				email: req.session.email				
			});
		}
	}, req.param("property_name"), req.param("contact_name"), req.param("contact_number"),
	req.param("address"), req.param("comments"), req.param("property_details"),req.session.userNo,req.session.userType);
};



exports.ajax_get_specific_property_details = function(req,res){
	console.log("PropertyNo: " + req.param("property_no"));
	mysql.ajax_get_specific_property_details(function(specific_property_details){
		console.log(specific_property_details);
		res.send({ specific_property_details : specific_property_details});	
	},req.param("property_no"));
};

exports.edit_specific_property_details = function(req,res){
	console.log("edit_property_name: " + req.param("edit_property_name"));
	console.log("edit_contact_number: " + req.param("edit_contact_number"));
	console.log("edit_address: " + req.param("edit_address"));
	console.log("edit_comments: " + req.param("edit_comments"));
	console.log("edit_property_details: " + req.param("edit_property_details"));
	console.log("edit_property_no: " + req.param("edit_property_no"));
	console.log("req.session.userNo:" + req.session.userNo);
	
	mysql.edit_specific_property_details(function(property){
		console.log(property);
		
		res.render('property_list.ejs', {
			property : property,
			email: req.session.email				
		});
	
	},req.param("edit_property_name"),req.param("edit_contact_number"),req.param("edit_address"),
	req.param("edit_comments"),req.param("edit_property_details"),req.param("edit_property_no"),req.session.userNo);
};

exports.delete_specific_property_details = function(req,res){
	console.log("delete_property_no: " + req.param("delete_property_no"));
	console.log("req.session.userNo:" + req.session.userNo);
	
	mysql.delete_specific_property_details(function(property){
		console.log(property);		
		res.render('property_list.ejs', {
			property : property,
			email: req.session.email				
		});	
	},req.param("delete_property_no"),req.session.userNo);
};
