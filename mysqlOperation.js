var ejs = require("ejs");
exports.getOptions = getOptions;
exports.addTicket = addTicket;
exports.getParticularAnswers = getParticularAnswers;
exports.getDataFromTable = getDataFromTable;
exports.updateStatus = updateStatus;
exports.gettingTicketInformation = gettingTicketInformation;
exports.storingReply = storingReply;
exports.login = login;
exports.searching = searching;

function getOptions(callback) 
{
	var mysql = require('mysql');
	var connection = mysql.createConnection(
	{
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		port: '3306',
		database: '272Project'
	});
 
	var sqlGetOptions = "select * from options";
	connection.query(sqlGetOptions, function(err, rowsOptions, fields)
	{
		var sqlGetOptionsQuestions = "select * from option_question_answer where option_id=1";
		connection.query(sqlGetOptionsQuestions, function(err, rowsQuestionsAnswers, fields)
		{
			callback(rowsOptions,rowsQuestionsAnswers);
		});
	});
}

function getDataFromTable(callback)
{
	var mysql = require('mysql');
	var connection = mysql.createConnection(
	{
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		port: '3306',
		database: '272Project'
	});
 
	var sqlGetTicket = "select * from ticket";
	connection.query(sqlGetTicket, function(err, rowsTicket, fields)
	{				
		callback(rowsTicket);
	});
}

/* ----------------------- particular answers ----------------- */

function getParticularAnswers(callback,optionId) 
{
	var mysql = require('mysql');
	var connection = mysql.createConnection(
	{
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		port: '3306',
		database: '272Project'
	});
 
	var sqlGetOptions = "select * from options";
	connection.query(sqlGetOptions, function(err, rowsOptions, fields)
	{
		var sqlGetOptionsQuestions = "select * from option_question_answer where option_id='"+optionId+"'";
		connection.query(sqlGetOptionsQuestions, function(err, rowsQuestionsAnswers, fields)
		{
			callback(rowsOptions,rowsQuestionsAnswers);
		});
	});
}

function addTicket(callback,username,email,urgency,topic_name,topic_details,submit_time,expiry_time) 
{
	
	console.log("=============INSIDE DATABASE==================");
	var status = "working";
	var mysql = require('mysql');
	var connection = mysql.createConnection(
	{
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		port: '3306',
		database: '272Project'
	});
 
	
//	console.log("=============IN DATABASE==================");
//	console.log("Username:- "+username);
//	console.log("Email:- "+email);
//	console.log("urgency:- "+urgency);
//	console.log("topic_name:- "+topic_name);
//	console.log("topic_details:- "+topic_details);
//	
//	console.log("submit_time:- "+submit_time);
//	console.log("expiry_time:- "+expiry_time);
	
	
	var sqlGetuserInfo = "select * from user_info where email='"+email+"'";
	connection.query(sqlGetuserInfo, function(err, rowsUserInfo, fields)
	{
		var new_user_id = 0;
		console.log("before");
		if(rowsUserInfo.length==0)
		{
			console.log("Insert");
			var sqlAddNewUser = "INSERT INTO user_info(username,email) values('"+username+"','"+email+"')";			
			connection.query(sqlAddNewUser, function(err, rowsAddNewUser)
			{
				new_user_id = rowsAddNewUser.insertId;
				console.log("new_user_id:- "+new_user_id);
				
				var sqlAddNewTicket = "INSERT INTO ticket(user_id,status,urgency,sub_time,expiry_date) values ('"+new_user_id+"','"+status+"','"+urgency+"','"+submit_time+"','"+expiry_time+"')";
				connection.query(sqlAddNewTicket, function(err, rowsAddNewTicket)
				{					
					console.log(err);
					var ticket_id = rowsAddNewTicket.insertId;
					var sqlAddQuestion = "INSERT INTO question_set(ticket_id,topic,question) values ('"+ticket_id+"','"+topic_name+"','"+topic_details+"')";
					connection.query(sqlAddQuestion, function(err, rowsAddQuestion)
					{
						console.log(err);
						callback();
					});
					
				});
			});
		}	
		else
		{
			console.log("Else NULL");
			new_user_id = "";
		}
		
		if(new_user_id==0)
		{
			console.log("equal to null");
			var sqlGetUserId = "select * from user_info where email='"+email+"'";
			connection.query(sqlGetUserId, function(err, rowsGetUserId)
			{				
				console.log(err);
				var new_user_id = rowsGetUserId[0].user_id;
				console.log("new_user_id:"+new_user_id);
				
				var sqlAddNewTicket = "INSERT INTO ticket(user_id,status,urgency,sub_time,expiry_date) values ('"+new_user_id+"','"+status+"','"+urgency+"','"+submit_time+"','"+expiry_time+"')";
				connection.query(sqlAddNewTicket, function(err, rowsAddNewTicket)
				{
					console.log('inside');
					console.log(err);
					callback();
					var ticket_id = rowsAddNewTicket.insertId;
					var sqlAddQuestion = "INSERT INTO question_set(ticket_id,topic,question) values ('"+ticket_id+"','"+topic_name+"','"+topic_details+"')";
					connection.query(sqlAddQuestion, function(err, rowsAddQuestion)
					{
						console.log(err);
						callback();
					});
				});
			});
		}		
		console.log("after:"+new_user_id);		
	});
}

function updateStatus(callback,ticket_id,newValue)
{
	var mysql = require('mysql');
	var connection = mysql.createConnection(
	{
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		port: '3306',
		database: '272Project'
	});
 
	var sqlUpdateStatus = "Update ticket set status='"+newValue+"' where ticket_id='"+ticket_id+"'";
	connection.query(sqlUpdateStatus, function(err, rowsUpdate, fields)
	{
		callback();
	});
}

function gettingTicketInformation(callback,ticket_id)
{
	var mysql = require('mysql');
	var connection = mysql.createConnection(
	{
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		port: '3306',
		database: '272Project'
	});
 
	var sqlTicketInfo = "select * from ticket where ticket_id='"+ticket_id+"'";
	connection.query(sqlTicketInfo, function(err, rowsTicketInfo, fields)
	{
		//console.log(rowsNoOfProduct[0].no_of_product);
		var user_id = rowsTicketInfo[0].user_id;
		var sqlQuestionInfo = "select * from question_set where ticket_id='"+ticket_id+"'";
		connection.query(sqlQuestionInfo, function(err, rowsQuestionInfo, fields)
		{
			
			var sqlEmail = "select * from user_info where user_id='"+user_id+"'";
			connection.query(sqlEmail, function(err, rowsEmail, fields)
			{
				callback(rowsTicketInfo,rowsEmail,rowsQuestionInfo);
			});
		});
		
		//callback(rowsTicketInfo);
	});
}

function storingReply(callback,ticket_id,reply,now)
{
	console.log('ticket_id:'+ticket_id);
	console.log('reply:'+reply);
	console.log('now:'+now);
	var mysql = require('mysql');
	var connection = mysql.createConnection(
	{
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		port: '3306',
		database: '272Project'
	});
 		
	var sqlUpdateReply = "Update question_set set reply='"+reply+"', timestamp='"+now+"' where ticket_id='"+ticket_id+"'";
	connection.query(sqlUpdateReply, function(err, rowsUpdateReply, fields)
	{			
		callback();
	});
}

function login(callback,username,password)
{
	var mysql = require('mysql');
	var connection = mysql.createConnection(
	{
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		port: '3306',
		database: '272Project'
	});
 		
	var sqlLogin = "select id from login_details where username='"+username+"' and password='"+password+"'";
	
	connection.query(sqlLogin, function(err, rowsLogin)
	{	
		var result = true;
		
		if(rowsLogin.length!=0)
		{
			result = true;
		}
		else
		{
			result = false;
		}
		callback(result);
	});
}

function searching(callback,search_value) 
{
	var mysql = require('mysql');
	var connection = mysql.createConnection(
	{
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		port: '3306',
		database: '272Project'
	});
	
	var sqlGetSearchResult = "select * from option_question_answer where question LIKE '%"+search_value+"%'";
	console.log("sqlGetSearchResult"+sqlGetSearchResult);
	connection.query(sqlGetSearchResult, function(err, rowsGetSearchResult, fields)
	{
		callback(rowsGetSearchResult);
	});
}
