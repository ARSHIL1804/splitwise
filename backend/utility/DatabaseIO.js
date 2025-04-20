const format = require('string-template')
const { getReadOnlyConnection, getReadWriteConnection } = require("../config/database.config");


class DatabaseIO {

    static _SPCallTemplate = "CALL {0}({1})";

    static async Query(spname, parameters = null, isReadOnly = false) {
        try {
            const placeholders = parameters.map(() => '?').join(', ');
            const connection = isReadOnly ? await getpReadOnlyConnection() : await getReadWriteConnection();

            const query = format(DatabaseIO._SPCallTemplate, spname, placeholders);
            const queryOutput = await connection.query(query, parameters);
            const response = DatabaseIO.BuildDatabaseResponse(queryOutput);
            return response;
        } catch (error) {
            return error.sqlMessage;
        }
    }


    static BuildDatabaseResponse(databaseRes){
        let response = []
        for(var i=0; i <= databaseRes.length - 2; i++){
            response.push(databaseRes[i][0]);
        }
        return response;
    }
}

module.exports = DatabaseIO;