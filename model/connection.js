const mysql = require('mysql');

class Connection{
   static configToMySql = {
        host: 'localhost',
        user: 'root',
        password:'12345678',
        database:'demo_database',
        charset:'utf8_general_ci'
    }
   static getConnection() {
        return mysql.createConnection(Connection.configToMySql);
    }
    static connecting() {
        Connection.getConnection().connect(error =>{
            if(error){
                console.log(error)
            }else {
                console.log('Connect success!!!')
            }
        });
    }
}
module.exports = Connection;
