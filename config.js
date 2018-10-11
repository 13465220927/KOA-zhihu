const pathLib=require('path');
module.exports={
    //basic
    port:8080,
    uploadDir:pathLib.resolve('www/upload'),
    wwwDir:pathLib.resolve('www'),

    //secret
    secret_key:['dsadasd','dsadasdasd'],

    //database
    db_host:"localhost",
    db_port:3306,
    db_user:"root",
    db_password:"123456",
    db_database:"zhihu"
}