var express = require('express')
  , modulus = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , ejs = require("ejs");

var app = express();
app.use(express.cookieParser());
app.use(express.session({ secret:"vishalchothani21"}));


var moment = require('moment');
var now = moment().format('lll');
var expiry_date = moment().add('days', 3).format('lll');

var nodemailer = require("nodemailer");

var flash = require('connect-flash');
var app = express();

app.configure(function() {
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session({ cookie: { maxAge: 60000 }}));
  app.use(flash());
});

/* Email Sending */

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "team4.272.2014@gmail.com",
        pass: "VishalChothani"
    }
});

/* End of Email*/

var mysql = require("./mysqlOperation");

// all environments
app.set('port', process.env.PORT || 3022);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res)
{
	res.render('Home.ejs',{login_error:""});
});

app.get('/Answers', function(req, res)
{
	var currently_active,current_grid_open="";
	mysql.getOptions(function(options,questionsAnswers,err,results)
	{
		if(err)
		{
			throw err;
		}		
		else
		{			
			for(var i in options)
			{
				currently_active = options[0].option_id;				
			}
			res.render('Answers.ejs', { options:options, questionsAnswers:questionsAnswers, currently_active:currently_active, current_grid_open:current_grid_open });			
		}
	});
});

app.get('/ReqSupport', function(req, res)
{
	res.render('ReqSupport.ejs');
});

app.get('/SubmitTicket', function(req, res)
{
	res.render('SubmitTicket.ejs');
});

app.get('/Downloads', function(req, res)
{
	res.render('Downloads.ejs');
});

app.post('/Downloads', function(req, res)
{
	res.render('Downloads.ejs');
});


app.post('/Successful', function(req, res)
{

	mysql.addTicket(function(err,results)
	{
		if(err)
		{
			throw err;
		}		
		else
		{
			var mailOptions = {
			    from: "<team4.272.2014@gmail.com>", 
			    to: req.param('email'), 
			    subject: "Automatic reply", 
			    text: "We have recieved your question and we will reply you as soon as possible, Thank you for using Solution Track", 
			    html: "<b>Automatic reply</b>" 
			}
			
			// send mail with defined transport object
			smtpTransport.sendMail(mailOptions, function(error, response)
			{
				if(error)
				{
					console.log(error);
				}
				else
				{
					console.log("Message sent: " + response.message);
				}
			});
			    
			res.render('Successful.ejs');
		}		
	},req.param('username'),req.param('email'),req.param('urgency'),req.param('topic_name'),req.param('topic_details'),now,expiry_date);
});

app.get('/Answers/:option_id', function(req, res)
{
	var currently_active;
	var current_grid_open="";
	mysql.getParticularAnswers(function(options,questionsAnswers,err,results)
	{
		if(err)
		{
			throw err;
		}		
		else
		{			
			for(var i in options)
			{
				currently_active = req.param('option_id');				
			}
			console.log("currently_active:-"+currently_active);
			console.log(questionsAnswers);
			res.render('Answers.ejs', { options:options, questionsAnswers:questionsAnswers, currently_active:currently_active, current_grid_open:current_grid_open });			
		}
	},req.param('option_id'));		
});

app.post('/Admin', function(req, res)
{
	mysql.login(function(result,err,results)
	{
		if(result==true)
		{
			console.log('1.true');
			var smtpTransportAuth = nodemailer.createTransport("SMTP",{
			    service: "Gmail",
			    auth: {
			        user: req.param('login_email'),
			        pass: req.param('login_password')
			    }
			});

			var mailOptions = {
				    from: "<team4.272.2014@gmail.com>", 
				    to: req.param('login_email'), 
				    subject: "Logged in with Solution Track ", 
				    text: "Hello world ", 
				    html: "<b>Hello world </b>" 
				}
			
			smtpTransportAuth.sendMail(mailOptions, function(error, response)
			{
				if(error)
				{	
					console.log('1.false');
					res.render('Home.ejs',{login_error:"Wrong Credential"});
				}
				else
				{
					console.log('2.true');
					console.log("Message sent: " + response.message);
					req.session.login = true;
					var success = "";
					res.render('Admin.ejs',{success:success});					
				}
			});
		}
		else
		{
			console.log('2.false');
			res.render('Home.ejs',{login_error:"Wrong Credential"});
		}		
	},req.param('login_email'),req.param('login_password'));
	/**/
});

app.post('/modifyStatus', function(req, res)
{
	var ticket_id = req.body.ticket_id;
	var newValue = req.body.newValue;
	mysql.updateStatus(function(err,results)
	{
		if(err)
		{
			throw err;
		}		
		else
		{			
			var success = "";
			res.render('Admin.ejs',{success:success});			
		}
	},ticket_id,newValue);
});

app.post('/getTicketInformation', function(req, res)
{
	var ticket_id = req.body.ticket_id;
	mysql.gettingTicketInformation(function(resultTicketInfo,resultEmail,resultQuestionSet,err,results)
	{
		if(err)
		{
			throw err;
		}		
		else
		{	
			console.log(JSON.stringify(resultTicketInfo));
			console.log(JSON.stringify(resultEmail));
			console.log(JSON.stringify(resultQuestionSet));
			var result = resultTicketInfo.concat(resultEmail);
			result = result.concat(resultQuestionSet);
			
			for(i in resultTicketInfo)
			{
				req.session.ticket_no = resultTicketInfo[0].ticket_id;
			}
			
			for(i in resultEmail)
			{
				req.session.email = resultEmail[0].email;
			}
			
			console.log("req.session.ticket_no"+req.session.ticket_no);
			console.log("req.session.email"+req.session.email);
			console.log(result);
			res.send(result);			
		}
	},ticket_id);	
});

app.post('/search', function(req, res)
{
	var currently_active,current_grid_open;
	var search_value = req.param('search_value');
	console.log("search_value:-"+search_value);
	mysql.searching(function(searchResult,err,results)
	{		
		res.render('Search.ejs', { searchResult:searchResult });		
	},search_value);	
});

app.get('/search', function(req, res)
{
	var currently_active,current_grid_open;
	var search_value = req.param('search_value');
	console.log("search_value:-"+search_value);
	mysql.searching(function(searchResult,err,results)
	{		
		console.log('SearchResult:-'+searchResult);
		res.render('Search.ejs', { searchResult:searchResult });		
	},search_value);	
});

app.get('/Admin', function(req, res)
{
	if(req.session.login == true)
	{
		var success = "";
		res.render('Admin.ejs',{success:success});
	}
	else
	{
		res.render('Home.ejs',{login_error:""});
	}
});

app.get('/Logout', function(req, res)
{
	res.render('Home.ejs',{login_error:""});
});

app.post('/SendMail', function(req, res)
{
	mysql.storingReply(function(err,results)
	{
		console.log("Yes");
	},req.session.ticket_no,req.param('reply_to_prob'),now);
	
	var mailOptions = {
		    from: "<team4.272.2014@gmail.com>", 
		    to: req.session.email, // list of receivers
		    subject: "Hello", // Subject line
		    text: req.param('reply_to_prob'), // plaintext body
		    html: "<b>Hello world </b>" // html body
		}
		
		// send mail with defined transport object
		smtpTransport.sendMail(mailOptions, function(error, response)
		{
			if(error)
			{
				console.log(error);
			}
			else
			{
				console.log("Message sent: " + response.message);
			}
		});
		var success = "Msg send succcessful";
		res.render('Admin.ejs',{success:success});
});

app.get('/dataFromTable',function(req,res){
	mysql.getDataFromTable(function(data,err,results){
		if(err)
		{
			console.log(err); 
		}
		res.send(data);
	});
});


app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
