const mariadb = require('mariadb');

let readonlyConnection, readWriteConnection;



async function getReadOnlyConnection() {
  try {
    if (!readonlyConnection) {

      console.log(       {
        host: process.env.DB_HOST,
        user: process.env.DB_READONLY_USER,
        password: process.env.DB_READONLY_USER_PASSWORD,
        database: process.env.DATABASE,
        charset: 'utf8mb4',  
        connectAttributes: {
          collation: 'utf8mb4_unicode_ci'
        }
      })
      readonlyConnection = await mariadb.createConnection(
        {
          host: process.env.DB_HOST,
          user: process.env.DB_READONLY_USER,
          password: process.env.DB_READONLY_USER_PASSWORD,
          database: process.env.DATABASE,
          charset: 'utf8mb4',  
          connectAttributes: {
            collation: 'utf8mb4_unicode_ci'
          }
        });
    }
    return readonlyConnection;
  } catch(e) {
    console.log(e, ' Error in initiating connection1')
  }
}



async function getReadWriteConnection() {
  try {
    if (!readWriteConnection) {
      console.log(        {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_USER_PASSWORD,
        database: process.env.DATABASE
      })
      readWriteConnection = await mariadb.createConnection(
        {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_USER_PASSWORD,
          database: process.env.DATABASE
        });
    }
    return readWriteConnection;
  } catch (e){
    console.log(e, ' Error in initiating connection2')
  }
}

module.exports = { getReadOnlyConnection, getReadWriteConnection }
