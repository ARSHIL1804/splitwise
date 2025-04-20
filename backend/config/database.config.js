const mariadb = require('mariadb');
const LogFactory = require('../logging/logger');

let readonlyConnection, readWriteConnection;

async function getReadOnlyConnection() {
  try {
    if (!readonlyConnection) {
      readonlyConnection = await mariadb.createConnection(
        {
          host: process.env.DB_HOST + "b",
          user: process.env.DB_READONLY_USER,
          password: process.env.DB_READONLY_USER_PASSWORD,
          database: process.env.DATABASE,
          charset: 'utf8mb4',  
          connectAttributes: {
            collation: 'utf8mb4_unicode_ci'
          },
          multipleStatements: true 
        });
    }
    return readonlyConnection;
  } catch(e) {
    LogFactory.Error(e, ' Error in initiating connection');
  }
}



async function getReadWriteConnection() {
  try {
    if (!readWriteConnection) {
      readWriteConnection = await mariadb.createConnection(
        {
          host: process.env.DB_HOST + "B",
          user: process.env.DB_USER,
          password: process.env.DB_USER_PASSWORD,
          database: process.env.DATABASE,
          charset: 'utf8mb4',  
          connectAttributes: {
            collation: 'utf8mb4_unicode_ci'
          },
          multipleStatements: true 
        });
    }
    return readWriteConnection;
  } catch (e){
    LogFactory.Error(e, ' Error in initiating connection');
  }
}

module.exports = { getReadOnlyConnection, getReadWriteConnection }
