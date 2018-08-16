options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    useNewUrlParser: true
}

module.exports = {
    getDbConnectionString: function() {
        return 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME
    },
    dbOptions: options
}