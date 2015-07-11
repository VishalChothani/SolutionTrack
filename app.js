
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , AfterLogin = require('./routes/AfterLogin')
  , AddProperty = require('./routes/AddProperty')
  , Registration = require('./routes/Registration')
  , Report = require('./routes/Report')
  , ajax = require('./routes/ajax')
  , guards = require('./routes/guards')
  , amit = require('./routes/amit')
  , DownloadFile = require('./routes/DownloadFile');

var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '295Project'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/index', routes.index);
app.get('/login', routes.login);
app.get('/create_account', routes.create_account);
app.get('/dashboard_homepage/:property_id',routes.dashboard_homepage);
app.get('/dashboard_homepage',routes.get_dashboard_homepage);
app.get('/map_page',routes.map_page);
app.get('/report',Report.report_info);
app.get('/guard_track',routes.guard_track);
app.get('/guard_list',guards.guard_list);
app.get('/maintenance_request',routes.maintenance_request);
app.get('/property_request',routes.property_request);
app.get('/messages',routes.messages);
app.get('/ajaxsample',routes.getlist);	//ask amit

app.get('/ajax_check_email',Registration.checkEmail);

app.post('/propertyList', AfterLogin.LogInUser);
app.post('/AddProperty', AddProperty.AddPropertyManager);
app.post('/Register_user', Registration.Register_user);
app.post('/get_particular_report_info',Report.get_particular_report_info);
app.post('/get_particular_property_info',Report.get_particular_property_info);
//app.post('/ajaxsample',routes.ajaxsample);
//app.get('/ajaxsample',routes.ajaxsample);
app.post('/download_file',DownloadFile.getInfo);
app.get('/ajax_get_specific_property_details',AddProperty.ajax_get_specific_property_details);
app.post('/edit_specific_property_details',AddProperty.edit_specific_property_details);
app.post('/delete_specific_property_details',AddProperty.delete_specific_property_details);


// ----------------- Sambu -----------------------
app.get('/getlist_date',ajax.getlist_date);
app.get('/getlist_day',ajax.getlist_day);
app.get('/getlist_status',ajax.getlist_status);
app.get('/getlist_report',ajax.getlist_report);

// ------------------ AMit ----------------------


app.post('/AddPropertyAmit', amit.AddPropertylist);
app.get('/GetPropertyAmit', amit.GetPropertylist);
//
app.get('/EmployeeDetails', amit.EmployeeDetailslist);
app.post('/AddEmployee', amit.AddEmployeelist);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
