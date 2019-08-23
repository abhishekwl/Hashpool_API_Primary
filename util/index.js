const mysql = require('mysql');

module.exports.respond = function(error, data, request, response) {
    if(request.type==='POST') console.log('REQUEST BODY: '+JSON.stringify(request.body));
    if(error || data===null || data===undefined) response.status(500).json({ error: error, 'success': false });
    else {
        data['success'] = true;
        response.status(200).json(data);
    }
};

module.exports.setupDatabase = function() {
    const dbHost = process.env.DB_HOST;
    const dbUserName = process.env.DB_USER_NAME;
    const dbUserPassword = process.env.DB_USER_PASSWORD;
    const dbDatabase = process.env.NODE_ENV==='production'?process.env.DB_DATABASE_PROD:process.env.DB_DATABASE_DEV;
    const connection = mysql.createConnection({
        host: dbHost,
        user: dbUserName,
        password: dbUserPassword,
        database: dbDatabase
    });
    connection.connect(function(err) {
        if(err) {
            console.log('[!DB] Error'+err);
            console.log('[!DB] Exiting');
            process.exit();
        }
        else return connection;
    });
};
