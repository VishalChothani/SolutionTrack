var mysql = require("../DBhandler");

exports.report_info = function(req, res) {
	
	mysql.report_info(function(incident_report,parking_violation,tresspassing,maintenance,call_of_service){    
		console.log(JSON.stringify(incident_report));
		console.log(parking_violation);
		console.log(tresspassing);
		console.log(maintenance);
		console.log(call_of_service);
		res.render('report.ejs', {
			incident_report: incident_report,
			parking_violation: parking_violation,
			tresspassing: tresspassing,
			maintenance: maintenance,
			call_of_service: call_of_service,
			property_id: req.session.property_id
		});
	},req.session.property_id);
};

exports.get_particular_property_info = function(req,res){	
	console.log(req.param("property_id"));
	var date = new Date().toJSON().slice(0,10);
	mysql.get_particular_property_info(function(property_info,incident_report,parking_violation,tresspassing,maintenance,call_of_service){
		res.send({
			incident_report: incident_report,
			parking_violation: parking_violation,
			tresspassing: tresspassing,
			maintenance: maintenance,
			call_of_service: call_of_service,
			property_info: property_info,
			date: date
		});
	},req.param("property_id"));
};


exports.get_particular_report_info = function(req,res){	
	console.log(req.param("report_no"));
	mysql.get_particular_report_info(function(report_info){
		
		var base64blob = report_info[0].photo;
		var buffer = new Buffer( base64blob );
        var bufferBase64 = buffer.toString('base64');
		
		res.send({
			report_info : report_info,
			url : bufferBase64
			});
	},req.param("report_no"));
};