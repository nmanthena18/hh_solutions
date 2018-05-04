const env = process.env.NODE_ENV;

const Dev = {
    host:'localhost',
    user:'root',
    password:'',
    database :'hh_solutions',
    fileUploadPath : '/home/admin/uploads/'
}

const Production = {
    host:'127.0.0.1:3306',
    user:'root',
    password:'123456',
    database :'hh_solutions',
    fileUploadPath : '/home/admin/uploads/'
}

const dbConnection = {env, Dev, Production}

module.exports = dbConnection;