var ejs = require("ejs");

exports.LogInUser = LogInUser;
exports.AddPropertyManager = AddPropertyManager;
exports.checkEmail = checkEmail;
exports.get_particular_report_info =get_particular_report_info;
exports.createAccount = createAccount;
exports.ajax_get_specific_property_details = ajax_get_specific_property_details;
exports.edit_specific_property_details = edit_specific_property_details;
exports.delete_specific_property_details = delete_specific_property_details;
exports.report_info = report_info;
exports.get_particular_property_info = get_particular_property_info;
exports.guard_list = guard_list;

//-------------------- amit ----------------------

exports.AddPropertyAmit = AddPropertyAmit;
exports.EmployeeDetails = EmployeeDetails;
exports.AddEmployee = AddEmployee;
exports.GetPropertyAmit = GetPropertyAmit;

function AddPropertyAmit(callback, propertyname, contactname, contactno, address, comments, propertydetails, clientid, guardcount,account_id)
{	
	var updatedate = new Date().toJSON().slice(0,10);
	console.log(propertyname+" "+contactname+" "+contactno);
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
		user : 'ProjectDemo',
		password : 'ProjectDemo',
		port : '3306',
		database : 'ProjectDemo'
	});
	var flag = false;
	
	
	console.log("Before Insert Query");
	var sql1 = "Insert into PROPERTY_DETAILS " +
			"(PROPERTY_NAME, CONTACT_NUMBER, ADDRESS, COMMENTS, UPDATE_DATE, PROPERTY_DETAILSCOL, CLIENT_ID, GUARD_COUNT) " +
			"values('" + propertyname +  "','" + contactno + "','"  + address + "','"  + comments+ "'" +
					",'" + updatedate + "','" + propertydetails +"','" + clientid +"','" + guardcount +"')";
	
	console.log(sql1);
	connection.query(sql1, function(err, rows, fields) {
		if (rows.length != 0) {
			flag = true;
			var sql2 = "select * from PROPERTY_DETAILS where MANAGER_ID='"+account_id+"' || CLIENT_ID='"+account_id+"'";
			connection.query(sql2, function(err, rows1, fields) {					
			callback(flag, rows1);
			});
		}else {
			flag = false;
			callback(flag, "");
		}
});
}


function GetPropertyAmit(callback,account_id)
{	
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
		user : 'ProjectDemo',
		password : 'ProjectDemo',
		port : '3306',
		database : 'ProjectDemo'
	});
	
	var sql2 = "select * from PROPERTY_DETAILS where MANAGER_ID='"+account_id+"' || CLIENT_ID='"+account_id+"'";
	connection.query(sql2, function(err, rows1, fields) {					
	callback(flag, rows1);
			
});
}


function EmployeeDetails(callback)
{
	console.log("Inside Employee det DB Handler");

	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
		user : 'ProjectDemo',
		password : 'ProjectDemo',
		port : '3306',
		database : 'ProjectDemo'
	});
	var flag = false;
	var sql1 = "select * from EMPLOYEE_DETAILS";
	console.log(sql1);
	connection.query(sql1, function(err, rows, fields) {
		if (rows.length != 0) {
			flag = true;			
			callback(flag, rows);			
		}else {
			flag = false;
			callback(flag, "");
		}
});
}




function AddEmployee(callback, employeetype, name, ssn, address_1, address_2, phonenumber, propertyno, photo)
{	
	console.log(employeetype);
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
		user : 'ProjectDemo',
		password : 'ProjectDemo',
		port : '3306',
		database : 'ProjectDemo'
	});
	var flag = false;
	
	
	console.log("Before Insert Query");
	var sql1 = "Insert into EMPLOYEE_DETAILS " +
			"(EMPLOYEE_TYPE, NAME, SSN, ADDRESS_1, ADDRESS_2, PHONE_NUMBER, PROPERTY_NO, PHOTO) " +
			"values('" + employeetype +  "','" + name + "','"  + ssn + "','"  + address_1 + "','"  + address_2+ "'" +
					",'" + phonenumber + "','" + propertyno + "','" + photo + "')";
	
	console.log(sql1);
	connection.query(sql1, function(err, rows, fields) {
		if (rows.length != 0) {
			flag = true;
			var sql2 = "select * from EMPLOYEE_DETAILS";
			connection.query(sql2, function(err, rows1, fields) {
					
			callback(flag, rows1);
			});
		}else {
			flag = false;
			callback(flag, "");
		}
});
}


function LogInUser(callback, email, password) {
	var mysql = require('mysql');
	var sendEmail = "";
	var sendUserType = "";
	var sendUserNo = "";

	var connection = mysql.createConnection({
		host : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
		user : 'ProjectDemo',
		password : 'ProjectDemo',
		port : '3306',
		database : 'ProjectDemo'
	});
	
	var flag = false;
	var sql1 = "select * from USER_CREDENTIALS where EMAIL='" + email
			+ "' and PASSWORD='" + password + "'";

	connection.query(sql1, function(err, rows, fields) {
		console.log("Error: "+sql1);
		console.log("Error: "+err);
		console.log("Rows: "+JSON.stringify(rows));
		if (rows.length != 0) {			
			sendEmail = rows[0].EMAIL;
			sendUserType = rows[0].USER_TYPE;
			sendUserNo = rows[0].USER_NO;
			
			
			flag = true;			
			var sql2 = "select * from PROPERTY_DETAILS where MANAGER_ID='"+sendUserNo+"' || CLIENT_ID='"+sendUserNo+"'";
			connection.query(sql2, function(err, rows1, fields) {
				console.log(sql2);
				console.log(rows1);
			callback(flag, sendEmail, sendUserType, sendUserNo, rows1);
			});
		} else {
			flag = false;
			callback(flag, sendEmail, sendUserType, sendUserNo,"");
		}
	});
}


function AddPropertyManager(callback, property_name, contact_name, contact_number, address, comments, property_details,account_id, user_type)
{
	var mysql = require('mysql');
	var date = new Date().toJSON().slice(0,10);
	
	console.log
	var connection = mysql.createConnection({
		host : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
		user : 'ProjectDemo',
		password : 'ProjectDemo',
		port : '3306',
		database : 'ProjectDemo'
	});
	
	var flag = false;
	
	var sql1 = "Insert into PROPERTY_DETAILS (PROPERTY_NAME, MANAGER_ID, CONTACT_NUMBER, ADDRESS, COMMENTS, UPDATE_DATE, PROPERTY_DETAILSCOL) values('"	
	+ property_name
	+  "','"
	+ account_id
	+ "','" 
    + contact_number
	+ "','" 
    + address
	+ "','" 
	+ comments
	+ "','"	
	+ date
	+ "','"		
	+ property_details
	+"')";
	
	console.log(sql1);
	
	connection.query(sql1, function(err, rows, fields) {
		if (rows.length != 0) {
			flag = true;
			var sql2 = "select * from PROPERTY_DETAILS where MANAGER_ID='"+account_id+"' || CLIENT_ID='"+account_id+"'";
			connection.query(sql2, function(err, rows1, fields) {
			callback(flag, rows1);
			});
		}else {
			flag = false;
			callback(flag, "");
		}
	});
}

function checkEmail(callback, email)
{
	var mysql = require('mysql');

	var connection = mysql.createConnection({
		host : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
		user : 'ProjectDemo',
		password : 'ProjectDemo',
		port : '3306',
		database : 'ProjectDemo'
	});
	var flag = false;
		
	var sql1 = "select * from USER_CREDENTIALS where EMAIL='"+email+"'";
	console.log(sql1);
	
	connection.query(sql1, function(err, rows, fields) 
	{
		if (rows.length !== 0) 
		{
			flag = true;
			callback(flag);			
		}
		else 
		{
			flag = false;
			callback(flag);
		}
	});
}

function get_particular_report_info(callback, report_no)
{
	var mysql = require('mysql');

	var connection = mysql.createConnection({
		host : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
		user : 'ProjectDemo',
		password : 'ProjectDemo',
		port : '3306',
		database : 'ProjectDemo'
	});
	var flag = false;
	
	console.log("Before Select Query");	
	var sql1 = "select * from REPORT where rpno='"+report_no+"'";
	console.log(sql1);
	
	connection.query(sql1, function(err, rows, fields) 
	{
		callback(rows);		
	});
}

function get_particular_property_info(callback, property_id)
{
	var mysql = require('mysql');

	var connection = mysql.createConnection({
		host : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
		user : 'ProjectDemo',
		password : 'ProjectDemo',
		port : '3306',
		database : 'ProjectDemo'
	});
	var flag = false;
	
	console.log("Before Select Query");
	var sql = "select * from PROPERTY_DETAILS where property_no='"+property_id+"'";
	{
		console.log(sql);	
		connection.query(sql, function(err, row, fields) 
		{
			var sql1 = "select rpno, description, date, location, status from REPORT where PROPERTYID='"+property_id+"' and TYPE='Incident Report'";
			console.log(sql1);	
			connection.query(sql1, function(err, rows, fields) 
			{
				var sql2 = "select rpno, description, date, location, status from REPORT where PROPERTYID='"+property_id+"' and TYPE='Parking Violation'";
				console.log(sql2);	
				connection.query(sql2, function(err, rows2, fields) 
				{
					var sql3 = "select rpno, description, date, location, status from REPORT where PROPERTYID='"+property_id+"' and TYPE='Tresspassing'";
					console.log(rows2);	
					connection.query(sql3, function(err, rows3, fields) 
					{
						var sql4 = "select rpno, description, date, location, status from REPORT where PROPERTYID='"+property_id+"' and TYPE='Maintenance'";
						console.log(sql4);	
						connection.query(sql4, function(err, rows4, fields) 
						{
							var sql5 = "select rpno, description, date, location, status from REPORT where PROPERTYID='"+property_id+"' and TYPE='Call of Service'";
							console.log(sql5);	
							connection.query(sql5, function(err, rows5, fields) 
							{
								callback(row,rows,rows2,rows3,rows4,rows5);
							});
						});
					});
				});		
			});
		});
	}
	
}

function createAccount(callback, first_name, last_name, email, password, user_type)
{
	var mysql = require('mysql');

	var connection = mysql.createConnection({
		host : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
		user : 'ProjectDemo',
		password : 'ProjectDemo',
		port : '3306',
		database : 'ProjectDemo'
	});
	var emailSend = null;
	
	console.log("Before Select Query");	
	var sql1 = "Insert into USER_CREDENTIALS (USER_TYPE, USER_NAME, EMAIL, PASSWORD) values('"	
		+ user_type
		+  "','"
		+ first_name+last_name 
		+ "','" 
	    + email
		+ "','" 
	    + password
		+"')";
	console.log(sql1);
	
	connection.query(sql1, function(err, rows, fields) 
	{
		console.log(err);
		console.log(rows.insertId);
		if (rows.length !== 0) 
		{
			emailSend = email;
			
			var sql2 = "select * from PROPERTY_DETAILS where MANAGER_ID='"+rows.insertId+"' || CLIENT_ID='"+rows.insertId+"'";
			connection.query(sql2, function(err, rows1, fields) {
				console.log(sql2);
				console.log(rows1);
				callback(emailSend, rows.insertId, user_type, rows1);
			});
		}
		else 
		{			
			callback(emailSend, "", "", "");
		}
	});
}

;

function ajax_get_specific_property_details(callback, property_no) {
	var mysql = require('mysql');
	
	var connection = mysql.createConnection({
		host : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
		user : 'ProjectDemo',
		password : 'ProjectDemo',
		port : '3306',
		database : 'ProjectDemo'
	});
	
	var sql1 = "select * from PROPERTY_DETAILS where PROPERTY_NO='"+property_no+"'";
	console.log(sql1);	
	connection.query(sql1, function(err, rows, fields) 
	{
		callback(rows);		
	});
	
};


function guard_list(callback, property_no) {
	var mysql = require('mysql');
	
	var connection = mysql.createConnection({
		host : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
		user : 'ProjectDemo',
		password : 'ProjectDemo',
		port : '3306',
		database : 'ProjectDemo'
	});
	
	var sql1 = "select * from EMPLOYEE_DETAILS where PROPERTY_NO='"+property_no+"' and EMPLOYEE_TYPE='G'";
	console.log(sql1);	
	connection.query(sql1, function(err, rows, fields) 
	{
		callback(rows);		
	});
	
};

function edit_specific_property_details(callback, property_name, contact_number, address, comments, property_details,property_no,account_id)
{
	var mysql = require('mysql');
	var date = new Date().toJSON().slice(0,10);

	var connection = mysql.createConnection({
		host : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
		user : 'ProjectDemo',
		password : 'ProjectDemo',
		port : '3306',
		database : 'ProjectDemo'
	});
	 
	var sql1 = "Update PROPERTY_DETAILS set	PROPERTY_NAME= '"
		+ property_name
		+  "', CONTACT_NUMBER='"		 
	    + contact_number
		+ "',ADDRESS = '" 
	    + address
		+ "', COMMENTS='" 
		+ comments
		+ "', UPDATE_DATE='"	
		+ date
		+ "',PROPERTY_DETAILSCOL='"		
		+ property_details
		+"'where PROPERTY_NO='"		
		+ property_no
		+"'";
		
		console.log(sql1);
		
		connection.query(sql1, function(err, rows, fields) {
			if (rows.length != 0) {
				//flag = true;
				var sql2 = "select * from PROPERTY_DETAILS where MANAGER_ID='"+account_id+"' || CLIENT_ID='"+account_id+"'";
				connection.query(sql2, function(err, rows1, fields) {
				callback(rows1);
				});
			}else {
				//flag = false;
				callback("");
			}
		});
	
};

function delete_specific_property_details(callback, property_no, account_id)
{
	var mysql = require('mysql');

	var connection = mysql.createConnection({
		host : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
		user : 'ProjectDemo',
		password : 'ProjectDemo',
		port : '3306',
		database : 'ProjectDemo'
	});
	 
	var sql1 = "Delete from PROPERTY_DETAILS where PROPERTY_NO='"		
		+ property_no
		+"'";
		
		console.log(sql1);
		
		connection.query(sql1, function(err, rows, fields) {
			if (rows.length != 0) {
				//flag = true;
				var sql2 = "select * from PROPERTY_DETAILS where MANAGER_ID='"+account_id+"' || CLIENT_ID='"+account_id+"'";
				connection.query(sql2, function(err, rows1, fields) {
				callback(rows1);
				});
			}else {
				//flag = false;
				callback("");
			}
		});
	
};

function report_info(callback, property_id)
{
	var mysql = require('mysql');

	var connection = mysql.createConnection({
		host : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
		user : 'ProjectDemo',
		password : 'ProjectDemo',
		port : '3306',
		database : 'ProjectDemo'
	});
	var flag = false;
	
	console.log("Before Select Query");	
	var sql1 = "select rpno, description, date, location, status from REPORT where PROPERTYID='"+property_id+"' and TYPE='Incident Report'";
	console.log(sql1);	
	connection.query(sql1, function(err, rows, fields) 
	{
		var sql2 = "select rpno, description, date, location, status from REPORT where PROPERTYID='"+property_id+"' and TYPE='Parking Violation'";
		console.log(sql2);	
		connection.query(sql2, function(err, rows2, fields) 
		{
			var sql3 = "select rpno, description, date, location, status from REPORT where PROPERTYID='"+property_id+"' and TYPE='Tresspassing'";
			console.log(sql3);	
			connection.query(sql3, function(err, rows3, fields) 
			{
				var sql4 = "select rpno, description, date, location, status from REPORT where PROPERTYID='"+property_id+"' and TYPE='Maintenance'";
				console.log(sql4);	
				connection.query(sql4, function(err, rows4, fields) 
				{
					var sql5 = "select rpno, description, date, location, status from REPORT where PROPERTYID='"+property_id+"' and TYPE='Call of Service'";
					console.log(sql5);	
					connection.query(sql5, function(err, rows5, fields) 
					{
						callback(rows,rows2,rows3,rows4,rows5);
					});
				});
			});
		});		
	});
}