var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'10.128.0.4 ',
	user:'khoatxp',
	password:'root',
	database:'cmpt470'
});
connection.connect(function(error){
	if(error) {
		console.log(error);
	} else {
		console.log('Connected..!');
	}
});

module.exports = connection;
