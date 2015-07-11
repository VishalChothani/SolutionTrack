
exports.index = function(req, res){
  res.render('index');
};

exports.login = function(req, res){
	res.render('login.ejs', {
		error: ""
	});
};

exports.create_account = function(req, res){
  res.render('create_account');
};

exports.dashboard_homepage = function(req, res){
	console.log(req.param("property_id"));
	req.session.property_id = req.param("property_id");
	res.render('dashboard_homepage');
};

exports.get_dashboard_homepage = function(req, res){
	res.render('dashboard_homepage');
};

exports.map_page = function(req, res){
  res.render('map_page');
};

exports.gaurd_track = function(req, res){
  res.render('gaurd_track');
};

exports.report = function(req, res){
  res.render('report');
};

exports.guard_track = function(req, res){
  res.render('guard_track');
};

exports.messages = function(req, res){
  res.render('messages');
};


	
exports.maintenance_request = function(req, res){
	 res.render('maintenance_request');
};
		
exports.property_request = function(req, res){
	res.render('property_request');
};
	
//exports.getlist= function(req,res){
//	if(req.param("number")==0){
//		console.log('if');
//		query='SELECT * from tracking order by slno desc limit 1';
//	}
//	else
//		query='SELECT * from tracking  where slno > ?';
//	//console.log(req.params("date"));
//	//console.log(req.body.date);
//	connection.query(query,[req.param("number")], function(err, rows, fields) {
//		  if (err) throw err;
//		  
//		  console.log(rows);
//		  res.setHeader('Content-Type', 'application/json');
//		  res.send(JSON.stringify(rows));
//		 
//		 // console.log('The solution is: ', rows[0].userid);
//		});
//	//res.setHeader('Content-Type', 'application/json');
//    //res.send(JSON.stringify({ a: 1 }));
//}
			
exports.getlist= function(req,res){
	
	var mysql = require('mysql');
	var sendName = "";

	var connection = mysql.createConnection({
		host : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
		user : 'ProjectDemo',
		password : 'ProjectDemo',
		port : '3306',
		database : 'ProjectDemo'
	});
	
	console.log('if');
	if(req.param("number")==0){
		console.log('if');
		query='SELECT * from TRACKING where userid= ? order by slno desc limit 1';
		
	}
	else
		query='SELECT * from TRACKING  where userid=? and slno > ?';
	console.log(req.param);
	console.log(req.body.date);
	console.log(req.param("Userid"),req.param("number"));
	connection.query(query,[req.param("Userid"),req.param("number")], function(err, rows, fields) {
		  if (err) throw err;
		  
		  console.log(rows);
		  res.setHeader('Content-Type', 'application/json');
		  res.send(JSON.stringify(rows));
		 
		 // console.log('The solution is: ', rows[0].userid);
		});
	//res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify({ a: 1 }));
}





