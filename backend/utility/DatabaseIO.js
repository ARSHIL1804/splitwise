const format = require('string-template')
const { getReadOnlyConnection, getReadWriteConnection } = require("../config/database.config");


class DatabaseIO {

    static _SPCallTemplate = "CALL {0}({1})";

    static async Query(spname, parameters = null, isReadOnly = false) {
        try {
            const placeholders = parameters.map(() => '?').join(', ');
            const connection = isReadOnly ? await getpReadOnlyConnection() : await getReadWriteConnection();

            const query = format(DatabaseIO._SPCallTemplate, spname, placeholders);

            console.log(connection, query);

            const [res] = await connection.query(query, parameters);
            return res[0];
        } catch (error) {
            console.log(error, error.sqlMessage)
        }
    }
}

module.exports = DatabaseIO;