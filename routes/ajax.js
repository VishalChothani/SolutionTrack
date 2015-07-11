var mysql = require('mysql');

var connection = mysql.createConnection({
	  host     : 'projectdemo.cq3u8fhrnzsr.us-west-1.rds.amazonaws.com',
	  user     : 'ProjectDemo',
	  port     : '3306',
	  password : 'ProjectDemo',
	  database : 'ProjectDemo'
	});

connection.connect();


exports.getlist_date=function(req,res){
	query='select propertyid,date_format(date,"%d-%m-%Y") date,count(*) count from REPORT group by propertyid,date';
	connection.query(query, function(err, rows, fields) {
		  if (err) throw err;
		  
		  console.log(rows);
		  res.setHeader('Content-Type', 'application/json');
		  res.send(JSON.stringify(rows));
		 
		});
}


exports.getlist_report= function(req,res){
	query="select type,propertyid,count(*) count from REPORT group by type,propertyid";
connection.query(query, function(err, rows, fields) {
	  if (err) throw err;
	  
	  console.log(rows);
	  res.setHeader('Content-Type', 'application/json');
	  res.send(JSON.stringify(rows));
	 
	});
}

exports.getlist_day= function(req,res){
		query="select DATE_FORMAT(date,'%a') day,propertyid,count(*) count from REPORT group by day,propertyid";
	connection.query(query, function(err, rows, fields) {
		  if (err) throw err;
		  
		  console.log(rows);
		  res.setHeader('Content-Type', 'application/json');
		  res.send(JSON.stringify(rows));
		 
		 // console.log('The solution is: ', rows[0].userid);
		});
	}


exports.getlist_status= function(req,res){
	query="select status,propertyid,count(*) count from REPORT_STATUS group by propertyid,status";
	connection.query(query, function(err, rows, fields) {
	  if (err) throw err;
	  
	  console.log(rows);
	  res.setHeader('Content-Type', 'application/json');
	  res.send(JSON.stringify(rows));
	 
	});
}